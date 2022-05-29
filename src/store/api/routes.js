import { createSlice } from "@reduxjs/toolkit";
import RandomString from "../../utils/randomString";

const METHOD_TYPES = ["GET", "POST", "DELETE", "PUT", "PATCH"];

export const routesSlice = createSlice({
  name: "routes",
  initialState: [],
  reducers: {
    createRoute: (state) => {
      const routes = JSON.parse(JSON.stringify(state));
      return [
        ...routes,
        {
          id: `route_${routes.length}`,
          name: `newroute${RandomString(3)}`,
          methods: [
            {
              id: `met_${routes.length}_0`,
              type: "GET",
              params: [],
              queries: [],
              body: null,
            },
          ],
        },
      ];
    },
    removeRoute: (state, action) => {
      const { routeId } = action.payload;
      const routes = JSON.parse(JSON.stringify(state));
      return [...routes.filter((r) => r.id !== routeId)];
    },
    updateRouteName: (state, action) => {
      const { routeId, newValue } = action.payload;
      const InvalidChars = newValue.match(/[^a-z]/g);
      if (InvalidChars) {
        console.log("invalid character in route name: ", InvalidChars);
        return state;
      }

      const route = state.find((route) => route.id === routeId);
      route.name = newValue;
    },
    createMethod: (state, action) => {
      const { routeId } = action.payload;
      const routes = JSON.parse(JSON.stringify(state));
      const route = state.find((route) => route.id === routeId);
      const routeIndex = routes.findIndex((route) => route.id === routeId);

      if (route.methods.length < 5) {
        const difference = METHOD_TYPES.filter(
          (type) =>
            !route.methods
              .reduce((prev, curr) => prev + curr.type, [])
              .includes(type)
        );

        route.methods = [
          ...route.methods,
          {
            id: `met_${routeIndex}_${route.methods.length}`,
            type: difference[0],
            params: [],
            queries: [],
            body: null,
          },
        ];
      }
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
      const route = state.find((route) => route.id === routeId);
      const method = route.methods.find((method) => method.id === methodId);
      method.body = newValue;
    }
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
