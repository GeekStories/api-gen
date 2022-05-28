import { configureStore } from "@reduxjs/toolkit";

import dependencyReducer from "./api/dependencies";
import routeReducer from "./api/routes";

export const store = configureStore({
  reducer: {
    dependencies: dependencyReducer,
    routes: routeReducer,
  },
});

export default store;
