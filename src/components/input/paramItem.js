import tw from "tailwind-styled-components";

const StyledListItem = tw.li`grid grid-cols-12 gap-1 border-2 p-1 my-1`;
const StyledListItemText = tw.div`col-span-10 font-thin flex flex-row gap-1`;
const StyledOptionsList = tw.p`before:content-['|']`;
const StyledEditListItem = tw.button`col-span-1 border-2`;
const StyledDeleteListItem = tw.button`col-span-1 border-2`;

const ParamItem = ({ item, routeName, paramType }) => {
  return (
    <StyledListItem>
      <StyledListItemText>
        {routeName === "" ? `../:${item.name}` : `/${routeName}/:${item.name}`}{" "}
        {item.options.map((option) => (
          <StyledOptionsList
            key={`option_${paramType}_${option.key}`}
          >{` ${option.key}: ${option.value}`}</StyledOptionsList>
        ))}
      </StyledListItemText>
      <StyledEditListItem>Edit</StyledEditListItem>
      <StyledDeleteListItem>X</StyledDeleteListItem>
    </StyledListItem>
  );
};

export default ParamItem;
