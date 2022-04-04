import tw from "tailwind-styled-components";

const StyledMain = tw.div`
  col-span-2
  flex
  flex-col
  border-2
  border-black
  gap-1
  text-center
  p-1
`;

const StyledListTitle = tw.h1`
  text-lg
  font-medium
  underline
`;

const StyledInputWrapper = tw.div`
  grid
  grid-cols-6
  gap-1
`;

const StyledInput = tw.input`
  col-span-5
  border-2
`;

const StyledAddButton = tw.button`
  col-span-1;
  border-2
  text-sm
`;

const StyledListWrapper = tw.ol`
  h-full
  p-1
`;

const StyledListItem = tw.li`
  flex
  justify-between
  border-2
  p-1
`;

const StyledDeleteButton = tw.button`
  border-2
  px-3
`;

const Dependencies = () => {
  return (
    <StyledMain>
      <StyledListTitle>Dependencies</StyledListTitle>
      <StyledInputWrapper>
        <StyledInput type="text" placeholder="cors" />
        <StyledAddButton>Add</StyledAddButton>
      </StyledInputWrapper>
      <StyledListWrapper>
        <StyledListItem>
          express
          <StyledDeleteButton>X</StyledDeleteButton>
        </StyledListItem>
      </StyledListWrapper>
    </StyledMain>
  );
};

export default Dependencies;
