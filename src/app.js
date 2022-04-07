import tw from "tailwind-styled-components";
import API from "./API";

import Dependencies from "./components/dependencies";
import RouteForm from "./components/routeForm";
import RoutesList from "./components/routesList";
import Output from "./components/output";
import { useState } from "react";

const StyledMain = tw.div`
  h-screen
  grid
  grid-rows-2
  gap-1
`;

const StyledUserInputArea = tw.div`
  grid
  grid-cols-12
  gap-1
`;

const defaultFormData = {
  dependencies: [
    { name: "express", id: "dep_0" },
    { name: "react@v18.0.0", id: "dep_1" },
    { name: "react-dom@v18.0.0", id: "dep_2" },
  ],
  routes: [],
  files: [],
};

const App = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [selectedRoute, setSelectedRoute] = useState({});

  const handleSelectRoute = (id) => {
    setSelectedRoute(formData.routes.find((route) => route.id === id));
  };

  const UpdateForm = (data) => {
    let updatedForm = {};

    switch (data.UPDATE_TYPE) {
      /* DEPENDENCY FUNCTIONS */
      case "new_dependency":
        updatedForm = API.NewDependency(formData, data.DEPENDENCY_NAME);
        break;
      case "remove_dependency":
        updatedForm = API.RemoveDependency(formData, data.DEPENDENCY_ID);
        break;
      /* ROUTE FUNCTIONS */
      case "new_route":
        updatedForm = API.NewRoute(formData);
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
        break;
      /* METHOD FUNCTIONS */
      case "new_method":
        updatedForm = API.NewMethod(formData, data.ROUTE_ID);
        break;
      case "remove_method":
        updatedForm = API.RemoveMethod(formData, data.ROUTE_ID, data.METHOD_ID);
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
        />
        <RouteForm selectedRoute={selectedRoute} UpdateForm={UpdateForm} />
      </StyledUserInputArea>
      <Output formData={formData} />
    </StyledMain>
  );
};

export default App;
