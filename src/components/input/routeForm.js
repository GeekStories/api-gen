import tw from "tailwind-styled-components";
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  createParam,
  removeParam,
  createQuery,
  removeQuery,
  updateRouteName,
  removeMethod,
  updateMethodBody,
} from "../../store/api/routes";

import RoutesList from "./routesList";
import ParamsList from "./paramsList";
import RequestBodyBox from "./requestBodyBox";
import Modal from "../modals/modal";

const StyledMain = tw.div`xl:col-span-8 col-span-7 grid grid-cols-1 p-1 border-l-[1px] border-b-[1px] border-black`;
const StyledRouteBasicInfoWrapper = tw.div`grid grid-cols-12 bg-slate-200`;
const StyledRouteMethod = tw.span`xl:col-span-2 col-span-3 border-r-2 border-gray-100 text-center text-lg tracking-wider rounded-l-md hover:bg-slate-300 hover:cursor-pointer transition ease-in-out delay-75`;
const StyledRouteNameInput = tw.input`xl:col-span-10 col-span-9 pl-2 h-8 w-full bg-slate-200 text-lg text-gray-600 focus:outline-none transition ease-in-out delay-100`;
const StyledRouteOptionWrapper = tw.div`flex flex-col`;

const RouteForm = ({
  handleSelectRoute,
  handleSelectMethod,
  selectedRoute,
  selectedMethod,
}) => {
  const routes = useSelector((state) => state.routes);
  const dispatch = useDispatch();

  const [routeName, setRouteName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("param");

  const handleModal = (type) => {
    setModalType((old) => (old = type));
    setIsModalOpen(!isModalOpen);
  };

  const handleRouteNameInput = (e, routeId) => {
    const newValue = e.target.value;

    if (routeId && newValue !== "") {
      dispatch(updateRouteName({ routeId, newValue }));
    }

    setRouteName(newValue);
  };

  const handleNewParam = (newParam) => {
    dispatch(
      createParam({
        routeId: selectedRoute.id,
        methodId: selectedMethod.id,
        newParam,
      })
    );
  };

  const handleRemoveParam = (paramId, paramType) => {
    switch (paramType) {
      case "param":
        dispatch(
          removeParam({
            routeId: selectedRoute.id,
            methodId: selectedMethod.id,
            paramId,
          })
        );
        break;
      case "query":
        dispatch(
          removeQuery({
            routeId: selectedRoute.id,
            methodId: selectedMethod.id,
            paramId,
          })
        );
        break;
      default:
        break;
    }
  };

  const handleNewQuery = (newQuery) => {
    dispatch(
      createQuery({
        routeId: selectedRoute.id,
        methodId: selectedMethod.id,
        newQuery,
      })
    );
  };

  const handleChangeMethodBody = (newValue) => {
    dispatch(
      updateMethodBody({
        routeId: selectedRoute.id,
        methodId: selectedMethod.id,
        newValue,
      })
    );
  };

  const handleRemoveRoute = (routeId, methodId) => {
    dispatch(removeMethod({ routeId, methodId }));

    console.log(routes.length)

    if (routes.length === 0) setRouteName("");
    else handleSelectRoute(routes[0].id);
  };

  useEffect(() => {
    if (selectedRoute.methods) {
      if (selectedRoute.methods.length === 0) setRouteName("");
      const { name } = selectedRoute;
      setRouteName(name ?? "");
    } else setRouteName("");
  }, [selectedRoute]);

  return (
    <>
      <RoutesList
        handleSelectRoute={handleSelectRoute}
        handleSelectMethod={handleSelectMethod}
        selectedRoutename={selectedRoute.name ?? ""}
        handleRemoveRoute={handleRemoveRoute}
      />

      <StyledMain>
        <Modal
          isOpen={isModalOpen}
          handleModal={handleModal}
          routeName={
            routes.find((route) => route.id === selectedRoute.id)?.name ?? ""
          }
          createNew={modalType === "param" ? handleNewParam : handleNewQuery}
          modalType={modalType}
        />

        <StyledRouteBasicInfoWrapper>
          <StyledRouteMethod>
            {routes
              .find((route) => route.id === selectedRoute.id)
              ?.methods.find((method) => method.id === selectedMethod.id)
              ?.type ?? ""}
          </StyledRouteMethod>
          <StyledRouteNameInput
            type="text"
            id="routeNameInput"
            value={routeName}
            onChange={(e) => handleRouteNameInput(e, selectedRoute.id ?? null)}
          />
        </StyledRouteBasicInfoWrapper>

        <StyledRouteOptionWrapper>
          <ParamsList
            optionLabel="Parameters"
            listItems={
              routes
                .find((route) => route.id === selectedRoute.id)
                ?.methods.find((method) => method.id === selectedMethod.id)
                ?.params ?? []
            }
            routeName={
              routes.find((route) => route.id === selectedRoute.id)?.name ?? ""
            }
            handleModal={handleModal}
            paramType="param"
            handleRemoveParam={handleRemoveParam}
          />

          <ParamsList
            optionLabel="Queries"
            listItems={
              routes
                .find((route) => route.id === selectedRoute.id)
                ?.methods.find((method) => method.id === selectedMethod.id)
                ?.queries ?? []
            }
            routeName={
              routes.find((route) => route.id === selectedRoute.id)?.name ?? ""
            }
            handleModal={handleModal}
            paramType="query"
            handleRemoveParam={handleRemoveParam}
          />

          <RequestBodyBox
            selectedMethodBody={
              routes
                .find((route) => route.id === selectedRoute.id)
                ?.methods.find((method) => method.id === selectedMethod.id)
                ?.body ?? ""
            }
            handleChangeMethodBody={handleChangeMethodBody}
          />
        </StyledRouteOptionWrapper>
      </StyledMain>
    </>
  );
};

export default RouteForm;
