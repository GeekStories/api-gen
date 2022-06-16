import tw from "tailwind-styled-components";
import { BsFillTrashFill } from "react-icons/bs";
import { BiAddToQueue } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";
import MethodSelector from "./methodSelector";

import {
  removeRoute,
  createMethod,
  removeMethod,
} from "../../store/api/routes";
import { useDispatch } from "react-redux";

const RoutesListItem = tw.li`flex flex-col gap-1 text-lg font-mono border-b-2 border-gray-300 py-1`;
const RouteInfoWrapper = tw.div`w-full flex justify-between`;
const RoutePathLabel = tw.div`font-mono hover:cursor-pointer hover:underline`;
const NewMethodButton = tw(BiAddToQueue)`my-auto hover:cursor-pointer`;
const DeleteRouteButton = tw(BsFillTrashFill)`my-auto hover:cursor-pointer`;
const DeleteMethodButton = tw(BsFillTrashFill)`w-full my-auto hover:cursor-pointer`;
const EditMethodButton = tw(AiFillEdit)`w-full my-auto hover:cursor-pointer`;
const RouteControls = tw.div`flex justify-end my-auto gap-2 pr-1`;
const Method = tw.div`grid grid-cols-2 gap-2`;
const MethodControls = tw.div`flex mr-auto`;

const RouteItem = ({ route, handleSelectRoute, handleSelectMethod }) => {
  const dispatch = useDispatch();
  return (
    <RoutesListItem>
      <RouteInfoWrapper onClick={() => handleSelectRoute(route.id)}>
        <RoutePathLabel>{`/${route.name}`}</RoutePathLabel>
        <RouteControls>
          <NewMethodButton
            onClick={() => dispatch(createMethod({ routeId: route.id }))}
          />
          <DeleteRouteButton
            onClick={() => dispatch(removeRoute({ routeId: route.id }))}
          />
        </RouteControls>
      </RouteInfoWrapper>

      {route.methods.map((method) => (
        <Method key={method.id}>
          <MethodSelector
            routeId={route.id}
            methodId={method.id}
            currentMethod={method.type}
          />
          <MethodControls>
            <EditMethodButton
              onClick={() => handleSelectMethod(method.id, route.id)}
            />
            <DeleteMethodButton
              onClick={() =>
                dispatch(
                  removeMethod({ routeId: route.id, methodId: method.id })
                )
              }
            />
          </MethodControls>
        </Method>
      ))}
    </RoutesListItem>
  );
};

export default RouteItem;
