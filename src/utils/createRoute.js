const CreateRoute = (formData) => {
  let updatedForm = { ...formData };
  updatedForm.routes = [
    ...updatedForm.routes,
    {
      id: `route_${formData.routes.length}`,
      name: "newroute",
      methods: [],
    },
  ];

  // Routes
  updatedForm.dir.routes.push({
    id: `route_file_${updatedForm.dir.routes.length}`,
    name: "newroute",
    ext: "js",
    contents: "",
  });

  // Middleware (Validation)
  updatedForm.dir.middleware.push({
    id: `middleware_file_${updatedForm.dir.middleware.length}`,
    name: "newroute",
    ext: "js",
    contents: "",
  });

  // Repository (functions for accessing db)
  updatedForm.dir.repositories.push({
    id: `repository_file_${updatedForm.dir.repositories.length}`,
    name: "newroute",
    ext: "js",
    contents: "",
  });

  return updatedForm;
};

export default CreateRoute;
