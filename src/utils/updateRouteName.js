const UpdateRouteName = (formData, routeId, newRouteName) => {
  const routeIndex = formData.routes.findIndex((route) => route.id === routeId);

  if (routeId === "") {
    console.log("id cannot be empty");
    return formData;
  }

  if (routeIndex === undefined || routeIndex === null) {
    console.log(`Invalid Route: ID '${routeId}' doesn't exist`);
    return formData;
  }

  const newFormData = { ...formData };
  newFormData.routes[routeIndex].name = newRouteName;

  // Route index and File index are a 1:1, so searching by index will work
  let fileIndex = newFormData.dir.routes.findIndex(
    (_, index) => index === routeIndex
  );

  // Edit route file name
  newFormData.dir.routes[fileIndex].name = newRouteName;

  // Edit middleware file name
  newFormData.dir.middleware[fileIndex].name = newRouteName;

  return newFormData;
};

export default UpdateRouteName;
