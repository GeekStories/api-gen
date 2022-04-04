import Form from "./components/form";
import Output from "./components/output";

import tw from "tailwind-styled-components";

const StyledMain = tw.div`
  h-screen
  grid
  grid-rows-2
  gap-1
  p-1
`;

const App = () => {
  return (
    <StyledMain>
      <Form />
      <Output />
    </StyledMain>
  );
};

export default App;
