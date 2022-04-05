const CheckRouteExists = (routeList, id) => {
  return routeList.some((route) => route.id === id);
};

export default CheckRouteExists;
