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
const StyledRouteMethodSelector = tw.select`
  col-span-1
  text-lg
  border-2
`;
const StyledRouteNameInputWrapper = tw.div`
  col-span-10
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
  w-[90%]
  p-1
  &:focus {
    outline-none
  }
`;

const StyledRouteOptionWrapper = tw.div`overflow-y-scroll max-h-[26rem]`;
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

const RouteForm = ({ selectedRoute, handleRemoveRoute, handleUpdateRoute }) => {
  const [routeName, setRouteName] = useState("");
  const [routeMethod, setRouteMethod] = useState("GET");

  const handleRouteNameInput = (e) => {
    const InvalidChars = e.target.value.match(
      /[A-Z0-9\\/!@#$%^&*()_=\-+?<>,.;:'"`~[\]{}\s]/g
    );

    if (InvalidChars) {
      console.log("invalid character in route name: ", InvalidChars);
      return;
    }

    handleUpdateRoute({
      id: selectedRoute.id,
      item: "NAME",
      value: e.target.value,
    });

    setRouteName(e.target.value);
  };

  const handleUpdateMethod = (e) => {
    handleUpdateRoute({
      id: selectedRoute.id,
      item: "METHOD",
      value: e.target.value,
    });

    setRouteMethod(e.target.value);
  };

  const handleRemoveSelectedRoute = (id) => {
    handleRemoveRoute(id);

    setRouteName("");
    setRouteMethod("GET");
    selectedRoute = {};
  };

  useEffect(() => {
    if (selectedRoute) {
      const { name, method } = selectedRoute;

      setRouteName(name??'');
      setRouteMethod(method??'GET');
    }
  }, [selectedRoute]);

  return (
    <StyledMain>
      <StyledRouteBasicInfoWrapper>
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
        <StyledRouteNameInputWrapper>
          <StyledRouteNamePrefix>/</StyledRouteNamePrefix>
          <StyledRouteNameInput
            type="text"
            value={routeName}
            onChange={handleRouteNameInput}
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
                  <StyledListItem>
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
            <StyledListItem>
              <StyledListItemText>/users/?name={"<string>"}</StyledListItemText>
              <StyledEditListItem>Edit</StyledEditListItem>
              <StyledDeleteListItem>X</StyledDeleteListItem>
            </StyledListItem>
            <StyledListItem>
              <StyledListItemText>/users/?name={"<string>"}</StyledListItemText>
              <StyledEditListItem>Edit</StyledEditListItem>
              <StyledDeleteListItem>X</StyledDeleteListItem>
            </StyledListItem>
            <StyledListItem>
              <StyledListItemText>/users/?name={"<string>"}</StyledListItemText>
              <StyledEditListItem>Edit</StyledEditListItem>
              <StyledDeleteListItem>X</StyledDeleteListItem>
            </StyledListItem>
            <StyledListItem>
              <StyledListItemText>/users/?name={"<string>"}</StyledListItemText>
              <StyledEditListItem>Edit</StyledEditListItem>
              <StyledDeleteListItem>X</StyledDeleteListItem>
            </StyledListItem>
          </StyledList>
          <StyledNewItem>New</StyledNewItem>
        </StyledQueriesWrapper>

        <StyledBodyWrapper>
          <StyledOptionLabel>body</StyledOptionLabel>
          <StyledBodyTextArea
            rows="10"
            defaultValue={JSON.stringify(
              { name: "string", age: "number", password: "string" },
              null,
              "\t"
            )}
          ></StyledBodyTextArea>
        </StyledBodyWrapper>
      </StyledRouteOptionWrapper>
    </StyledMain>
  );
};

export default RouteForm;
