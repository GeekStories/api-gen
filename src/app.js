import AddNewDependency from "./utils/dependencies/addNewDependency";
import RemoveDependency from "./utils/dependencies/removeDependency";
import AddNewRoute from "./utils/routes/addNewRoute";
import RemoveRoute from "./utils/routes/removeRoute";
import UpdateRoute from "./utils/routes/updateRoute";
import tw from "tailwind-styled-components";

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

  const handleNewDependency = (newValue) => {
    setFormData(AddNewDependency(formData, newValue));
  };
  const handleRemoveDependency = (id) => {
    setFormData(RemoveDependency(formData, id));
  };

  const handleNewRoute = () => {
    setFormData(AddNewRoute(formData));
  };
  const handleRemoveRoute = (id) => {
    setFormData(RemoveRoute(formData, id));
  };
  const handleUpdateRoute = (update) => {
    setFormData(UpdateRoute(formData, update));
  };

  return (
    <StyledMain>
      <StyledUserInputArea>
        <Dependencies
          dependencies={formData.dependencies}
          handleNewDependency={handleNewDependency}
          handleRemoveDependency={handleRemoveDependency}
        />
        <RoutesList
          routes={formData.routes}
          handleNewRoute={handleNewRoute}
          setSelectedRoute={setSelectedRoute}
        />
        <RouteForm
          selectedRoute={selectedRoute}
          handleRemoveRoute={handleRemoveRoute}
          handleUpdateRoute={handleUpdateRoute}
        />
      </StyledUserInputArea>
      <Output />
    </StyledMain>
  );
};

export default App;
