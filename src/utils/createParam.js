const CreateParam = (formData, routeId, methodId, newParam) => {
  let updatedForm = { ...formData };

  const routeIndex = updatedForm.routes.findIndex(
    (route) => route.id === routeId
  );

  const methodIndex = updatedForm.routes[routeIndex].methods.findIndex(
    (method) => method.id === methodId
  );

  newParam.id = `param_${routeIndex}_${methodIndex}_${updatedForm.routes[routeIndex].methods[methodIndex].params.length}`;
  updatedForm.routes[routeIndex].methods[methodIndex].params.push(newParam);

  return updatedForm;
};

export default CreateParam;
