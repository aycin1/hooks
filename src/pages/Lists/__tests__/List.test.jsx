import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ListsProvider } from "../../../context/ListsProvider";
import List from "../components/List";

vi.mock("../../../components/PatternCard/PatternCard", () => ({
  default: ({ patternID }) => (
    <div data-testid="mockedPatternCard">pattern card {patternID}</div>
  ),
}));

vi.mock("../../../components/Dropdown/Dropdown", () => ({
  default: ({ patternID }) => (
    <div data-testid="mockedDropdown">dropdown for {patternID}</div>
  ),
}));

describe("list", () => {
  it("renders appropriate message if list is empty", async () => {
    render(
      <ListsProvider>
        <List listTitle="completed" />
      </ListsProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("completed")).toBeInTheDocument();

      expect(screen.getByTestId("mockedSearchLink")).toHaveTextContent(
        "this list is empty, click here to search patterns"
      );
    });
  });

  it("renders pattern cards and dropdowns for populated list", async () => {
    render(
      <ListsProvider>
        <List listTitle="wip" />
      </ListsProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("wip")).toBeInTheDocument();

      expect(screen.getByText("pattern card abc")).toBeInTheDocument();
      expect(screen.getByText("dropdown for abc")).toBeInTheDocument();
      expect(screen.getByText("pattern card def")).toBeInTheDocument();
      expect(screen.getByText("dropdown for def")).toBeInTheDocument();

      expect(screen.getByTestId("mockedSearchLink")).toHaveTextContent(
        "add more patterns!"
      );
    });
  });
});
