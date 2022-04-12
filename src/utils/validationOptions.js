const UpdateValidationOptions = {
  Add: (currentOptions, option, newValue) => {
    return [...currentOptions, { key: option, value: newValue }];
  },
  Edit: (currentOptions, option, newValue) => {
    let validationOptions = [...currentOptions];

    const index = validationOptions.findIndex((o) => o.key === option);

    validationOptions[index].value = newValue;
    return validationOptions;
  },
  Remove: (currentOptions, option) => {
    return currentOptions.filter((o) => o.key !== option);
  },
};

export default UpdateValidationOptions;
