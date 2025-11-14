import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ListsProvider } from "../../../context/ListsProvider";
import DisplayList from "../components/DisplayList";

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

describe("display list", () => {
  it("renders pattern cards for chosen list", async () => {
    render(
      <ListsProvider>
        <DisplayList chosenList="wip" />
      </ListsProvider>
    );

    await waitFor(() => {
      expect(screen.getAllByTestId("mockedPatternCard")).toHaveLength(2);
      expect(screen.getAllByTestId("mockedDropdown")).toHaveLength(2);
      expect(screen.getByTestId("mockedSearchLink")).toHaveTextContent(
        "add patterns here"
      );
    });
  });

  it("renders only SearchLink for empty list", async () => {
    render(
      <ListsProvider>
        <DisplayList chosenList="completed" />
      </ListsProvider>
    );

    await waitFor(() => {
      expect(screen.queryByTestId("mockedPatternCard")).not.toBeInTheDocument();
      expect(screen.getByTestId("mockedSearchLink")).toHaveTextContent(
        "add patterns here"
      );
    });
  });
});
