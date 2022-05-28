import tw from "tailwind-styled-components";

const StyledListItem = tw.li`flex flex-row gap-4 border-2 p-1 mb-1`;
const StyledListItemText = tw.div`font-thin flex flex-row gap-1 my-auto`;
const StyledOptionsList = tw.p`before:content-['|']`;
const StyledDeleteItem = tw.button`px-10 border-2`;

const ParamItem = ({ item, routeName, paramType, handleRemoveParam }) => {
  return (
    <StyledListItem>
      <StyledListItemText>
        {paramType === "param"
          ? routeName === ""
            ? `../:${item.name}`
            : `/${routeName}/:${item.name}`
          : routeName === ""
          ? `..?${item.name}=<${item.type}>`
          : `/${routeName}?${item.name}=<${item.type}>`}

        {item.options?.map((option) => (
          <StyledOptionsList
            key={`option_${paramType}_${option.key}`}
          >{` ${option.key}: ${option.value}`}</StyledOptionsList>
        ))}
      </StyledListItemText>
      <StyledDeleteItem onClick={() => handleRemoveParam(item.id, paramType)}>
        Delete
      </StyledDeleteItem>
    </StyledListItem>
  );
};

export default ParamItem;
