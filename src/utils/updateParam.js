const UpdateParam = (formData, routeId, methodId, paramId, newValue) => {
  const routeIndex = formData.routes.findIndex((route) => route.id === routeId);
  const methodIndex = formData.routes[routeIndex].methods.findIndex(
    (method) => method.id === methodId
  );
  const paramIndex = formData.routes[routeIndex].methods[
    methodIndex
  ].params.findIndex((param) => param.id === paramId);

  let newFormData = { ...formData };

  newFormData.routes[routeIndex].methods[methodIndex].params[paramIndex].value =
    newValue;

  return newFormData;
};

export default UpdateParam;
