import tw from "tailwind-styled-components";
import MethodSelector from "./methodSelector";

const StyledRoutesListItem = tw.li`flex flex-col gap-2 text-lg font-mono border-b-4 mb-4 p-1 &:hover { cursor-pointer }`;
const StyledRouteItem = tw.div`grid grid-cols-3 gap-1 border-b-2 p-1`;
const StyledButton = tw.button`border-2 text-sm`;
const StyledRoutePathLabel = tw.div`font-mono`;

const RouteItem = ({
  route,
  UpdateForm,
  handleSelectRoute,
  handleSelectMethod,
}) => {
  const handleRemoveMethod = (methodId) => {
    UpdateForm({
      UPDATE_TYPE: "remove_method",
      ROUTE_ID: route.id,
      METHOD_ID: methodId,
    });
  };

  return (
    <StyledRoutesListItem onClick={() => handleSelectRoute(route.id)}>
      <StyledRoutePathLabel>{`/${route.name}`}</StyledRoutePathLabel>
      {route.methods.map((method) => (
        <StyledRouteItem key={method.id}>
          <MethodSelector
            UpdateForm={UpdateForm}
            routeId={route.id}
            methodId={method.id}
            currentMethod={method.type}
          />

          <StyledButton onClick={() => handleRemoveMethod(method.id)}>
            Delete
          </StyledButton>

          <StyledButton onClick={() => handleSelectMethod(method.id, route.id)}>
            Select
          </StyledButton>
        </StyledRouteItem>
      ))}

      <StyledButton
        onClick={() =>
          UpdateForm({ UPDATE_TYPE: "new_method", ROUTE_ID: route.id })
        }
      >
        New Method
      </StyledButton>
    </StyledRoutesListItem>
  );
};

export default RouteItem;
