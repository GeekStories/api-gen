import CheckRouteExists from "./checkRouteExists";

const RemoveRoute = (formData, id) => {
  if (id === "") {
    console.log(`Invalid Route: ${id}`);
    return formData;
  }

  if (!CheckRouteExists(formData.routes, id)) {
    console.log(`Route: ${id} doesn't exist`);
    return formData;
  }

  return {
    ...formData,
    routes: formData.routes.filter((route) => route.id !== id),
  };
};

export default RemoveRoute;
