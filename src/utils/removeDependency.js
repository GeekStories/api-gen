import CheckDependencyExists from "./checkDependencyExists";

const RemoveDependency = (formData, id, dependencyName) => {
  if (id === "") {
    console.log(`Invalid Item: ${id}`);
    return formData;
  }
  if (!CheckDependencyExists(formData.dependencies, id)) {
    console.log(`Item: ${id} doesn't exist`);
    return formData;
  }

  let newFormData = {
    ...formData,
    dependencies: formData.dependencies.filter(
      (dependency) => dependency.id !== id
    ),
  };

  let oldContents = newFormData.dir.defaults[2].contents;
  delete oldContents.dependencies[dependencyName];
  newFormData.dir.defaults[2].contents = oldContents;

  return newFormData;
};

export default RemoveDependency;
