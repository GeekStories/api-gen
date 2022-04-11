import tw from "tailwind-styled-components";
import { useState } from "react";

import UpdateValidationOptions from "../../utils/updateValidationOptions";
import StringValidationOptions from "../validation/stringValidationOptions";
import NumberValidationOptions from "../validation/numberValidationOptions";

const StyledNewQueryModal = tw.div`
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

const StyledStringValidationOptions = tw(StringValidationOptions)``;
const StyledNumberValidationOptions = tw(NumberValidationOptions)``;

const defaultValidationOptions = [
  {
    type: "string",
    maxLength: null,
    minLength: null,
    alphanum: false,
    email: null,
    required: false,
  },
  {
    type: "number",
    greater: null,
    less: null,
    min: null,
    max: null,
    integer: false,
    required: false,
  },
];

const QueriesModal = ({ isOpen, handleQueriesModal, routeName }) => {
  const [queryName, setQueryName] = useState("example");
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

    setQueryName(newValue);
  };

  return (
    <StyledNewQueryModal $state={isOpen}>
      <StyledRoutePreview>
        {routeName === ""
          ? `..?${queryName}=<${selectedType}>`
          : `/${routeName}?${queryName}=<${selectedType}>`}
      </StyledRoutePreview>

      <StyledModalInputsWrapper>
        <StyledInput
          type="text"
          placeholder="example"
          value={queryName}
          onChange={handleUpdateName}
        />

        <StyledTypeSelect defaultValue={"string"} onChange={handleChangeType}>
          <option value="string">string</option>
          <option value="number">number</option>
        </StyledTypeSelect>
      </StyledModalInputsWrapper>

      <StyledValidationOptionsWrapper>
        {selectedType === "string" && (
          <StyledStringValidationOptions
            UpdateValidations={UpdateValidations}
          />
        )}

        {selectedType === "number" && (
          <StyledNumberValidationOptions
            UpdateValidations={UpdateValidations}
          />
        )}
      </StyledValidationOptionsWrapper>

      <StyledModalControlsWrapper>
        <StyledModalControl>Create</StyledModalControl>
        <StyledModalControl onClick={handleQueriesModal}>
          Cancel
        </StyledModalControl>
      </StyledModalControlsWrapper>
    </StyledNewQueryModal>
  );
};

export default QueriesModal;
