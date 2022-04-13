import tw from "tailwind-styled-components";

const StyledMain = tw.div`grid grid-rows-2 w-[65%] mx-auto`;
const StyledInputGroup1 = tw.div`grid grid-cols-2 gap-4`;
const StyledInputGroup2 = tw.div`flex gap-4 m-auto`;
const StyledInputGroupItem = tw.div`grid grid-cols-2 my-1`;
const StyledCheckboxWrapper = tw.div`col-span-2 flex gap-2 my-auto font-mono text-sm`;
const StyledInput = tw.input`col-span-4 h-8 pl-2 rounded border-2 bg-gray-300 shadow-inner text-lg`;

const StringValidationOptions = ({
  isMaxLengthEnabled,
  maxLength,
  handleSwitchMaxLength,
  isMinLengthEnabled,
  minLength,
  handleSwitchMinLength,
  alphanum,
  stringRequired,
  handleChangeMaxLength,
  handleChangeMinLength,
  handleStringCheckBox,
}) => {
  return (
    <StyledMain>
      <StyledInputGroup1>
        <StyledInputGroupItem>
          <StyledCheckboxWrapper>
            <label htmlFor="maxLength">Max. Length</label>
            <input
              type="checkbox"
              id="maxLength"
              name="maxLength"
              checked={isMaxLengthEnabled}
              onChange={handleSwitchMaxLength}
            />{" "}
          </StyledCheckboxWrapper>

          <StyledInput
            type="number"
            id="maxLength"
            value={maxLength}
            disabled={!isMaxLengthEnabled}
            onChange={handleChangeMaxLength}
          />
        </StyledInputGroupItem>

        <StyledInputGroupItem>
          <StyledCheckboxWrapper>
            <label htmlFor="minLength">Min. Length</label>
            <input
              type="checkbox"
              id="minLength"
              name="minLength"
              checked={isMinLengthEnabled}
              onChange={handleSwitchMinLength}
            />{" "}
          </StyledCheckboxWrapper>
          <StyledInput
            type="number"
            id="minLength"
            value={minLength}
            disabled={!isMinLengthEnabled}
            onChange={handleChangeMinLength}
          />
        </StyledInputGroupItem>
      </StyledInputGroup1>

      <StyledInputGroup2>
        <StyledCheckboxWrapper>
          <input
            type="checkbox"
            id="alphanum"
            name="alphanum"
            checked={alphanum}
            onChange={() => handleStringCheckBox("alphanum")}
          />{" "}
          <label htmlFor="alphanum">alpha num.</label>
        </StyledCheckboxWrapper>

        <StyledCheckboxWrapper>
          <input
            type="checkbox"
            id="required"
            name="required"
            checked={stringRequired}
            onChange={() => handleStringCheckBox("required")}
          />{" "}
          <label htmlFor="required">required</label>
        </StyledCheckboxWrapper>
      </StyledInputGroup2>
    </StyledMain>
  );
};

export default StringValidationOptions;
