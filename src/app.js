import tw from "tailwind-styled-components";
import { useState } from "react";
import API from "./API";

import Dependencies from "./components/input/dependencies";
import RouteForm from "./components/input/routeForm";
import RoutesList from "./components/input/routesList";
import Output from "./components/output/output";
import GenerateFilesContents from "./utils/generateFiles";
import defaultPackage from "./defaults/package";
import defaultApp from "./defaults/app";
import defaultServer from "./defaults/server";
import { saveAs } from "file-saver";
import JSZip from "jszip";

const Main = tw.div`h-screen grid grid-rows-2 gap-1`;
const UserInputArea = tw.div`grid grid-cols-12 gap-1`;

const defaultFormData = {
  dependencies: [
    { name: "express", version: "4.17.3", id: "dep_0" },
    { name: "cors", version: "2.8.5", id: "dep_1" },
    { name: "nodemon", version: "2.0.15", id: "dep_2" },
    { name: "celebrate", version: "15.0.1", id: "dep_3" },
  ],
  routes: [],
  dir: {
    defaults: [
      { id: "root_file_0", name: "app", ext: "js", contents: defaultApp },
      { id: "root_file_1", name: "server", ext: "js", contents: defaultServer },
      {
        id: "root_file_2",
        name: "package",
        ext: "json",
        contents: defaultPackage,
      },
    ],
    middleware: [],
    routes: [],
  },
};

const App = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [selectedRoute, setSelectedRoute] = useState({});
  const [selectedMethod, setSelectedMethod] = useState({});
  const [selectedFile, setSelectedFile] = useState({});

  const handleSelectRoute = (id) => {
    setSelectedRoute(formData.routes.find((route) => route.id === id));
    setSelectedMethod({});
  };

  const handleSelectMethod = (methodId, routeId) => {
    handleSelectRoute(routeId);

    setSelectedMethod(
      formData.routes
        .find((route) => route.id === routeId)
        .methods.find((method) => method.id === methodId)
    );
  };

  const UpdateForm = (data) => {
    let updatedForm = {};

    switch (data.UPDATE_TYPE) {
      case "new_dependency":
        updatedForm = API.AddDependency(
          formData,
          data.DEPENDENCY_NAME,
          data.DEPENDENCY_VERSION
        );
        break;
      case "remove_dependency":
        updatedForm = API.RemoveDependency(formData, data.DEPENDENCY_ID);
        break;
      case "new_route":
        updatedForm = API.CreateRoute(formData);
        break;
      case "change_route_name":
        updatedForm = API.UpdateRouteName(
          formData,
          data.ROUTE_ID,
          data.NEW_NAME
        );
        break;
      case "remove_route":
        updatedForm = API.RemoveRoute(formData, data.ROUTE_ID);
        setSelectedRoute({});
        setSelectedMethod({});
        break;
      case "new_method":
        updatedForm = API.CreateMethod(formData, data.ROUTE_ID);
        break;
      case "remove_method":
        updatedForm = API.RemoveMethod(formData, data.ROUTE_ID, data.METHOD_ID);
        setSelectedMethod({});
        break;
      case "change_method_type":
        const result = API.UpdateMethodType(
          formData,
          data.ROUTE_ID,
          data.METHOD_ID,
          data.NEW_TYPE
        );

        if (result.message === "success") updatedForm = result.DATA;
        if (result.message === "fail") return result.message;

        break;
      case "change_method_body":
        updatedForm = API.UpdateMethodRequestBody(
          formData,
          data.ROUTE_ID,
          data.METHOD_ID,
          data.VALUE
        );
        break;
      case "new_param":
        updatedForm = API.CreateParam(
          formData,
          data.ROUTE_ID,
          data.METHOD_ID,
          data.PARAM
        );
        break;
      case "remove_param":
        updatedForm = API.RemoveParam(
          formData,
          data.ROUTE_ID,
          data.METHOD_ID,
          data.PARAM_ID,
          data.TYPE
        );
        break;
      case "new_query":
        updatedForm = API.CreateQuery(
          formData,
          data.ROUTE_ID,
          data.METHOD_ID,
          data.QUERY
        );
        break;
      default:
        updatedForm = formData;
        break;
    }

    setFormData(updatedForm);
  };

  const handleGenerateFiles = () => {
    const newDir = GenerateFilesContents(formData);
    setFormData({ ...formData, dir: newDir });
    setSelectedFile({}); // Reset selectedFile
  };

  const handleDownloadFiles = async () => {
    const zip = new JSZip();

    // Default Files
    formData.dir.defaults.forEach((file) =>
      zip.file(`${file.name}.${file.ext}`, file.contents)
    );

    // Middleware Files
    const middlewareFolder = zip.folder("middleware");
    formData.dir.middleware.forEach((file) =>
      middlewareFolder.file(`${file.name}.${file.ext}`, file.contents)
    );

    // Routes Files
    const routesFolder = zip.folder("routes");
    formData.dir.routes.forEach((file) =>
      routesFolder.file(`${file.name}.${file.ext}`, file.contents)
    );

    const result = await zip.generateAsync({ type: "blob" });
    saveAs(result, "project.zip");
  };

  return (
    <Main>
      <UserInputArea>
        <Dependencies
          dependencies={formData.dependencies}
          UpdateForm={UpdateForm}
        />
        <RoutesList
          routes={formData.routes}
          UpdateForm={UpdateForm}
          handleSelectRoute={handleSelectRoute}
          handleSelectMethod={handleSelectMethod}
        />
        <RouteForm
          selectedRoute={selectedRoute}
          selectedMethod={selectedMethod}
          UpdateForm={UpdateForm}
        />
      </UserInputArea>

      <Output
        formData={formData}
        handleGenerateFiles={handleGenerateFiles}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        handleDownloadFiles={handleDownloadFiles}
      />
    </Main>
  );
};

export default App;
