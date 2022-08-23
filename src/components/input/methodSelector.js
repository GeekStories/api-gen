import tw from "tailwind-styled-components";

import { updateMethodType } from "../../store/api/routes";
import { useDispatch } from "react-redux";

const RouteMethodSelector = tw.select`col-span-1 border-2 w-full`;

const METHOD_TYPES = ["get", "post", "delete", "put", "patch"];

const MethodSelector = ({ routeId, methodId, currentMethod }) => {
  const dispatch = useDispatch();

  const handleChangeMethod = (e, routeId, methodId) => {
    dispatch(updateMethodType({ routeId, methodId, newValue: e.target.value }));
  };

  return (
    <RouteMethodSelector
      value={currentMethod}
      onChange={(e) => handleChangeMethod(e, routeId, methodId)}
    >
      {METHOD_TYPES.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </RouteMethodSelector>
  );
};

export default MethodSelector;
