import CheckDependencyExists from "./checkDependencyExists";

const AddNewDependency = (formData, newValue) => {
  if (newValue === "" || CheckDependencyExists(formData.dependencies, newValue))
    return formData;

  return {
    ...formData,
    dependencies: [
      ...formData.dependencies,
      { name: newValue, id: `dep_${formData.dependencies.length}` },
    ],
  };
};

export default AddNewDependency;
