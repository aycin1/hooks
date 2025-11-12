import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import PatternCard from "./PatternCard";

vi.mock("../Thumbnail/Thumbnail", () => ({
  default: ({ patternID }) => (
    <div data-testid="mockedThumbnail">{patternID}</div>
  ),
}));

describe("pattern card", () => {
  it("renders pattern name and thumbnail", async () => {
    render(
      <MemoryRouter>
        <PatternCard patternID="123" />
      </MemoryRouter>
    );

    expect(await screen.findByRole("paragraph")).toHaveTextContent("wooly hat");
    expect(screen.getByTestId("mockedThumbnail")).toHaveTextContent("123");
  });

  it("renders link with correct path param", async () => {
    render(
      <MemoryRouter>
        <PatternCard patternID="456" />
      </MemoryRouter>
    );

    expect(screen.getByRole("link")).toHaveAttribute("href", "/pattern/456");
  });
});
