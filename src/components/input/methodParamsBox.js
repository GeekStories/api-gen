import tw from "tailwind-styled-components";

const StyledParamsWrapper = tw.div`p-1 h-44`;
const StyledList = tw.ol`p-1 h-20 overflow-y-scroll border-2`;
const StyledListItem = tw.li`grid grid-cols-12 gap-1 border-2 p-1 my-1`;
const StyledOptionLabel = tw.p`font-medium underline underline-offset-1`;
const StyledListItemText = tw.p`col-span-10 font-thin`;
const StyledEditListItem = tw.button`col-span-1 border-2`;
const StyledDeleteListItem = tw.button`col-span-1 border-2`;
const StyledNewItemButton = tw.button`flex ml-auto mt-1 border-2 px-5 py-1`;

const RouteParamsBox = ({ params, routeName, handleOpenParamsModal }) => {
  return (
    <StyledParamsWrapper>
      <StyledOptionLabel>Parameters</StyledOptionLabel>
      <StyledList>
        {params
          ? params.map((param) => (
              <StyledListItem key={param.id}>
                <StyledListItemText>
                  {routeName === ""
                    ? `../:${param.name}`
                    : `/${routeName}/:${param.name}`}
                </StyledListItemText>
                <StyledEditListItem>Edit</StyledEditListItem>
                <StyledDeleteListItem>X</StyledDeleteListItem>
              </StyledListItem>
            ))
          : null}
      </StyledList>
      <StyledNewItemButton onClick={handleOpenParamsModal}>
        New
      </StyledNewItemButton>
    </StyledParamsWrapper>
  );
};

export default RouteParamsBox;
