import tw from "tailwind-styled-components";
import API from "./API";

import Dependencies from "./components/input/dependencies";
import RouteForm from "./components/input/routeForm";
import RoutesList from "./components/input/routesList";
import Output from "./components/output/output";
import { useState } from "react";

import defaultPackageJson from "./defaultPackageJson";

const StyledMain = tw.div`h-screen grid grid-rows-2 gap-1`;
const StyledUserInputArea = tw.div`grid grid-cols-12 gap-1`;

const defaultFormData = {
  dependencies: [
    { name: "express", id: "dep_0" },
    { name: "cors", id: "dep_1" },
  ],
  routes: [],
  dir: {
    defaults: [
      { id: "root_file_0", name: "app", ext: "js", contents: "" },
      { id: "root_file_1", name: "server", ext: "js", contents: "" },
      {
        id: "root_file_2",
        name: "package",
        ext: "json",
        contents: defaultPackageJson,
      },
    ],
    middleware: [],
    routes: [],
    repositories: [],
  },
};

const App = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [selectedRoute, setSelectedRoute] = useState({});
  const [selectedMethod, setSelectedMethod] = useState({});

  const handleSelectRoute = (id) => {
    setSelectedRoute(formData.routes.find((route) => route.id === id));
  };

  const handleSelectMethod = (methodId, routeId) => {
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
        updatedForm = API.AddDependency(formData, data.DEPENDENCY_NAME);
        break;
      case "remove_dependency":
        updatedForm = API.RemoveDependency(
          formData,
          data.DEPENDENCY_ID,
          data.DEPENDENCY_NAME
        );
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

  return (
    <StyledMain>
      <StyledUserInputArea>
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
      </StyledUserInputArea>
      <Output formData={formData} />
    </StyledMain>
  );
};

export default App;
