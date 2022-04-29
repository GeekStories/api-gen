import tw from "tailwind-styled-components";
import { BsFillTrashFill } from "react-icons/bs";
import { BiAddToQueue } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";
import MethodSelector from "./methodSelector";

const RoutesListItem = tw.li`flex flex-col gap-1 text-lg font-mono border-b-2 border-gray-300 py-1 &:hover { cursor-pointer }`;
const RouteInfoWrapper = tw.div`w-full flex justify-between`;
const RoutePathLabel = tw.div`font-mono hover:cursor-pointer`;
const NewMethodButton = tw(BiAddToQueue)`my-auto`;
const DeleteMethodButton = tw(BsFillTrashFill)`w-full my-auto`;
const EditMethodButton = tw(AiFillEdit)`w-full my-auto`;
const RouteControls = tw.div`flex my-auto gap-2 pr-1`;
const MethodControls = tw.div`grid grid-cols-3 gap-2`;

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

  const handleRemoveSelectedRoute = (routeId) => {
    UpdateForm({ UPDATE_TYPE: "remove_route", ROUTE_ID: routeId });
  };

  return (
    <RoutesListItem>
      <RouteInfoWrapper>
        <RoutePathLabel
          onClick={() => handleSelectRoute(route.id)}
        >{`/${route.name}`}</RoutePathLabel>
        <RouteControls>
          <NewMethodButton
            onClick={() =>
              UpdateForm({ UPDATE_TYPE: "new_method", ROUTE_ID: route.id })
            }
          />
          <BsFillTrashFill
            onClick={() => handleRemoveSelectedRoute(route.id)}
          />
        </RouteControls>
      </RouteInfoWrapper>

      {route.methods.map((method) => (
        <MethodControls key={method.id}>
          <MethodSelector
            UpdateForm={UpdateForm}
            routeId={route.id}
            methodId={method.id}
            currentMethod={method.type}
          />

          <DeleteMethodButton
            onClick={() => handleRemoveMethod(method.id, route.id)}
          />
          <EditMethodButton
            onClick={() => handleSelectMethod(method.id, route.id)}
          />
        </MethodControls>
      ))}
    </RoutesListItem>
  );
};

export default RouteItem;
