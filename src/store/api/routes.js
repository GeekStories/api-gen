import { createSlice, current } from "@reduxjs/toolkit";
import RandomString from "../../utils/randomString";

const METHOD_TYPES = ["get", "post", "delete", "put", "patch"];

export const routesSlice = createSlice({
  name: "routes",
  initialState: [],
  reducers: {
    createRoute: (state, action = {}) => {
      let name = action?.payload?.name
        ? action.payload.name === ""
          ? `newroute${RandomString(3)}`
          : action.payload.name
        : `newroute${RandomString(3)}`;

      const routes = JSON.parse(JSON.stringify(state));
      if (routes.find((route) => route.name === name)) {
        console.log("route already exists");
        name = `newroute${RandomString(3)}`;
      }

      return [
        ...routes,
        {
          id: `route_${routes.length}`,
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
      const routes = JSON.parse(JSON.stringify(state));
      console.log(type);

      const route = state.find((route) => route.id === routeId);
      const routeIndex = routes.findIndex((route) => route.id === routeId);

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
          id: `met_${routeIndex}_${route.methods.length}`,
          type: type ? type : difference[0],
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

      const currentMethods = METHOD_TYPES.filter((TYPE) =>
        route.methods
          .reduce((previous, current) => previous + current.type, [])
          .includes(TYPE)
      );

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
      const routes = JSON.parse(JSON.stringify(state));

      const route = state.find((route) => route.id === routeId);
      const routeIndex = routes.findIndex((route) => route.id === routeId);
      const methodIndex = route.methods.findIndex(
        (method) => method.id === methodId
      );

      route.methods[methodIndex].params = [
        ...route.methods[methodIndex].params,
        {
          ...newParam,
          id: `param_${routeIndex}_${methodIndex}_${route.methods[methodIndex].params.length}`,
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
      const routes = JSON.parse(JSON.stringify(state));

      const route = state.find((route) => route.id === routeId);
      const routeIndex = routes.findIndex((route) => route.id === routeId);
      const methodIndex = route.methods.findIndex(
        (method) => method.id === methodId
      );

      route.methods[methodIndex].queries = [
        ...route.methods[methodIndex].queries,
        {
          ...newQuery,
          id: `query_${routeIndex}_${methodIndex}_${route.methods[methodIndex].queries.length}`,
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
      console.log(routeId, methodId, newValue);
      const route = state.find((route) => route.id === routeId);
      console.log(current(route.methods));
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
