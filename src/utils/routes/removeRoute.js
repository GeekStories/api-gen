const RemoveRoute = (formData, routeId) => {
  if (routeId === "") {
    console.log(`Invalid Route: ${routeId}`);
    return formData;
  }

  if (!formData.routes.some((route) => route.id === routeId)) {
    console.log(`Route: ${routeId} doesn't exist`);
    return formData;
  }

  return {
    ...formData,
    routes: formData.routes.filter((route) => route.id !== routeId),
  };
};

export default RemoveRoute;
