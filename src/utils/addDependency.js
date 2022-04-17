import CheckDependencyExists from "./checkDependencyExists";

const AddDependency = (formData, dependencyName, dependencyVersion) => {
  if (
    dependencyName === "" ||
    CheckDependencyExists(formData.dependencies, dependencyName)
  )
    return formData;

  let newFormData = { ...formData };

  newFormData.dependencies = [
    ...formData.dependencies,
    {
      name: dependencyName,
      version: dependencyVersion,
      id: `dep_${formData.dependencies.length}`,
    },
  ];

  return newFormData;
};

export default AddDependency;
