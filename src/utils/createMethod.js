const METHOD_TYPES = ["GET", "POST", "DELETE", "PUT", "PATCH"];

const CreateMethod = (formData, routeId) => {
  const routeIndex = formData.routes.findIndex((route) => route.id === routeId);

  if (formData.routes[routeIndex].methods.length === METHOD_TYPES.length)
    return formData;

  const newFormData = { ...formData };

  const difference = METHOD_TYPES.filter(
    (TYPE) =>
      !formData.routes[routeIndex].methods
        .reduce((previous, current) => previous + current.type, [])
        .includes(TYPE)
  );

  newFormData.routes[routeIndex].methods.push({
    id: `met_${routeIndex}_${formData.routes[routeIndex].methods.length}`,
    type: difference[0],
    statuses: [
      {
        id: `stat_${routeIndex}_0`,
        value: 200,
        message: "OK",
      },
      {
        id: `stat_${routeIndex}_1`,
        value: 500,
        message: "Error",
      },
    ],
    params: [],
    queries: [],
    body: {},
    response: "",
  });

  return newFormData;
};

export default CreateMethod;