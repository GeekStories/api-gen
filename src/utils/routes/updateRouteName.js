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

  return newFormData;
};

export default UpdateRouteName;
