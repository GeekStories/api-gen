import tw from "tailwind-styled-components";

const StyledMain = tw.div`
  col-span-10
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
  col-span-11
  border-2
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

const StyledRouteOptionsWrapper = tw.div`overflow-y-scroll max-h-[26rem]`;
const StyledOptionsLabel = tw.p`
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

const RouteForm = () => {
  return (
    <StyledMain>
      <StyledRouteBasicInfoWrapper>
        <StyledRouteMethodSelector>
          <option>GET</option>
        </StyledRouteMethodSelector>
        <StyledRouteNameInputWrapper>
          <StyledRouteNamePrefix>/</StyledRouteNamePrefix>
          <StyledRouteNameInput type="text" placeholder="users" />
        </StyledRouteNameInputWrapper>
      </StyledRouteBasicInfoWrapper>

      <StyledRouteOptionsWrapper>
        <StyledParamsWrapper>
          <StyledOptionsLabel>params</StyledOptionsLabel>
          <StyledList>
            <StyledListItem>
              <StyledListItemText>/users/:id</StyledListItemText>
              <StyledEditListItem>Edit</StyledEditListItem>
              <StyledDeleteListItem>X</StyledDeleteListItem>
            </StyledListItem>
            <StyledListItem>
              <StyledListItemText>/users/:id</StyledListItemText>
              <StyledEditListItem>Edit</StyledEditListItem>
              <StyledDeleteListItem>X</StyledDeleteListItem>
            </StyledListItem>
            <StyledListItem>
              <StyledListItemText>/users/:id</StyledListItemText>
              <StyledEditListItem>Edit</StyledEditListItem>
              <StyledDeleteListItem>X</StyledDeleteListItem>
            </StyledListItem>
            <StyledListItem>
              <StyledListItemText>/users/:id</StyledListItemText>
              <StyledEditListItem>Edit</StyledEditListItem>
              <StyledDeleteListItem>X</StyledDeleteListItem>
            </StyledListItem>
          </StyledList>
          <StyledNewItemWrapper>
            <StyledNewItem>New</StyledNewItem>
          </StyledNewItemWrapper>
        </StyledParamsWrapper>

        <StyledQueriesWrapper>
          <StyledOptionsLabel>query</StyledOptionsLabel>
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
          <StyledOptionsLabel>body</StyledOptionsLabel>
          <StyledBodyTextArea
            rows="10"
            defaultValue={JSON.stringify(
              { name: "string", age: "number", password: "string" },
              null,
              "\t"
            )}
          ></StyledBodyTextArea>
        </StyledBodyWrapper>
      </StyledRouteOptionsWrapper>
    </StyledMain>
  );
};

export default RouteForm;
