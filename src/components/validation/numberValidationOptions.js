import tw from "tailwind-styled-components";

const StyledMain = tw.div`grid grid-rows-2 w-[65%] mx-auto`;
const StyledInputGroup1 = tw.div`grid grid-cols-2 gap-4`;
const StyledInputGroup2 = tw.div`flex gap-4 m-auto`;
const StyledInputGroupItemWrapper = tw.div`flex flex-col`;
const StyledInputGroupItem = tw.div`grid grid-cols-6 my-1`;
const StyledCheckboxWrapper = tw.div`col-span-2 my-auto font-mono text-sm`;
const StyledInput = tw.input`col-span-4 h-8 pl-2 rounded border-2 bg-gray-300 shadow-inner text-lg`;

const NumberValidationOptions = ({
  isLessEnabled,
  handleSwitchLess,
  isGreaterEnabled,
  handleSwitchGreater,
  isMinEnabled,
  handleSwitchMin,
  isMaxEnabled,
  handleSwitchMax,
  greater,
  less,
  min,
  max,
  integer,
  numberRequired,
  handleChangeGreater,
  handleChangeLess,
  handleChangeMin,
  handleChangeMax,
  handleNumberCheckBox,
}) => {
  return (
    <StyledMain>
      <StyledInputGroup1>
        <StyledInputGroupItemWrapper>
          <StyledInputGroupItem>
            <StyledCheckboxWrapper>
              <input
                type="checkbox"
                id="greater"
                name="greater"
                value={isGreaterEnabled}
                onChange={handleSwitchGreater}
                disabled={isMinEnabled || isMaxEnabled}
              />{" "}
              <label htmlFor="greater">greater</label>
            </StyledCheckboxWrapper>

            <StyledInput
              type="number"
              value={greater}
              onChange={handleChangeGreater}
              disabled={!isGreaterEnabled}
            />
          </StyledInputGroupItem>
          <StyledInputGroupItem>
            <StyledCheckboxWrapper>
              <input
                type="checkbox"
                id="less"
                name="less"
                value={isLessEnabled}
                onChange={handleSwitchLess}
                disabled={isMinEnabled || isMaxEnabled}
              />{" "}
              <label htmlFor="less">less</label>
            </StyledCheckboxWrapper>

            <StyledInput
              type="number"
              value={less}
              onChange={handleChangeLess}
              disabled={!isLessEnabled}
            />
          </StyledInputGroupItem>
        </StyledInputGroupItemWrapper>
        <StyledInputGroupItemWrapper>
          <StyledInputGroupItem>
            <StyledCheckboxWrapper>
              <input
                type="checkbox"
                id="min"
                name="min"
                value={isMinEnabled}
                onChange={handleSwitchMin}
                disabled={isGreaterEnabled || isLessEnabled}
              />{" "}
              <label htmlFor="min">min</label>
            </StyledCheckboxWrapper>

            <StyledInput
              type="number"
              value={min}
              onChange={handleChangeMin}
              disabled={!isMinEnabled}
            />
          </StyledInputGroupItem>
          <StyledInputGroupItem>
            <StyledCheckboxWrapper>
              <input
                type="checkbox"
                id="max"
                name="max"
                value={isMaxEnabled}
                disabled={isGreaterEnabled || isLessEnabled}
                onChange={handleSwitchMax}
              />{" "}
              <label htmlFor="max">max</label>
            </StyledCheckboxWrapper>

            <StyledInput
              type="number"
              value={max}
              onChange={handleChangeMax}
              disabled={!isMaxEnabled}
            />
          </StyledInputGroupItem>
        </StyledInputGroupItemWrapper>
      </StyledInputGroup1>

      <StyledInputGroup2>
        <StyledCheckboxWrapper>
          <input
            type="checkbox"
            id="integer"
            name="integer"
            value={integer}
            onChange={() => handleNumberCheckBox("integer")}
          />{" "}
          <label htmlFor="integer">integer</label>
        </StyledCheckboxWrapper>

        <StyledCheckboxWrapper>
          <input
            type="checkbox"
            id="required"
            name="required"
            value={numberRequired}
            onChange={() => handleNumberCheckBox("required")}
          />{" "}
          <label htmlFor="required">required</label>
        </StyledCheckboxWrapper>
      </StyledInputGroup2>
    </StyledMain>
  );
};

export default NumberValidationOptions;
