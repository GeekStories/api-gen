import tw from "tailwind-styled-components";
import RoutesList from "./routesList";
import RoutesForm from "./routeForm";

const StyledMain = tw.div`
  col-span-10
  grid
  grid-cols-12
  gap-1
`;

const Routes = ({ routes, setFormData }) => {
  return (
    <StyledMain>
      <RoutesList />
      <RoutesForm />
    </StyledMain>
  );
};

export default Routes;
