import tw from "tailwind-styled-components";
import RouteItem from "./routeItem";

const Main = tw.div`xl:col-span-2 col-span-3 px-1 border-b-[1px] border-l-[1px] border-black`;
const RoutesTitle = tw.h1`text-lg text-center font-medium underline`;
const List = tw.ol`flex flex-col gap-2 list-none p-1 max-h-[23rem] overflow-y-scroll`;
const NewRouteButton = tw.button`h-10 w-full border-2 border-gray-300 p-2 my-1 rounded transition-all ease-in-out delay-150 hover:bg-gray-300 hover:border-gray-400`;

const RoutesList = ({
  routes,
  UpdateForm,
  handleSelectRoute,
  handleSelectMethod,
}) => {
  return (
    <Main>
      <RoutesTitle>Routes</RoutesTitle>
      <List>
        {routes.map((route) => {
          return (
            <RouteItem
              key={route.id}
              route={route}
              UpdateForm={UpdateForm}
              handleSelectRoute={handleSelectRoute}
              handleSelectMethod={handleSelectMethod}
            />
          );
        })}
      </List>

      <NewRouteButton onClick={() => UpdateForm({ UPDATE_TYPE: "new_route" })}>
        New Route
      </NewRouteButton>
    </Main>
  );
};

export default RoutesList;
