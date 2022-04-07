const METHOD_TYPES = ["GET", "POST", "DELETE", "PUT", "PATCH"];

const UpdateMethodType = (formData, routeId, methodId, newMethodValue) => {
  const routeIndex = formData.routes.findIndex((route) => route.id === routeId);
  const methodIndex = formData.routes[routeIndex].methods.findIndex(
    (method) => method.id === methodId
  );

  const currentMethods = METHOD_TYPES.filter((TYPE) =>
    formData.routes[routeIndex].methods
      .reduce((previous, current) => previous + current.type, [])
      .includes(TYPE)
  );

  if (currentMethods.includes(newMethodValue))
    return { DATA: formData, message: "fail" };

  const newFormData = { ...formData };
  newFormData.routes[routeIndex].methods[methodIndex].type = newMethodValue;

  return { DATA: newFormData, message: "success" };
};

export default UpdateMethodType;
