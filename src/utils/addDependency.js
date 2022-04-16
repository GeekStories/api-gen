import CheckDependencyExists from "./checkDependencyExists";

const AddDependency = (formData, newValue) => {
  if (newValue === "" || CheckDependencyExists(formData.dependencies, newValue))
    return formData;

  let newFormData = { ...formData };

  newFormData.dependencies = [
    ...formData.dependencies,
    { name: newValue, id: `dep_${formData.dependencies.length}` },
  ];

  let oldContents = newFormData.dir.defaults[2].contents;
  oldContents.dependencies = { ...oldContents.dependencies, [newValue]: "" };
  newFormData.dir.defaults[2].contents = oldContents;

  return newFormData;
};

export default AddDependency;
