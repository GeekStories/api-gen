const CheckValidJSON = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return false;
  }
};

export default CheckValidJSON;
