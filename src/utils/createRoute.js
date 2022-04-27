import RandomString from "./randomString";

const CreateRoute = (formData) => {
  let updatedForm = { ...formData };
  const randomName = `newroute${RandomString(3)}`;
  updatedForm.routes = [
    ...updatedForm.routes,
    {
      id: `route_${formData.routes.length}`,
      name: randomName,
      methods: [
        {
          id: `met_${formData.routes.length}_0`,
          type: "GET",
          params: [],
          queries: [],
          body: null,
        },
      ],
    },
  ];

  // Routes
  updatedForm.dir.routes.push({
    id: `route_file_${updatedForm.dir.routes.length}`,
    name: randomName,
    ext: "js",
    contents: "",
  });

  // Middleware (Validation)
  updatedForm.dir.middleware.push({
    id: `middleware_file_${updatedForm.dir.middleware.length}`,
    name: randomName,
    ext: "js",
    contents: "",
  });

  return updatedForm;
};

export default CreateRoute;
