import CheckDependencyExists from "./checkDependencyExists";

const RemoveDependency = (formData, id) => {
  if (id === "") {
    console.log(`Invalid Item: ${id}`);
    return formData;
  }
  if (!CheckDependencyExists(formData.dependencies, id)) {
    console.log(`Item: ${id} doesn't exist`);
    return formData;
  }

  return {
    ...formData,
    dependencies: formData.dependencies.filter(
      (dependency) => dependency.id !== id
    ),
  };
};

export default RemoveDependency;
