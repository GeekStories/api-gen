const CheckDependencyExists = (dependencyList, newValue) => {
  return (
    dependencyList.some((dependency) => dependency.name === newValue) ||
    dependencyList.some((dependency) => dependency.id === newValue)
  );
};

export default CheckDependencyExists;
