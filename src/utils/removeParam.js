const RemoveParam = (formData, routeId, methodId, paramId, paramType) => {
  let updatedForm = { ...formData };

  const routeIndex = updatedForm.routes.findIndex(
    (route) => route.id === routeId
  );

  const methodIndex = updatedForm.routes[routeIndex].methods.findIndex(
    (method) => method.id === methodId
  );

  switch (paramType) {
    case "param":
      updatedForm.routes[routeIndex].methods[methodIndex].params =
        updatedForm.routes[routeIndex].methods[methodIndex].params.filter(
          (param) => param.id !== paramId
        );
      break;
    case "query":
      updatedForm.routes[routeIndex].methods[methodIndex].queries =
        updatedForm.routes[routeIndex].methods[methodIndex].queries.filter(
          (param) => param.id !== paramId
        );
      break;
    default:
      break;
  }

  return updatedForm;
};

export default RemoveParam;
