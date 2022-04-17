import { useState } from "react";
import tw from "tailwind-styled-components";

const StyledRouteMethodSelector = tw.select`col-span-1 text-sm border-2`;

const METHOD_TYPES = ["GET", "POST", "DELETE", "PUT", "PATCH"];

const MethodSelector = ({ UpdateForm, routeId, methodId, currentMethod }) => {
  const [routeMethod, setRouteMethod] = useState(currentMethod);

  const handleChangeMethod = (e, routeId, methodId) => {
    const result = UpdateForm({
      UPDATE_TYPE: "change_method_type",
      ROUTE_ID: routeId,
      METHOD_ID: methodId,
      NEW_TYPE: e.target.value,
    });

    if (result === "fail") return null;
    setRouteMethod(e.target.value);
  };

  return (
    <StyledRouteMethodSelector
      value={routeMethod}
      onChange={(e) => handleChangeMethod(e, routeId, methodId)}
    >
      {METHOD_TYPES.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </StyledRouteMethodSelector>
  );
};

export default MethodSelector;
