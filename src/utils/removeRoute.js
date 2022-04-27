const RemoveRoute = (formData, routeId) => {
  if (routeId === "") {
    console.log(`Invalid Route: ${routeId}`);
    return formData;
  }

  if (!formData.routes.some((route) => route.id === routeId)) {
    console.log(`Route: ${routeId} doesn't exist`);
    return formData;
  }

  let newFormData = {
    ...formData,
    routes: formData.routes.filter((route) => route.id !== routeId),
  };

  const routeIndex = formData.routes.findIndex((route) => route.id === routeId);

  // Remove file from routes
  newFormData.dir.routes = newFormData.dir.routes.filter(
    (route) => route.id !== `route_file_${routeIndex}`
  );

  // Remove file from middleware
  newFormData.dir.middleware = newFormData.dir.middleware.filter(
    (m) => m.id !== `middleware_file_${routeIndex}`
  );

  return newFormData;
};

export default RemoveRoute;
