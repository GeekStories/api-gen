import tw from "tailwind-styled-components";
import { useState, useEffect } from "react";

const StyledMain = tw.div`
  col-span-8
  border-black
  border-l-2
  border-b-2
  p-1
`;

const StyledRouteBasicInfoWrapper = tw.div`
  grid
  grid-cols-12
  gap-1
`;

const StyledRouteNameInputWrapper = tw.div`
  col-span-11
  border-2
`;

const StyledDeleteButton = tw.button`
  col-span-1
  border-2
  py-1
  px-3
`;

const StyledRouteNamePrefix = tw.span`
  text-lg 
  mx-1
  text-right
`;

const StyledRouteNameInput = tw.input`
  w-[95%]
  p-1
  &:focus {
    outline-none
  }
`;

const StyledRouteOptionWrapper = tw.div`
  overflow-y-scroll
  max-h-[26rem]
`;

const StyledOptionLabel = tw.p`
  font-medium
  underline
  underline-offset-1
`;

const StyledParamsWrapper = tw.div`
  border-2
  p-1
  my-1
  max-h-[11.5rem]
`;

const StyledQueriesWrapper = tw.div`
  border-2
  p-1
  max-h-[11.5rem]
`;

const StyledBodyWrapper = tw.div`
  border-2
  p-1
  max-h-[11.5rem]
  my-1
`;

const StyledList = tw.ol`
  p-1
  my-1
  max-h-24
  overflow-y-scroll
`;

const StyledListItem = tw.li`
  grid
  grid-cols-12
  gap-1
  border-2
  p-1
  my-1
`;

const StyledListItemText = tw.p`
  col-span-10
  font-thin
`;

const StyledEditListItem = tw.button`
  col-span-1
  border-2
`;

const StyledDeleteListItem = tw.button`
  col-span-1
  border-2
`;

const StyledNewItemWrapper = tw.div`
  w-full
`;

const StyledNewItem = tw.button`
  flex
  ml-auto
  border-2
  px-5
  py-1
`;

const StyledBodyTextArea = tw.textarea`
  min-w-full
  border-2
`;

const BodyDefaultValue = JSON.stringify(
  { name: "string", age: "number", password: "string" },
  null,
  "\t"
);

const RouteForm = ({ selectedRoute, UpdateForm }) => {
  const [routeName, setRouteName] = useState("");

  const handleRouteNameInput = (e, routeId) => {
    const InvalidChars = e.target.value.match(
      /[A-Z0-9\\/!@#$%^&*()_=\-+?<>,.;:'"`~[\]{}\s]/g
    );

    if (InvalidChars) {
      console.log("invalid character in route name: ", InvalidChars);
      return;
    }

    UpdateForm({
      UPDATE_TYPE: "change_route_name",
      ROUTE_ID: routeId,
      NEW_NAME: e.target.value,
    });
    setRouteName(e.target.value);
  };

  const handleRemoveSelectedRoute = (routeId) => {
    UpdateForm({ UPDATE_TYPE: "remove_route", ROUTE_ID: routeId });

    setRouteName("");
    selectedRoute = {};
  };

  useEffect(() => {
    if (selectedRoute) {
      const { name } = selectedRoute;

      setRouteName(name ?? "");
    }
  }, [selectedRoute]);

  return (
    <StyledMain>
      <StyledRouteBasicInfoWrapper>
        <StyledRouteNameInputWrapper>
          <StyledRouteNamePrefix>/</StyledRouteNamePrefix>
          <StyledRouteNameInput
            type="text"
            value={routeName}
            onChange={(e) => handleRouteNameInput(e, selectedRoute.id)}
          />
        </StyledRouteNameInputWrapper>
        <StyledDeleteButton
          onClick={() => handleRemoveSelectedRoute(selectedRoute.id)}
        >
          Delete
        </StyledDeleteButton>
      </StyledRouteBasicInfoWrapper>
      <StyledRouteOptionWrapper>
        <StyledParamsWrapper>
          <StyledOptionLabel>params</StyledOptionLabel>
          <StyledList>
            {selectedRoute.params
              ? selectedRoute.params.map((param) => (
                  <StyledListItem key={param.id}>
                    <StyledListItemText>
                      {`/${selectedRoute.name}/:${param.name}`}
                    </StyledListItemText>
                    <StyledEditListItem>Edit</StyledEditListItem>
                    <StyledDeleteListItem>X</StyledDeleteListItem>
                  </StyledListItem>
                ))
              : null}
          </StyledList>
          <StyledNewItemWrapper>
            <StyledNewItem>New</StyledNewItem>
          </StyledNewItemWrapper>
        </StyledParamsWrapper>
        <StyledQueriesWrapper>
          <StyledOptionLabel>query</StyledOptionLabel>
          <StyledList>
            {selectedRoute.queries
              ? selectedRoute.queries.map((query) => (
                  <StyledListItem key={query.id}>
                    <StyledListItemText>
                      {`/${selectedRoute.name}?${query.name}=<${query.dataType}>`}
                    </StyledListItemText>
                    <StyledEditListItem>Edit</StyledEditListItem>
                    <StyledDeleteListItem>X</StyledDeleteListItem>
                  </StyledListItem>
                ))
              : null}
          </StyledList>
          <StyledNewItem>New</StyledNewItem>
        </StyledQueriesWrapper>
        <StyledBodyWrapper>
          <StyledOptionLabel>body</StyledOptionLabel>
          <StyledBodyTextArea rows="10" defaultValue={BodyDefaultValue} />
        </StyledBodyWrapper>
      </StyledRouteOptionWrapper>
    </StyledMain>
  );
};

export default RouteForm;
