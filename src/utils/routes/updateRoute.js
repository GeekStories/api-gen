import CheckRouteExists from "./checkRouteExists";

const UpdateRoute = (formData, update) => {
  const { id, item, value } = update;
  const routeIndex = formData.routes.findIndex((route) => route.id === id);
  const route = formData.routes[routeIndex];

  if (id === "") {
    console.log("id cannot be empty");
    return formData;
  }

  if (item === "") {
    console.log("item cannot be empty");
    return formData;
  }

  if (!CheckRouteExists(formData.routes, route.id)) {
    console.log(`Invalid Route: ID '${id}' doesn't exist`);
    return formData;
  }

  let newRoutes = formData.routes.slice();

  switch (item) {
    case "METHOD":
      newRoutes[routeIndex].method = value;
      break;
    case "NAME":
      newRoutes[routeIndex].name = value;
      break;
    default:
      return formData;
  }

  return {
    ...formData,
    routes: [...newRoutes],
  };
};

export default UpdateRoute;
