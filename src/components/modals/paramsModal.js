import tw from "tailwind-styled-components";
import { useState } from "react";

import UpdateValidationOptions from "../../utils/updateValidationOptions";
import StringValidationOptions from "../validation/stringValidationOptions";
import NumberValidationOptions from "../validation/numberValidationOptions";

const StyledNewParamModal = tw.div`
  ${(p) => (p.$state ? "grid" : "hidden")}
  border-2
  rounded-lg
  shadow-lg
  border-gray-300
  bg-gray-200
  fixed
  top-20
  left-[50rem]
  z-10
  h-auto
  w-[60rem]
  p-2
`;

const StyledInput = tw.input`h-8 pl-2 rounded border-2 bg-gray-300 shadow-inner text-lg font-mono`;

const StyledTypeSelect = tw.select`h-8 pl-2 rounded border-2 border-gray-300 bg-gray-100 shadow-inner text-lg font-mono`;

const StyledModalInputsWrapper = tw.div`grid grid-cols-2 gap-1 text-center`;

const StyledModalControlsWrapper = tw.div`grid grid-cols-2 gap-1`;

const StyledModalControl = tw.button`rounded border-2 border-gray-300 text-lg`;

const StyledValidationOptionsWrapper = tw.div`w-full`;

const StyledRoutePreview = tw.p`flex mx-auto text-2xl p-1 font-mono`;

const defaultValidationOptions = [
  {
    type: "string",
    maxLength: 0,
    minLength: 0,
    alphanum: false,
    required: false,
  },
  {
    type: "number",
    greater: 0,
    less: 0,
    min: 0,
    max: 0,
    integer: false,
    required: false,
  },
];

const ParamsModal = ({
  isOpen,
  handleParamsModal,
  routeName,
  handleNewParam,
}) => {
  const [paramName, setParamName] = useState("example");
  const [selectedType, setSelectedType] = useState("string");
  const [validationOptions, setValidationOptions] = useState(
    defaultValidationOptions
  );

  const handleChangeType = (e) => {
    setSelectedType(e.target.value);
  };

  const UpdateValidations = (option, newValue) => {
    const updatedOptions = UpdateValidationOptions(
      validationOptions,
      selectedType,
      option,
      newValue
    );
    setValidationOptions(updatedOptions);
  };

  const handleUpdateName = (e) => {
    const newValue = e.target.value;

    const invalidCharacters = newValue.match(/[^a-z]/g);
    if (invalidCharacters !== null) {
      console.log("invalid character in param name: ", invalidCharacters);
      return;
    }

    setParamName(newValue);
  };

  const handleCreateParam = () => {
    handleNewParam({
      options: validationOptions,
      name: paramName,
    });
  };

  return (
    <StyledNewParamModal $state={isOpen}>
      <StyledRoutePreview>
        {routeName === "" ? `../:${paramName}` : `/${routeName}/:${paramName}`}
      </StyledRoutePreview>

      <StyledModalInputsWrapper>
        <StyledInput
          type="text"
          placeholder="example"
          value={paramName}
          onChange={handleUpdateName}
        />

        <StyledTypeSelect defaultValue={"string"} onChange={handleChangeType}>
          <option value="string">string</option>
          <option value="number">number</option>
        </StyledTypeSelect>
      </StyledModalInputsWrapper>

      <StyledValidationOptionsWrapper>
        {selectedType === "string" && (
          <StringValidationOptions UpdateValidations={UpdateValidations} />
        )}

        {selectedType === "number" && (
          <NumberValidationOptions UpdateValidations={UpdateValidations} />
        )}
      </StyledValidationOptionsWrapper>

      <StyledModalControlsWrapper>
        <StyledModalControl onClick={handleCreateParam}>
          Create
        </StyledModalControl>
        <StyledModalControl onClick={handleParamsModal}>
          Cancel
        </StyledModalControl>
      </StyledModalControlsWrapper>
    </StyledNewParamModal>
  );
};

export default ParamsModal;
