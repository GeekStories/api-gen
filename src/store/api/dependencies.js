import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { name: "express", version: "4.18.2", id: "dep_0" },
  { name: "cors", version: "2.8.5", id: "dep_1" },
  { name: "celebrate", version: "15.0.1", id: "dep_3" },
];

export const dependencySlice = createSlice({
  name: "dependencies",
  initialState,
  reducers: {
    add: (state, action) => {
      const dependencies = JSON.parse(JSON.stringify(state));
      const exists = dependencies.some((el) => el.name === action.payload.name);
      if (!exists)
        return [
          ...dependencies,
          {
            name: action.payload.name,
            version: action.payload.version,
            id: `dep_${state.length}`,
          },
        ];
    },
    remove: (state, action) => {
      const dependencies = JSON.parse(JSON.stringify(state));
      const exists = dependencies.some((el) => el.name === action.payload.name);
      if (exists)
        return [...dependencies.filter((d) => d.id !== action.payload.id)];
    },
  },
});

export const { add, remove } = dependencySlice.actions;
export default dependencySlice.reducer;
