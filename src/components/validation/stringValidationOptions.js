import tw from "tailwind-styled-components";

const Main = tw.div`grid grid-rows-2 w-[65%] mx-auto`;
const InputGroup1 = tw.div`grid grid-cols-2 gap-4`;
const InputGroup2 = tw.div`flex gap-4 m-auto`;
const InputGroupItem = tw.div`grid grid-cols-2 my-1`;
const CheckboxWrapper = tw.div`col-span-2 flex gap-2 my-auto font-mono text-sm`;
const Input = tw.input`col-span-4 h-8 pl-2 rounded border-2 bg-gray-300 shadow-inner text-lg`;

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
    <Main>
      <InputGroup1>
        <InputGroupItem>
          <CheckboxWrapper>
            <label htmlFor="maxLength">Max. Length</label>
            <input
              type="checkbox"
              id="maxLength"
              name="maxLength"
              checked={isMaxLengthEnabled}
              onChange={handleSwitchMaxLength}
            />{" "}
          </CheckboxWrapper>

          <Input
            type="number"
            id="maxLength"
            value={maxLength}
            disabled={!isMaxLengthEnabled}
            onChange={handleChangeMaxLength}
          />
        </InputGroupItem>

        <InputGroupItem>
          <CheckboxWrapper>
            <label htmlFor="minLength">Min. Length</label>
            <input
              type="checkbox"
              id="minLength"
              name="minLength"
              checked={isMinLengthEnabled}
              onChange={handleSwitchMinLength}
            />{" "}
          </CheckboxWrapper>
          <Input
            type="number"
            id="minLength"
            value={minLength}
            disabled={!isMinLengthEnabled}
            onChange={handleChangeMinLength}
          />
        </InputGroupItem>
      </InputGroup1>

      <InputGroup2>
        <CheckboxWrapper>
          <input
            type="checkbox"
            id="alphanum"
            name="alphanum"
            checked={alphanum}
            onChange={() => handleStringCheckBox("alphanum")}
          />{" "}
          <label htmlFor="alphanum">alpha num.</label>
        </CheckboxWrapper>

        <CheckboxWrapper>
          <input
            type="checkbox"
            id="required"
            name="required"
            checked={stringRequired}
            onChange={() => handleStringCheckBox("required")}
          />{" "}
          <label htmlFor="required">required</label>
        </CheckboxWrapper>
      </InputGroup2>
    </Main>
  );
};

export default StringValidationOptions;
