import tw from "tailwind-styled-components";
import { useState, useEffect } from "react";

import ParamsList from "./paramsList";
import RequestBodyBox from "./requestBodyBox";
import ParamsModal from "../modals/paramsModal";

const StyledMain = tw.div`xl:col-span-8 col-span-7 grid grid-cols-1 p-1 border-l-[1px] border-b-[1px] border-black`;
const StyledRouteBasicInfoWrapper = tw.div`grid grid-cols-12 bg-slate-200`;
const StyledRouteMethod = tw.span`xl:col-span-2 col-span-3 border-r-2 border-gray-100 text-center text-lg tracking-wider rounded-l-md hover:bg-slate-300 hover:cursor-pointer transition ease-in-out delay-75`;
const StyledRouteNameInput = tw.input`xl:col-span-9 col-span-8 pl-2 h-8 w-full bg-slate-200 text-lg text-gray-600 focus:outline-none transition ease-in-out delay-100`;
const StyledRouteOptionWrapper = tw.div`flex flex-col`;

const RouteForm = ({ selectedRoute, selectedMethod, UpdateForm }) => {
  const [routeName, setRouteName] = useState("");
  const [isParamsOpen, setParamsModal] = useState(false);
  const [isQueriesOpen, setQueriesModal] = useState(false);

  const handleRouteNameInput = (e, routeId) => {
    const newValue = e.target.value;

    const InvalidChars = newValue.match(/[^a-z]/g);
    if (InvalidChars) {
      console.log("invalid character in route name: ", InvalidChars);
      return;
    }

    UpdateForm({
      UPDATE_TYPE: "change_route_name",
      ROUTE_ID: routeId,
      NEW_NAME: newValue,
    });

    setRouteName(newValue);
  };

  const handleParamsModal = () => {
    if (isQueriesOpen) setQueriesModal(false);
    setParamsModal(!isParamsOpen);
  };

  const handleNewParam = (newParam) => {
    UpdateForm({
      UPDATE_TYPE: "new_param",
      ROUTE_ID: selectedRoute.id,
      METHOD_ID: selectedMethod.id,
      PARAM: newParam,
    });
  };

  const handleRemoveParam = (paramId, paramType) => {
    UpdateForm({
      UPDATE_TYPE: "remove_param",
      ROUTE_ID: selectedRoute.id,
      METHOD_ID: selectedMethod.id,
      PARAM_ID: paramId,
      TYPE: paramType,
    });
  };

  const handleQueriesModal = () => {
    if (isParamsOpen) setParamsModal(false);
    setQueriesModal(!isQueriesOpen);
  };

  const handleNewQuery = (newQuery) => {
    UpdateForm({
      UPDATE_TYPE: "new_query",
      ROUTE_ID: selectedRoute.id,
      METHOD_ID: selectedMethod.id,
      QUERY: newQuery,
    });
  };

  const handleChangeMethodBody = (newValue) => {
    UpdateForm({
      UPDATE_TYPE: "change_method_body",
      ROUTE_ID: selectedRoute.id,
      METHOD_ID: selectedMethod.id,
      VALUE: newValue,
    });
  };

  useEffect(() => {
    if (selectedRoute) {
      const { name } = selectedRoute;
      setRouteName(name ?? "");
    }
  }, [selectedRoute]);

  return (
    <StyledMain>
      <ParamsModal
        isOpen={isParamsOpen}
        handleModal={handleParamsModal}
        routeName={selectedRoute.name}
        handleNewParam={handleNewParam}
        handleNewQuery={handleNewQuery}
        modalType="param"
      />

      <ParamsModal
        isOpen={isQueriesOpen}
        handleModal={handleQueriesModal}
        routeName={selectedRoute.name}
        handleNewParam={handleNewParam}
        handleNewQuery={handleNewQuery}
        modalType="query"
      />

      <StyledRouteBasicInfoWrapper>
        <StyledRouteMethod>{selectedMethod.type}</StyledRouteMethod>
        <StyledRouteNameInput
          type="text"
          value={routeName}
          onChange={(e) => handleRouteNameInput(e, selectedRoute.id)}
        />
      </StyledRouteBasicInfoWrapper>

      <StyledRouteOptionWrapper>
        <ParamsList
          optionLabel="Parameters"
          listItems={selectedMethod.params}
          routeName={selectedRoute.name}
          handleOpenModal={handleParamsModal}
          paramType="param"
          handleRemoveParam={handleRemoveParam}
        />

        <ParamsList
          optionLabel="Queries"
          listItems={selectedMethod.queries}
          routeName={selectedRoute.name}
          handleOpenModal={handleQueriesModal}
          paramType="query"
          handleRemoveParam={handleRemoveParam}
        />

        <RequestBodyBox
          selectedMethodBody={selectedMethod.body}
          handleChangeMethodBody={handleChangeMethodBody}
        />
      </StyledRouteOptionWrapper>
    </StyledMain>
  );
};

export default RouteForm;
