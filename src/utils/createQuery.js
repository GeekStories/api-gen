const CreateQuery = (formData, routeId, methodId, newQuery) => {
  let updatedForm = { ...formData };

  const routeIndex = updatedForm.routes.findIndex(
    (route) => route.id === routeId
  );

  const methodIndex = updatedForm.routes[routeIndex].methods.findIndex(
    (method) => method.id === methodId
  );

  const queryExists = formData.routes[routeIndex].methods[
    methodIndex
  ].queries.filter((query) => query.name === newQuery.name);

  if (queryExists.length > 0) return formData;

  newQuery.id = `query_${routeIndex}_${methodIndex}_${updatedForm.routes[routeIndex].methods[methodIndex].queries.length}`;
  updatedForm.routes[routeIndex].methods[methodIndex].queries.push(newQuery);

  return updatedForm;
};

export default CreateQuery;
