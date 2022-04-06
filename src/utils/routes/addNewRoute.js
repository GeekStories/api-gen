const METHODS = ["GET", "DELETE", "PUT", "POST", "PATCH"];

const AddNewRoute = (formData) => {
  return {
    ...formData,
    routes: [
      ...formData.routes,
      {
        id: `route_${formData.routes.length}`,
        method: METHODS[Math.floor(Math.random() * METHODS.length)],
        name: "newroute",
        params: [],
        queries: [],
        body: {},
      },
    ],
  };
};

export default AddNewRoute;
