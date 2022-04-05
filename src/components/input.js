import AddNewDependency from "../utils/dependencies/addNewDependency";
import RemoveDependency from "../utils/dependencies/removeDependency";
import tw from "tailwind-styled-components";
import Dependencies from "./dependencies";
import Routes from "./routes";

const StyledMain = tw.div`
  grid
  grid-cols-12
  gap-1
  rounded-sm
`;

const Input = ({ formData, setFormData }) => {
  const { dependencies, routes } = formData;

  const handleNewDependency = (newValue) => {
    setFormData(AddNewDependency(formData, newValue));
  };

  const handleRemoveDependency = (id) => {
    setFormData(RemoveDependency(formData, id));
  };

  return (
    <StyledMain>
      <Dependencies
        dependencies={dependencies}
        handleNewDependency={handleNewDependency}
        handleRemoveDependency={handleRemoveDependency}
      />
      <Routes routes={routes} setFormData={setFormData} />
    </StyledMain>
  );
};

export default Input;
