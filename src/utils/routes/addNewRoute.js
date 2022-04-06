const AddNewRoute = (formData) => {
  return {
    ...formData,
    routes: [
      ...formData.routes,
      {
        id: `route_${formData.routes.length}`,
        name: "newroute",
        methods: [
          {
            id: "met_0_0",
            type: "GET",
            statuses: [
              { id: "stat_0_0", value: 200, message: "OK" },
              { id: "stat_0_1", value: 500, message: "Error" },
            ],
            params: [],
            queries: [],
            body: {},
          },
        ],
      },
    ],
  };
};

export default AddNewRoute;
