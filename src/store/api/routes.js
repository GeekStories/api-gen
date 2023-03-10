import { createSlice } from "@reduxjs/toolkit";
import RandomString from "../../utils/randomString";

const METHOD_TYPES = ["get", "post", "delete", "put", "patch"];
const IDS = [0];

const GenerateID = () => {
  let id = 0;

  while (IDS.includes(id)) {
    id = (Math.random() * (Math.random() * 100000)).toFixed();
  }
  IDS.push(id);

  return id;
};

export const GetLatestID = () => {
  return IDS[IDS.length - 1];
};

export const routesSlice = createSlice({
  name: "routes",
  initialState: [],
  reducers: {
    createRoute: (state = {}) => {
      let name = `newroute${RandomString(3)}`;

      let routes = JSON.parse(JSON.stringify(state));
      name = `newroute${RandomString(3)}`;

      return [
        ...routes,
        {
          id: GenerateID(),
          name: name.replace(/[^a-z]/, ""),
          methods: [],
        },
      ];
    },
    removeRoute: (state, action) => {
      const { routeId } = action.payload;
      const routes = JSON.parse(JSON.stringify(state));
      return [...routes.filter((r) => r.id !== routeId)];
    },
    updateRouteName: (state, action = {}) => {
      if (!action.payload) return state;
      const { routeId, newValue } = action.payload;
      const InvalidChars = newValue.match(/[^a-z]/g);
      if (InvalidChars) {
        console.log("invalid character in route name: ", InvalidChars);
        return state;
      }

      const routes = JSON.parse(JSON.stringify(state));
      if (routes.find((route) => route.name === newValue)) {
        console.log("route already exists");
        return state;
      }

      const route = state.find((route) => route.id === routeId);
      route.name = newValue;
    },
    createMethod: (state, action) => {
      const { type, routeId } = action.payload;
      const route = state.find((route) => route.id === routeId);
      if (route.methods.length === 5) return;

      let difference = [];
      if (!type && route.methods.length < 5) {
        difference = METHOD_TYPES.filter(
          (t) =>
            !route.methods
              .reduce((prev, curr) => prev + curr.type, [])
              .includes(t)
        );
      }

      route.methods = [
        ...route.methods,
        {
          id: GenerateID(),
          type: type || difference[0],
          params: [],
          queries: [],
          body: null,
        },
      ];
    },
    updateMethodType: (state, action) => {
      const { routeId, methodId, newValue } = action.payload;
      const route = state.find((route) => route.id === routeId);
      const method = route.methods.find((method) => method.id === methodId);

      const currentMethods = METHOD_TYPES.filter((t) =>
        route.methods.reduce((prev, curr) => prev + curr.type, []).includes(t)
      );

      console.log(currentMethods);

      if (currentMethods.includes(newValue)) return state;

      method.type = newValue;
    },
    removeMethod: (state, action) => {
      const { routeId, methodId } = action.payload;
      const route = state.find((route) => route.id === routeId);
      route.methods = [
        ...route.methods.filter((method) => method.id !== methodId),
      ];
    },
    createParam: (state, action) => {
      const { routeId, methodId, newParam } = action.payload;
      const route = state.find((route) => route.id === routeId);
      const methodIndex = route.methods.findIndex(
        (method) => method.id === methodId
      );

      route.methods[methodIndex].params = [
        ...route.methods[methodIndex].params,
        {
          ...newParam,
          id: GenerateID(),
        },
      ];
    },
    removeParam: (state, action) => {
      const { routeId, methodId, paramId } = action.payload;
      const route = state.find((route) => route.id === routeId);
      const method = route.methods.find((method) => method.id === methodId);

      method.params = [
        ...method.params.filter((param) => param.id !== paramId),
      ];
    },
    createQuery: (state, action) => {
      const { routeId, methodId, newQuery } = action.payload;
      const route = state.find((route) => route.id === routeId);
      const methodIndex = route.methods.findIndex(
        (method) => method.id === methodId
      );

      route.methods[methodIndex].queries = [
        ...route.methods[methodIndex].queries,
        {
          ...newQuery,
          id: GenerateID(),
        },
      ];
    },
    removeQuery: (state, action) => {
      const { routeId, methodId, paramId } = action.payload;
      const route = state.find((route) => route.id === routeId);
      const method = route.methods.find((method) => method.id === methodId);

      method.queries = [
        ...method.queries.filter((query) => query.id !== paramId),
      ];
    },
    updateMethodBody: (state, action) => {
      const { routeId, methodId, newValue } = action.payload;
      const route = state.find((route) => route.id === routeId);
      const method = route.methods.find((method) => method.id === methodId);
      method.body = newValue;
    },
  },
});

export const {
  createRoute,
  removeRoute,
  updateRouteName,
  createMethod,
  updateMethodType,
  removeMethod,
  createParam,
  removeParam,
  createQuery,
  removeQuery,
  updateMethodBody,
} = routesSlice.actions;
export default routesSlice.reducer;
