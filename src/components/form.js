import tw from "tailwind-styled-components";
import Dependencies from "./dependencies";
import Routes from "./routes";

const StyledMain = tw.div`
  w-full
  grid
  grid-cols-12
  gap-1
  rounded-sm
`;

const Form = () => {
  return (
    <StyledMain>
      <Dependencies />
      <Routes />
    </StyledMain>
  );
};

export default Form;
