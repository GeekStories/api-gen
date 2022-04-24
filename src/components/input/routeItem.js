import tw from "tailwind-styled-components";
import MethodSelector from "./methodSelector";

const RoutesListItem = tw.li`flex flex-col gap-1 text-lg font-mono border-b-2 border-gray-300 py-1 &:hover { cursor-pointer }`;
const Button = tw.button`border-2 transition-all ease-in-out delay-100 hover:bg-gray-300 hover:border-gray-400`;
const RouteInfoWrapper = tw.div`grid grid-cols-12`;
const RoutePathLabel = tw.div`col-span-7 font-mono hover:cursor-pointer`;
const NewMethodButton = tw(Button)`col-span-5 border-2 text-[16px]`;
const RouteControls = tw.div`grid grid-cols-3 gap-1`;

const RouteItem = ({
  route,
  UpdateForm,
  handleSelectRoute,
  handleSelectMethod,
}) => {
  const handleRemoveMethod = (methodId, routeId) => {
    UpdateForm({
      UPDATE_TYPE: "remove_method",
      ROUTE_ID: routeId,
      METHOD_ID: methodId,
    });
  };

  return (
    <RoutesListItem>
      <RouteInfoWrapper>
        <RoutePathLabel
          onClick={() => handleSelectRoute(route.id)}
        >{`/${route.name}`}</RoutePathLabel>
        <NewMethodButton
          onClick={() =>
            UpdateForm({ UPDATE_TYPE: "new_method", ROUTE_ID: route.id })
          }
        >
          New Method
        </NewMethodButton>
      </RouteInfoWrapper>

      {route.methods.map((method) => (
        <RouteControls key={method.id}>
          <MethodSelector
            UpdateForm={UpdateForm}
            routeId={route.id}
            methodId={method.id}
            currentMethod={method.type}
          />

          <Button onClick={() => handleRemoveMethod(method.id, route.id)}>
            Delete
          </Button>
          <Button onClick={() => handleSelectMethod(method.id, route.id)}>
            Select
          </Button>
        </RouteControls>
      ))}
    </RoutesListItem>
  );
};

export default RouteItem;
