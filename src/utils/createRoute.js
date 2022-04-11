const CreateRoute = (formData) => {
  return {
    ...formData,
    routes: [
      ...formData.routes,
      {
        id: `route_${formData.routes.length}`,
        name: "newroute",
        methods: [],
      },
    ],
  };
};

export default CreateRoute;
