import tw from "tailwind-styled-components";
import { useState, useEffect } from "react";

import ValidationOptions from "../../utils/validationOptions";
import StringValidationOptions from "../validation/stringValidationOptions";
import NumberValidationOptions from "../validation/numberValidationOptions";

const NewParamModal = tw.div`
  ${(p) => (p.$state ? "grid" : "hidden")}
  border-2
  border-gray-300
  bg-gray-200
  rounded-lg
  shadow-inner
  fixed
  top-[5%]
  left-[50%]
  -translate-x-1/2
  translate-y-1/4
  z-10
  h-auto
  w-[60rem]
  p-2
`;

const Input = tw.input`h-8 pl-2 rounded border-2 bg-gray-300 shadow-inner text-lg font-mono`;
const TypeSelect = tw.select`h-8 pl-2 rounded border-2 border-gray-300 bg-gray-100 shadow-inner text-lg font-mono`;
const ModalInputsWrapper = tw.div`grid grid-cols-2 gap-1 text-center`;
const ModalControlsWrapper = tw.div`grid grid-cols-2 gap-1`;
const ModalControl = tw.button`rounded border-2 border-gray-300 text-lg`;
const RoutePreview = tw.p`flex mx-auto text-2xl p-1 font-mono`;

const Modal = ({
  isOpen,
  handleModal,
  routeName = "",
  createNew,
  modalType,
}) => {
  const [paramName, setParamName] = useState("example");
  const [newRouteName, setNewRouteName] = useState("");
  const [selectedType, setSelectedType] = useState("string");
  const [validationOptions, setValidationOptions] = useState([]);

  const [minLength, setMinLength] = useState(0);
  const [maxLength, setMaxLength] = useState(1);
  const [alphanum, setAlphanum] = useState(false);
  const [stringRequired, setStringRequired] = useState(false);

  const [isMinLengthEnabled, setIsMinLengthEnabled] = useState(false);
  const [isMaxLengthEnabled, setIsMaxLengthEnabled] = useState(false);

  const [greater, setGreater] = useState(0);
  const [less, setLess] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [integer, setInteger] = useState(false);
  const [numberRequired, setNumberRequired] = useState(false);

  const [isGreaterEnabled, setIsGreaterEnabled] = useState(false);
  const [isLessEnabled, setIsLessEnabled] = useState(false);
  const [isMinEnabled, setIsMinEnabled] = useState(false);
  const [isMaxEnabled, setIsMaxEnabled] = useState(false);

  const handleSwitchMinLength = () => {
    // Value doesn't update in the same function!
    setIsMinLengthEnabled(!isMinLengthEnabled);

    // false => true
    if (!isMinLengthEnabled)
      setValidationOptions(
        ValidationOptions.Add(validationOptions, "minLength", minLength)
      );

    // true => false
    if (isMinLengthEnabled) {
      setValidationOptions(
        ValidationOptions.Remove(validationOptions, "minLength")
      );
    }
  };
  const handleChangeMinLength = (e) => {
    const newValue = Number(e.target.value);

    if (newValue < 0) return;

    if (newValue >= maxLength - 1) {
      setMaxLength(newValue + 1);
      if (validationOptions.some((o) => o.key === "maxLength"))
        setValidationOptions(
          ValidationOptions.Edit(validationOptions, "maxLength", newValue + 1)
        );
    }

    setMinLength(newValue);

    if (validationOptions.some((o) => o.key === "minLength")) {
      setValidationOptions(
        ValidationOptions.Edit(validationOptions, "minLength", newValue)
      );
    } else {
      setValidationOptions(
        ValidationOptions.Add(validationOptions, "minLength", newValue)
      );
    }
  };

  const handleSwitchMaxLength = () => {
    // Value doesn't update in the same function!
    setIsMaxLengthEnabled(!isMaxLengthEnabled);

    // false => true
    if (!isMaxLengthEnabled)
      setValidationOptions(
        ValidationOptions.Add(validationOptions, "maxLength", maxLength)
      );

    // true => false
    if (isMaxLengthEnabled) {
      setValidationOptions(
        ValidationOptions.Remove(validationOptions, "maxLength")
      );
    }
  };
  const handleChangeMaxLength = (e) => {
    let newValue = Number(e.target.value);

    if (newValue < 1) return;

    if (newValue <= minLength + 1) {
      setMinLength(newValue - 1);
      if (validationOptions.some((o) => o.key === "minLength"))
        setValidationOptions(
          ValidationOptions.Edit(validationOptions, "minLength", newValue - 1)
        );
    }

    setMaxLength(newValue);

    if (validationOptions.some((o) => o.key === "maxLength")) {
      setValidationOptions(
        ValidationOptions.Edit(validationOptions, "maxLength", newValue)
      );
    } else {
      setValidationOptions(
        ValidationOptions.Add(validationOptions, "maxLength", newValue)
      );
    }
  };

  const handleStringCheckBox = (type) => {
    if (type === "alphanum") {
      setAlphanum(!alphanum);

      if (validationOptions.some((o) => o.key === "alphanum")) {
        setValidationOptions(
          ValidationOptions.Remove(validationOptions, "alphanum")
        );
      } else {
        setValidationOptions(
          ValidationOptions.Add(validationOptions, "alphanum", true)
        );
      }
    }

    if (type === "required") {
      setStringRequired(!stringRequired);

      if (validationOptions.some((o) => o.key === "required")) {
        setValidationOptions(
          ValidationOptions.Remove(validationOptions, "required")
        );
      } else {
        setValidationOptions(
          ValidationOptions.Add(validationOptions, "required", true)
        );
      }
    }
  };

  const handleSwitchGreater = () => {
    // Value doesn't update in the same function!
    setIsGreaterEnabled(!isGreaterEnabled);

    // false => true
    if (!isGreaterEnabled)
      setValidationOptions(
        ValidationOptions.Add(validationOptions, "greater", greater)
      );

    // true => false
    if (isGreaterEnabled) {
      setValidationOptions(
        ValidationOptions.Remove(validationOptions, "greater")
      );
    }
  };
  const handleChangeGreater = (e) => {
    const newValue = Number(e.target.value);

    if (newValue >= less - 2) {
      setLess(newValue + 2);
      if (validationOptions.some((o) => o.key === "less"))
        setValidationOptions(
          ValidationOptions.Edit(validationOptions, "less", newValue + 2)
        );
    }

    setGreater(newValue);

    if (validationOptions.some((o) => o.key === "greater")) {
      setValidationOptions(
        ValidationOptions.Edit(validationOptions, "greater", newValue)
      );
    } else {
      setValidationOptions(
        ValidationOptions.Add(validationOptions, "greater", newValue)
      );
    }
  };

  const handleSwitchLess = () => {
    // Value doesn't update in the same function!
    setIsLessEnabled(!isLessEnabled);

    // false => true
    if (!isLessEnabled)
      setValidationOptions(
        ValidationOptions.Add(validationOptions, "less", less)
      );

    // true => false
    if (isLessEnabled) {
      setValidationOptions(ValidationOptions.Remove(validationOptions, "less"));
    }
  };
  const handleChangeLess = (e) => {
    const newValue = Number(e.target.value);
    if (newValue <= greater + 2) {
      setGreater(newValue - 2);
      if (validationOptions.some((o) => o.key === "greater"))
        setValidationOptions(
          ValidationOptions.Edit(validationOptions, "greater", newValue - 2)
        );
    }

    setLess(newValue);

    if (validationOptions.some((o) => o.key === "less")) {
      setValidationOptions(
        ValidationOptions.Edit(validationOptions, "less", newValue)
      );
    } else {
      setValidationOptions(
        ValidationOptions.Add(validationOptions, "less", newValue)
      );
    }
  };

  const handleSwitchMin = () => {
    // Value doesn't update in the same function!
    setIsMinEnabled(!isMinEnabled);

    // false => true
    if (!isMinEnabled)
      setValidationOptions(
        ValidationOptions.Add(validationOptions, "min", min)
      );

    // true => false
    if (isMinEnabled) {
      setValidationOptions(ValidationOptions.Remove(validationOptions, "min"));
    }
  };
  const handleChangeMin = (e) => {
    const newValue = Number(e.target.value);

    if (newValue >= max - 1) {
      setMax(newValue + 1);
      if (validationOptions.some((o) => o.key === "max"))
        setValidationOptions(
          ValidationOptions.Edit(validationOptions, "max", newValue + 1)
        );
    }

    setMin(newValue);

    if (validationOptions.some((o) => o.key === "min")) {
      setValidationOptions(
        ValidationOptions.Edit(validationOptions, "min", newValue)
      );
    } else {
      setValidationOptions(
        ValidationOptions.Add(validationOptions, "min", newValue)
      );
    }
  };

  const handleSwitchMax = () => {
    // Value doesn't update in the same function!
    setIsMaxEnabled(!isMaxEnabled);

    // false => true
    if (!isMaxEnabled)
      setValidationOptions(
        ValidationOptions.Add(validationOptions, "max", max)
      );

    // true => false
    if (isMaxEnabled) {
      setValidationOptions(ValidationOptions.Remove(validationOptions, "max"));
    }
  };
  const handleChangeMax = (e) => {
    const newValue = Number(e.target.value);
    if (newValue <= min + 1) {
      setMin(newValue - 1);
      if (validationOptions.some((o) => o.key === "min"))
        setValidationOptions(
          ValidationOptions.Add(validationOptions, "min", newValue - 1)
        );
    }

    setMax(newValue);

    if (validationOptions.some((o) => o.key === "max")) {
      setValidationOptions(
        ValidationOptions.Edit(validationOptions, "max", newValue)
      );
    } else {
      setValidationOptions(
        ValidationOptions.Add(validationOptions, "max", newValue)
      );
    }
  };

  const handleNumberCheckBox = (type) => {
    if (type === "integer") {
      setInteger(!integer);

      if (!integer) {
        setGreater(parseInt(greater));
        setLess(parseInt(less));
        setMin(parseInt(min));
        setMax(parseInt(max));
      }

      if (validationOptions.some((o) => o.key === "integer")) {
        setValidationOptions(
          ValidationOptions.Remove(validationOptions, "integer")
        );
      } else {
        setValidationOptions(
          ValidationOptions.Add(validationOptions, "integer", true)
        );
      }
    }

    if (type === "required") {
      setNumberRequired(!numberRequired);

      if (validationOptions.some((o) => o.key === "required")) {
        setValidationOptions(
          ValidationOptions.Remove(validationOptions, "Required")
        );
      } else {
        setValidationOptions(
          ValidationOptions.Add(validationOptions, "required", true)
        );
      }
    }
  };

  const handleChangeType = (e) => {
    setValidationOptions([]);
    setSelectedType(e.target.value);
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

  const handleCloseModal = () => {
    ClearValidationOptions();
    handleModal();
  };

  const handleCreateParam = () => {
    createNew({
      options: validationOptions,
      type: selectedType,
      name: paramName,
    });

    handleCloseModal();
  };

  const ClearValidationOptions = () => {
    // Restore all values to default
    setIsGreaterEnabled(false);
    setIsLessEnabled(false);
    setIsMaxEnabled(false);
    setIsMinEnabled(false);
    setIsMaxLengthEnabled(false);
    setIsMinLengthEnabled(false);

    setMax(0);
    setMin(0);
    setGreater(0);
    setLess(0);
    setMinLength(0);
    setMaxLength(0);

    setStringRequired(false);
    setNumberRequired(false);
    setInteger(false);
    setAlphanum(false);

    setValidationOptions([]);
    setSelectedType("string");
  };

  useEffect(() => {
    let tempName = routeName;
    let nameLength = routeName.length;

    if (modalType === "query") {
      if (!nameLength) tempName = `..?${paramName}=<${selectedType}>`;
      else tempName = `/${routeName}?${paramName}=<${selectedType}>`;
    } else {
      if (!nameLength) tempName = `../:${paramName}`;
      else tempName = `/${routeName}/:${paramName}`;
    }

    setNewRouteName(tempName);
  }, [modalType, paramName, routeName, selectedType]);

  return (
    <NewParamModal $state={isOpen}>
      <RoutePreview>{newRouteName}</RoutePreview>

      <ModalInputsWrapper>
        <Input
          type="text"
          placeholder="example"
          value={paramName}
          onChange={handleUpdateName}
        />

        <TypeSelect
          value={selectedType}
          onChange={handleChangeType}
        >
          <option value="string">string</option>
          <option value="number">number</option>
        </TypeSelect>
      </ModalInputsWrapper>

      {selectedType === "string" && (
        <StringValidationOptions
          isMaxLengthEnabled={isMaxLengthEnabled}
          maxLength={maxLength}
          handleSwitchMaxLength={handleSwitchMaxLength}
          isMinLengthEnabled={isMinLengthEnabled}
          minLength={minLength}
          handleSwitchMinLength={handleSwitchMinLength}
          alphanum={alphanum}
          stringRequired={stringRequired}
          handleChangeMaxLength={handleChangeMaxLength}
          handleChangeMinLength={handleChangeMinLength}
          handleStringCheckBox={handleStringCheckBox}
        />
      )}

      {selectedType === "number" && (
        <NumberValidationOptions
          isLessEnabled={isLessEnabled}
          handleSwitchLess={handleSwitchLess}
          isGreaterEnabled={isGreaterEnabled}
          handleSwitchGreater={handleSwitchGreater}
          isMinEnabled={isMinEnabled}
          handleSwitchMin={handleSwitchMin}
          isMaxEnabled={isMaxEnabled}
          handleSwitchMax={handleSwitchMax}
          greater={greater}
          less={less}
          min={min}
          max={max}
          integer={integer}
          numberRequired={numberRequired}
          handleChangeGreater={handleChangeGreater}
          handleChangeLess={handleChangeLess}
          handleChangeMin={handleChangeMin}
          handleChangeMax={handleChangeMax}
          handleNumberCheckBox={handleNumberCheckBox}
        />
      )}

      <ModalControlsWrapper>
        <ModalControl onClick={handleCreateParam}>Create</ModalControl>
        <ModalControl onClick={handleCloseModal}>Cancel</ModalControl>
      </ModalControlsWrapper>
    </NewParamModal>
  );
};

export default Modal;
