import AddDependency from "./utils/addDependency";
import RemoveDependency from "./utils/removeDependency";

import CreateRoute from "./utils/createRoute";
import RemoveRoute from "./utils/removeRoute";
import UpdateRouteName from "./utils/updateRouteName";

import CreateMethod from "./utils/createMethod";
import RemoveMethod from "./utils/removeMethod";
import UpdateMethodType from "./utils/updateMethodType";

import CreateParam from "./utils/createParam";

const API = {
  AddDependency: (formData, dependencyName) => {
    return AddDependency(formData, dependencyName);
  },
  RemoveDependency: (formData, dependencyId) => {
    return RemoveDependency(formData, dependencyId);
  },
  CreateRoute: (formData) => {
    return CreateRoute(formData);
  },
  RemoveRoute: (formData, routeId) => {
    return RemoveRoute(formData, routeId);
  },
  UpdateRouteName: (formData, routeId, newRouteName) => {
    return UpdateRouteName(formData, routeId, newRouteName);
  },
  CreateMethod: (formData, routeId) => {
    return CreateMethod(formData, routeId);
  },
  RemoveMethod: (formData, routeId, methodId) => {
    return RemoveMethod(formData, routeId, methodId);
  },
  UpdateMethodType: (formData, routeId, methodId, newMethodType) => {
    return UpdateMethodType(formData, routeId, methodId, newMethodType);
  },
  CreateParam: (formData, routeId, methodId, newParam) => {
    return CreateParam(formData, routeId, methodId, newParam);
  },
};

export default API;
