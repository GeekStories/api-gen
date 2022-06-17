import React from "react";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Provider } from "react-redux";
import store from "../../store/store";

import Dependencies from "./dependencies";
import SearchPackage from "../../utils/searchPackage";
import { act } from "react-dom/test-utils";

jest.mock("../../utils/searchPackage");

const dependencies = [
  { name: "express", version: "4.17.3", id: "dep_0" },
  { name: "cors", version: "2.8.5", id: "dep_1" },
  { name: "nodemon", version: "2.0.15", id: "dep_2" },
  { name: "celebrate", version: "15.0.1", id: "dep_3" },
];

describe("Dependencies Search", () => {
  it("should render the dependencies component", () => {
    render(
      <Provider store={store}>
        <Dependencies dependencies={dependencies} />
      </Provider>
    );

    const formSectionTitle = screen.getByText("Dependencies");
    expect(formSectionTitle).toBeInTheDocument();
  });

  it("should render an input field", () => {
    render(
      <Provider store={store}>
        <Dependencies dependencies={dependencies} />
      </Provider>
    );

    const inputField = screen.getByPlaceholderText("axios");
    expect(inputField).toBeInTheDocument();
  });

  it("should display search results container", async () => {
    const user = userEvent.setup();

    await SearchPackage.mockResolvedValue([
      {
        package: {
          name: "axios",
          version: "0.27.2",
        },
      },
    ]);

    render(
      <Provider store={store}>
        <Dependencies dependencies={dependencies} />
      </Provider>
    );

    const inputField = screen.getByPlaceholderText("axios");

    await act(async () => {
      user.dblClick(inputField);
      await user.type(inputField, "axios");
    });

    await waitFor(() => {
      expect(screen.getByTestId("searchResultBox")).toBeInTheDocument();
    });
  });
});

describe("Dependencies List", () => {
  it("should render the default list of dependencies", async () => {
    render(
      <Provider store={store}>
        <Dependencies dependencies={dependencies} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getAllByTestId("dependenciesListItem").length).toBe(4);
    });
  });
});
