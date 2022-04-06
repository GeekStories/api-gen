const CheckRouteExists = (routeList, id) => {
  return routeList.some((r) => r.id === id);
};

export default CheckRouteExists;
