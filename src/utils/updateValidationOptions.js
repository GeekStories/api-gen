const UpdateValidationOptions = (
  currentOptions,
  selectedType,
  option,
  newValue
) => {
  let validationOptions = [...currentOptions];
  if (selectedType === "string") {
    switch (option) {
      case "maxLength":
        if (validationOptions[0].minLength < parseInt(newValue)) {
          validationOptions[0].maxLength = parseInt(newValue);
        }
        break;
      case "minLength":
        if (validationOptions[0].maxLength > parseInt(newValue)) {
          validationOptions[0].minLength = parseInt(newValue);
        }
        break;
      case "alphanum":
        validationOptions[0].alphanum = newValue;
        break;
      case "required":
        validationOptions[0].required = newValue;
        break;
      default:
        return;
    }
  } else if (selectedType === "number") {
    switch (option) {
      case "greater":
        if (validationOptions.less > newValue) {
          validationOptions =
            newValue === null
              ? { ...validationOptions, greater: null }
              : { ...validationOptions, greater: newValue };
        }
        break;
      case "less":
        if (validationOptions.greater < newValue) {
          validationOptions =
            newValue === null
              ? { ...validationOptions, less: null }
              : { ...validationOptions, less: newValue };
        }
        break;
      case "min":
        if (
          validationOptions.max < newValue &&
          validationOptions.greater === null &&
          validationOptions.less === null
        ) {
          validationOptions =
            newValue === null
              ? { ...validationOptions, min: null }
              : { ...validationOptions, min: newValue };
        }
        break;
      case "max":
        if (
          validationOptions.min > newValue &&
          validationOptions.greater === null &&
          validationOptions.less === null
        ) {
          validationOptions =
            newValue === null
              ? { ...validationOptions, max: null }
              : { ...validationOptions, max: newValue };
        }
        break;
      case "integer":
        validationOptions = {
          ...validationOptions,
          integer: !validationOptions.integer,
        };
        break;
      case "required":
        validationOptions = {
          ...validationOptions,
          required: !validationOptions.required,
        };
        break;
      default:
        return;
    }
  }

  return validationOptions;
};

export default UpdateValidationOptions;
