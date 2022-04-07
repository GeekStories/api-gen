import tw from "tailwind-styled-components";
import MethodSelector from "./methodSelector";

const StyledRoutesListItem = tw.li`
  my-2
  text-lg
  font-mono

  &:hover {
    cursor-pointer
  }
`;

const StyledNewStatusButton = tw.button`
  ml-16
  my-1
  px-5
  border-2
`;
const StyledDeleteMethodButton = tw.button`
  ml-10
  mb-1
  px-5
  border-2
`;
const StyledNewMethodButton = tw.button`
  ml-10
  my-1
  px-5
  border-2
`;

const StyledRouteMethodLabel = tw.div`text-sm ml-10`;
const StyledRoutePathLabel = tw.div`text-sm`;
const StyledMethodStatusLabel = tw.div`text-sm ml-16`;

const RouteItem = ({ route, UpdateForm, handleSelectRoute }) => {
  return (
    <StyledRoutesListItem onClick={() => handleSelectRoute(route.id)}>
      <StyledRoutePathLabel>{`/${route.name}`}</StyledRoutePathLabel>
      {route.methods.map((method) => (
        <div key={method.id}>
          <StyledRouteMethodLabel>
            <MethodSelector
              UpdateForm={UpdateForm}
              routeId={route.id}
              methodId={method.id}
              currentMethod={method.type}
            />
          </StyledRouteMethodLabel>
          {method.statuses.map((status) => (
            <StyledMethodStatusLabel key={status.id}>
              {status.value} {`=>`} {status.message}
            </StyledMethodStatusLabel>
          ))}
          <StyledNewStatusButton onClick={() => {}}>
            New Status
          </StyledNewStatusButton>
          <StyledDeleteMethodButton
            onClick={() =>
              UpdateForm({
                UPDATE_TYPE: "remove_method",
                ROUTE_ID: route.id,
                METHOD_ID: method.id,
              })
            }
          >
            Delete Method
          </StyledDeleteMethodButton>
        </div>
      ))}
      <StyledNewMethodButton
        onClick={() =>
          UpdateForm({ UPDATE_TYPE: "new_method", ROUTE_ID: route.id })
        }
      >
        New Method
      </StyledNewMethodButton>
    </StyledRoutesListItem>
  );
};

export default RouteItem;
