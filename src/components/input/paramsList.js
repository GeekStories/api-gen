import tw from "tailwind-styled-components";

import ParamItem from "./paramItem";

const StyledParamsWrapper = tw.div`p-1 h-44`;
const StyledList = tw.ol`p-1 h-20 overflow-y-scroll border-2`;
const StyledOptionLabel = tw.p`font-medium underline underline-offset-1`;
const StyledNewItemButton = tw.button`flex mt-1 ml-auto border-2 px-5 py-1`;

const ParamsList = ({
  optionLabel,
  listItems,
  routeName,
  handleOpenModal,
  paramType,
  handleRemoveParam,
}) => {
  return (
    <StyledParamsWrapper>
      <StyledOptionLabel>{optionLabel}</StyledOptionLabel>
      <StyledList>
        {listItems
          ? listItems.map((item) => (
              <ParamItem
                key={item.id}
                item={item}
                routeName={routeName}
                paramType={paramType}
                handleRemoveParam={handleRemoveParam}
              />
            ))
          : null}
        <StyledNewItemButton onClick={handleOpenModal}>New</StyledNewItemButton>
      </StyledList>
    </StyledParamsWrapper>
  );
};

export default ParamsList;
