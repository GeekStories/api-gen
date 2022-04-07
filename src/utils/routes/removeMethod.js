const RemoveMethod = (formData, routeId, methodId) => {
  const routeIndex = formData.routes.findIndex((route) => route.id === routeId);
  const methodIndex = formData.routes[routeIndex].methods.findIndex(
    (method) => method.id === methodId
  );

  if (methodIndex === undefined || methodIndex === null) {
    console.log(
      `Failed to delete route: ${routeId} => ${methodId} doesn't exist`
    );
    return formData;
  }

  const newFormData = { ...formData };
  newFormData.routes[routeIndex].methods = [
    ...newFormData.routes[routeIndex].methods.filter(
      (method) => method.id !== methodId
    ),
  ];

  return newFormData;
};

export default RemoveMethod;
