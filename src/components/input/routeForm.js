import tw from "tailwind-styled-components";
import { useState, useEffect } from "react";

import ParamsList from "./paramsList";
import RequestBodyBox from "./requestBodyBox";
import ResponseBodyBox from "./responseBodyBox";
import ParamsModal from "../modals/paramsModal";

const StyledMain = tw.div`col-span-8 border-black border-l-2 border-b-2 p-1`;
const StyledRouteBasicInfoWrapper = tw.div`grid grid-cols-12 gap-1`;
const StyledRouteNameInputWrapper = tw.div`col-span-11 border-2`;
const StyledDeleteButton = tw.button`col-span-1 border-2 py-1 px-3`;
const StyledRouteNamePrefix = tw.span`text-lg mx-1 text-right`;
const StyledRouteNameInput = tw.input`w-[90%] p-1 &:focus { outline-none }`;
const StyledRouteOptionWrapper = tw.div`flex flex-col overflow-y-scroll max-h-[26rem]`;

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

  const handleRemoveSelectedRoute = (routeId) => {
    UpdateForm({ UPDATE_TYPE: "remove_route", ROUTE_ID: routeId });

    setRouteName("");
    selectedRoute = {};
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
        <StyledRouteNameInputWrapper>
          <StyledRouteNamePrefix>{selectedMethod.type} /</StyledRouteNamePrefix>
          <StyledRouteNameInput
            type="text"
            value={routeName}
            onChange={(e) => handleRouteNameInput(e, selectedRoute.id)}
          />
        </StyledRouteNameInputWrapper>
        <StyledDeleteButton
          onClick={() => handleRemoveSelectedRoute(selectedRoute.id)}
        >
          Delete
        </StyledDeleteButton>
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

        <RequestBodyBox body={selectedMethod.body} />

        <ResponseBodyBox body={selectedMethod.response} />
      </StyledRouteOptionWrapper>
    </StyledMain>
  );
};

export default RouteForm;
