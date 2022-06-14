import tw from "tailwind-styled-components";

import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createRoute,
  createMethod,
  createParam,
  createQuery,
  updateMethodBody,
} from "./store/api/routes";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import yaml from "js-yaml";

import MobileApp from "./mobile";
import Dependencies from "./components/input/dependencies";
import RouteForm from "./components/input/routeForm";
import Output from "./components/output/output";
import GenerateFilesContents from "./utils/generateFiles";

const Main = tw.div`h-screen flex flex-col`;
const UserInputArea = tw.div`grid grid-cols-12`;

const App = () => {
  const dispatch = useDispatch();
  const dependencies = useSelector((state) => state.dependencies);
  const routes = useSelector((state) => state.routes);

  const [selectedRoute, setSelectedRoute] = useState({});
  const [selectedMethod, setSelectedMethod] = useState({});
  const inputFileRef = useRef(null);

  const handleSelectRoute = (id) => {
    setSelectedRoute(routes.find((route) => route.id === id));
    setSelectedMethod({});
  };

  const handleSelectMethod = (methodId, routeId) => {
    handleSelectRoute(routeId);

    setSelectedMethod(
      routes
        .find((route) => route.id === routeId)
        .methods.find((method) => method.id === methodId)
    );
  };

  const [selectedFile, setSelectedFile] = useState({});
  const [projectFiles, setFiles] = useState({
    defaults: [
      { id: "root_file_0", name: "app", ext: "js", contents: "" },
      { id: "root_file_1", name: "package", ext: "json", contents: "" },
    ],
    routes: [],
    middleware: [],
  });

  const screenWidth = useWindowSize();

  const handleGenerateFiles = () => {
    const dir = GenerateFilesContents(dependencies, routes);
    setFiles(dir);
    setSelectedFile({}); // Reset selectedFile
  };

  const handleDownloadFiles = async () => {
    const zip = new JSZip();

    // Default Files
    projectFiles.defaults.forEach((file) =>
      zip.file(`${file.name}.${file.ext}`, file.contents)
    );

    // Middleware Files
    const middlewareFolder = zip.folder("middleware");
    projectFiles.middleware.forEach((file) =>
      middlewareFolder.file(`${file.name}.${file.ext}`, file.contents)
    );

    // Routes Files
    const routesFolder = zip.folder("routes");
    projectFiles.routes.forEach((file) =>
      routesFolder.file(`${file.name}.${file.ext}`, file.contents)
    );

    const result = await zip.generateAsync({ type: "blob" });
    saveAs(result, "project.zip");
  };

  const handleImportFile = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      yaml.loadAll(e.target.result, function (doc) {
        const paths_keys = Object.keys(doc.paths);
        paths_keys.forEach((key, routeIndex) => {
          const path = doc.paths[key];
          dispatch(createRoute({ name: key }));
          const methods_keys = Object.keys(path);
          methods_keys.forEach((method_key, methodIndex) => {
            const method = path[method_key];
            dispatch(
              createMethod({ type: method_key, routeId: `route_${routeIndex}` })
            );
            if (method.parameters) {
              method.parameters.forEach((parameter) => {
                switch (parameter.in) {
                  case "query":
                    dispatch(
                      createQuery({
                        routeId: `route_${routeIndex}`,
                        methodId: `met_${routeIndex}_${methodIndex}`,
                        newQuery: {
                          type: parameter.schema.type,
                          name: parameter.name,
                          options: Object.keys(parameter.schema)
                            .filter((t) => t !== "type")
                            .map((option) => {
                              return {
                                key: option,
                                value: parameter.schema[option],
                              };
                            }),
                        },
                      })
                    );
                    break;
                  case "path":
                    dispatch(
                      createParam({
                        routeId: `route_${routeIndex}`,
                        methodId: `met_${routeIndex}_${methodIndex}`,
                        newParam: {
                          type: parameter.schema.type,
                          name: parameter.name,
                          options: Object.keys(parameter.schema)
                            .filter((t) => t !== "type")
                            .map((option) => {
                              return {
                                key: option,
                                value: parameter.schema[option],
                              };
                            }),
                        },
                      })
                    );
                    break;
                  default:
                    break;
                }
              });
            }
            if (method.requestBody) {
              dispatch(
                updateMethodBody({
                  routeId: `route_${routeIndex}`,
                  methodId: `met_${routeIndex}_${methodIndex}`,
                  newValue: `{${Object.keys(
                    method.requestBody.content["application/json"].schema
                      .properties
                  ).map((key) => {
                    const type =
                      method.requestBody.content["application/json"].schema
                        .properties[key].type;
                    return `"${key}": "${
                      type === "integer" ? "number" : type
                    }"`;
                  })}}`,
                })
              );
            }
          });
        });
      });
    };
  };

  return screenWidth > 1024 ? (
    <Main>
      <UserInputArea>
        <Dependencies />
        <RouteForm
          handleSelectRoute={handleSelectRoute}
          handleSelectMethod={handleSelectMethod}
          selectedRoute={selectedRoute}
          selectedMethod={selectedMethod}
        />
      </UserInputArea>

      <Output
        projectFiles={projectFiles}
        handleGenerateFiles={handleGenerateFiles}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        handleDownloadFiles={handleDownloadFiles}
        handleImportFile={handleImportFile}
        inputFileRef={inputFileRef}
      />
    </Main>
  ) : (
    <MobileApp />
  );
};

const useWindowSize = () => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowWidth, setWindowWidth] = useState(undefined);
  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      // Set window width/height to state
      setWindowWidth(window.innerWidth);
    };
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowWidth;
};

export default App;
