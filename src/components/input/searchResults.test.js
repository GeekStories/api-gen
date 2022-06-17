import { screen, render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../store/store";

import SearchResults from "./searchResults";

const results = [{ package: { name: "axios", version: "0.27.2" } }];
const handleAddNewDependency = jest.fn();

describe("Results should render when searched", () => {
  it("should render the search results component", () => {
    render(
      <Provider store={store}>
        <SearchResults
          handleAddNewDependency={handleAddNewDependency}
          results={results}
        />
      </Provider>
    );

    const formSectionTitle = screen.getByText("axios - 0.27.2");
    expect(formSectionTitle).toBeInTheDocument();
  });

  it("should call handleAddNewDependency when clicked", () => {
    render(
      <Provider store={store}>
        <SearchResults
          handleAddNewDependency={handleAddNewDependency}
          results={results}
        />
      </Provider>
    );

    const formSectionTitle = screen.getByText("axios - 0.27.2");
    formSectionTitle.click();

    expect(handleAddNewDependency).toHaveBeenCalled();
  });
});
