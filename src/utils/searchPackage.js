const SearchPackage = async (search) => {
  try {
    const response = await fetch(
      `https://registry.npmjs.org/-/v1/search?text=${search}`
    );
    const data = await response.json();
    return data.objects;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default SearchPackage;
