// Generates a random string of characters between a-z up to length amount
const generateString = (length) =>
  Math.random()
    .toString(36)
    .replace(/[^a-z]/g, "")
    .substring(0, length);

export default generateString;
