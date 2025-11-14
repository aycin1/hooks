import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SearchResults from "../components/SearchResults";

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

describe("search results", () => {
  it("renders text if no patterns are returned", () => {
    render(<SearchResults list={[]} />);

    expect(
      screen.getByText("No patterns found, please try again")
    ).toBeInTheDocument();
  });

  it("renders a PatternCard and Dropdown for each item in list", () => {
    render(
      <SearchResults
        list={[
          { id: 1, name: "pattern 1" },
          { id: 2, name: "pattern 2" },
          { id: 3, name: "pattern 3" },
        ]}
      />
    );

    expect(screen.getAllByTestId("mockedPatternCard")).toHaveLength(3);
    expect(screen.getAllByTestId("mockedDropdown")).toHaveLength(3);
  });
});
