import tw from "tailwind-styled-components";
import { useState } from "react";

const StyledRoutesListItem = tw.li`
  my-2
  text-lg
  font-mono

  &:hover {
    cursor-pointer
  }
`;

const StyledRouteMethodSelector = tw.select`
  col-span-1
  text-lg
  border-2
`;

const StyledNewStatusButton = tw.button`
  ml-16
  my-1
  px-5
  border-2
`;
const StyledNewMethodButton = tw.button`
  ml-10
  px-5
  border-2
`;

const StyledRouteMethodLabel = tw.div`text-sm ml-10`;
const StyledRoutePathLabel = tw.div`text-sm`;
const StyledMethodStatusLabel = tw.div`text-sm ml-16`;

const RouteItem = ({ route, handleUpdateRoute, handleSelectRoute }) => {
  const [routeMethod, setRouteMethod] = useState("GET");

  const handleUpdateMethod = (e) => {
    handleUpdateRoute({
      id: route.id,
      item: "METHOD",
      value: e.target.value,
    });

    setRouteMethod(e.target.value);
  };

  const handleNewStatus = () => {};

  const handleNewMethod = () => {};

  return (
    <StyledRoutesListItem onClick={() => handleSelectRoute(route.id)}>
      <StyledRoutePathLabel>{`/${route.name}`}</StyledRoutePathLabel>
      {route.methods.map((method) => (
        <div key={method.id}>
          <StyledRouteMethodLabel>
            <StyledRouteMethodSelector
              value={routeMethod}
              onChange={handleUpdateMethod}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="PATCH">PATCH</option>
              <option value="DELETE">DELETE</option>
            </StyledRouteMethodSelector>
          </StyledRouteMethodLabel>
          {method.statuses.map((status) => (
            <StyledMethodStatusLabel key={status.id}>
              {status.value} {`=>`} {status.message}
            </StyledMethodStatusLabel>
          ))}
          <StyledNewStatusButton onClick={handleNewStatus}>
            New Status
          </StyledNewStatusButton>
        </div>
      ))}
      <StyledNewMethodButton onClick={handleNewMethod}>
        New Method
      </StyledNewMethodButton>
    </StyledRoutesListItem>
  );
};

export default RouteItem;
