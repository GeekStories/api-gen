import tw from "tailwind-styled-components";

const Main = tw.div`grid grid-rows-2 w-[65%] mx-auto`;
const InputGroup1 = tw.div`grid grid-cols-2 gap-4`;
const InputGroup2 = tw.div`flex gap-4 m-auto`;
const InputGroupItemWrapper = tw.div`flex flex-col`;
const InputGroupItem = tw.div`grid grid-cols-6 my-1`;
const CheckboxWrapper = tw.div`col-span-2 my-auto font-mono text-sm`;
const Input = tw.input`col-span-4 h-8 pl-2 rounded border-2 bg-gray-300 shadow-inner text-lg`;

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
    <Main>
      <InputGroup1>
        <InputGroupItemWrapper>
          <InputGroupItem>
            <CheckboxWrapper>
              <input
                type="checkbox"
                id="greater"
                name="greater"
                value={isGreaterEnabled}
                onChange={handleSwitchGreater}
                disabled={isMinEnabled || isMaxEnabled}
              />{" "}
              <label htmlFor="greater">greater</label>
            </CheckboxWrapper>

            <Input
              type="number"
              value={greater}
              onChange={handleChangeGreater}
              disabled={!isGreaterEnabled}
            />
          </InputGroupItem>
          <InputGroupItem>
            <CheckboxWrapper>
              <input
                type="checkbox"
                id="less"
                name="less"
                value={isLessEnabled}
                onChange={handleSwitchLess}
                disabled={isMinEnabled || isMaxEnabled}
              />{" "}
              <label htmlFor="less">less</label>
            </CheckboxWrapper>

            <Input
              type="number"
              value={less}
              onChange={handleChangeLess}
              disabled={!isLessEnabled}
            />
          </InputGroupItem>
        </InputGroupItemWrapper>
        <InputGroupItemWrapper>
          <InputGroupItem>
            <CheckboxWrapper>
              <input
                type="checkbox"
                id="min"
                name="min"
                value={isMinEnabled}
                onChange={handleSwitchMin}
                disabled={isGreaterEnabled || isLessEnabled}
              />{" "}
              <label htmlFor="min">min</label>
            </CheckboxWrapper>

            <Input
              type="number"
              value={min}
              onChange={handleChangeMin}
              disabled={!isMinEnabled}
            />
          </InputGroupItem>
          <InputGroupItem>
            <CheckboxWrapper>
              <input
                type="checkbox"
                id="max"
                name="max"
                value={isMaxEnabled}
                disabled={isGreaterEnabled || isLessEnabled}
                onChange={handleSwitchMax}
              />{" "}
              <label htmlFor="max">max</label>
            </CheckboxWrapper>

            <Input
              type="number"
              value={max}
              onChange={handleChangeMax}
              disabled={!isMaxEnabled}
            />
          </InputGroupItem>
        </InputGroupItemWrapper>
      </InputGroup1>

      <InputGroup2>
        <CheckboxWrapper>
          <input
            type="checkbox"
            id="integer"
            name="integer"
            value={integer}
            onChange={() => handleNumberCheckBox("integer")}
          />{" "}
          <label htmlFor="integer">integer</label>
        </CheckboxWrapper>

        <CheckboxWrapper>
          <input
            type="checkbox"
            id="required"
            name="required"
            value={numberRequired}
            onChange={() => handleNumberCheckBox("required")}
          />{" "}
          <label htmlFor="required">required</label>
        </CheckboxWrapper>
      </InputGroup2>
    </Main>
  );
};

export default NumberValidationOptions;
