import AddNewDependency from "./utils/dependencies/addNewDependency";
import RemoveDependency from "./utils/dependencies/removeDependency";
import AddNewRoute from "./utils/routes/addNewRoute";
import RemoveRoute from "./utils/routes/removeRoute";
import UpdateRouteName from "./utils/routes/updateRouteName";
import NewMethod from "./utils/routes/newMethod";
import UpdateMethodType from "./utils/routes/updateMethodType";
import RemoveMethod from "./utils/routes/removeMethod";

const API = {
  NewDependency: (formData, dependencyName) => {
    return AddNewDependency(formData, dependencyName);
  },
  RemoveDependency: (formData, dependencyId) => {
    return RemoveDependency(formData, dependencyId);
  },
  NewRoute: (formData) => {
    return AddNewRoute(formData);
  },
  UpdateMethodType: (formData, routeId, methodId, newMethodType) => {
    return UpdateMethodType(formData, routeId, methodId, newMethodType);
  },
  RemoveMethod: (formData, routeId, methodId) => {
    return RemoveMethod(formData, routeId, methodId);
  },
  NewMethod: (formData, routeId) => {
    return NewMethod(formData, routeId);
  },
  UpdateRouteName: (formData, routeId, newRouteName) => {
    return UpdateRouteName(formData, routeId, newRouteName);
  },
  RemoveRoute: (formData, routeId) => {
    return RemoveRoute(formData, routeId);
  },
};

export default API;
