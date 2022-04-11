import tw from "tailwind-styled-components";
import { useState } from "react";

const StyledMain = tw.div`grid grid-rows-2 w-[65%] mx-auto`;

const StyledInputGroup1 = tw.div`grid grid-cols-2 gap-4`;
const StyledInputGroup2 = tw.div`flex gap-4 m-auto`;

const StyledInputGroupItem = tw.div`grid grid-cols-6 my-1`;

const StyledCheckboxWrapper = tw.div`col-span-2 my-auto font-mono text-sm`;
const StyledInput = tw.input`col-span-4 h-8 pl-2 rounded border-2 bg-gray-300 shadow-inner text-lg`;

const StringValidationOptions = ({ UpdateValidations }) => {
  const [enabledMinLength, setEnabledMinLength] = useState(false);
  const [enabledMaxLength, setEnabledMaxLength] = useState(false);
  const [alphanum, setAlphanum] = useState(false);
  const [required, setRequired] = useState(false);

  const handleCheckBox = (type) => {
    if (type === "alphanum") {
      setAlphanum(!alphanum);
      UpdateValidations("alphanum", !alphanum);
    }

    if (type === "required") {
      setRequired(!required);
      UpdateValidations("required", !required);
    }
  };

  return (
    <StyledMain>
      <StyledInputGroup1>
        <StyledInputGroupItem>
          <StyledCheckboxWrapper>
            <input
              type="checkbox"
              id="maxLength"
              name="maxLength"
              onChange={() => setEnabledMaxLength(!enabledMaxLength)}
            />{" "}
            <label htmlFor="maxLength">maxLength</label>
          </StyledCheckboxWrapper>

          <StyledInput
            type="number"
            onChange={(e) => UpdateValidations("maxLength", e.target.value)}
            disabled={!enabledMaxLength}
          />
        </StyledInputGroupItem>

        <StyledInputGroupItem>
          <StyledCheckboxWrapper>
            <input
              type="checkbox"
              id="minLength"
              name="minLength"
              onChange={() => setEnabledMinLength(!enabledMinLength)}
            />{" "}
            <label htmlFor="minLength">minLength</label>
          </StyledCheckboxWrapper>

          <StyledInput
            type="number"
            onChange={(e) => UpdateValidations("minLength", e.target.value)}
            disabled={!enabledMinLength}
          />
        </StyledInputGroupItem>
      </StyledInputGroup1>

      <StyledInputGroup2>
        <StyledCheckboxWrapper>
          <input
            type="checkbox"
            id="alphanum"
            name="alphanum"
            onChange={() => handleCheckBox("alphanum")}
          />{" "}
          <label htmlFor="alphanum">alpha num.</label>
        </StyledCheckboxWrapper>

        <StyledCheckboxWrapper>
          <input
            type="checkbox"
            id="required"
            name="required"
            onChange={() => handleCheckBox("required")}
          />{" "}
          <label htmlFor="required">required</label>
        </StyledCheckboxWrapper>
      </StyledInputGroup2>
    </StyledMain>
  );
};

export default StringValidationOptions;
