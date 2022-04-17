const UpdateMethodRequestBody = (formData, routeId, methodId, newValue) => {
  let newFormData = { ...formData };

  const routeIndex = formData.routes.findIndex((route) => route.id === routeId);
  const methodIndex = formData.routes[routeIndex].methods.findIndex(
    (method) => method.id === methodId
  );

  if (newValue === "") {
    newFormData.routes[routeIndex].methods[methodIndex].body = null;
  } else {
    newFormData.routes[routeIndex].methods[methodIndex].body =
      JSON.parse(newValue);
  }

  return newFormData;
};

export default UpdateMethodRequestBody;
