import tw from "tailwind-styled-components";

import Input from "./components/input";
import Output from "./components/output";
import { useState } from "react";

const StyledMain = tw.div`
  h-screen
  grid
  grid-rows-2
  gap-1
`;

const defaultFormData = {
  dependencies: [
    { name: "express", id: "dep_0" },
    { name: "react@v18.0.0", id: "dep_1" },
    { name: "react-dom@v18.0.0", id: "dep_2" },
  ],
  routes: [],
  files: [],
};

const App = () => {
  const [formData, setFormData] = useState(defaultFormData);

  return (
    <StyledMain>
      <Input formData={formData} setFormData={setFormData} />
      <Output />
    </StyledMain>
  );
};

export default App;
