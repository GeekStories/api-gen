import tw from "tailwind-styled-components";
import RouteItem from "./routeItem";

import { useSelector, useDispatch } from "react-redux";
import { createRoute } from "../../store/api/routes";

const Main = tw.div`xl:col-span-2 col-span-3 px-1 border-b-[1px] border-l-[1px] border-black`;
const RoutesTitle = tw.h1`text-lg text-center font-medium underline`;
const List = tw.ol`flex flex-col gap-2 list-none p-1 max-h-[23rem] overflow-y-scroll`;
const NewRouteButton = tw.button`h-10 w-full border-2 border-gray-200 my-1 rounded transition-all ease-in-out delay-150 hover:bg-gray-200 hover:border-gray-300`;

const RoutesList = ({
  handleSelectRoute,
  handleSelectMethod,
  routeName,
  selectedRouteName,
}) => {
  const routes = useSelector((state) => state.routes);
  const dispatch = useDispatch();

  return (
    <Main>
      <RoutesTitle>Routes</RoutesTitle>
      <List>
        {routes &&
          routes.map((route) => {
            return (
              <RouteItem
                key={route.id}
                route={route}
                handleSelectRoute={handleSelectRoute}
                handleSelectMethod={handleSelectMethod}
                $selected={route.name === selectedRouteName}
              />
            );
          })}
      </List>

      <NewRouteButton
        onClick={() => dispatch(createRoute({ name: routeName }))}
      >
        New Route
      </NewRouteButton>
    </Main>
  );
};

export default RoutesList;
