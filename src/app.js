import tw from "tailwind-styled-components";
import { useState, useEffect } from "react";
import MobileApp from "./mobile";

import { useSelector } from "react-redux";

import Dependencies from "./components/input/dependencies";
import RouteForm from "./components/input/routeForm";
import Output from "./components/output/output";
import GenerateFilesContents from "./utils/generateFiles";

import { saveAs } from "file-saver";
import JSZip from "jszip";

const Main = tw.div`h-screen flex flex-col`;
const UserInputArea = tw.div`grid grid-cols-12`;

const App = () => {
  const dependencies = useSelector((state) => state.dependencies);
  const routes = useSelector((state) => state.routes);

  const [selectedRoute, setSelectedRoute] = useState({});
  const [selectedMethod, setSelectedMethod] = useState({});

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
