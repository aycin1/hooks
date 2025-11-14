import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import PatternCard from "./PatternCard";
vi.unmock("./PatternCard");

describe("pattern card", () => {
  it("renders pattern name and thumbnail", async () => {
    render(
      <MemoryRouter>
        <PatternCard patternID="1" />
      </MemoryRouter>
    );

    expect(await screen.findByRole("paragraph")).toHaveTextContent("wooly hat");
    expect(screen.getByTestId("mockedThumbnail")).toHaveTextContent("1");
  });

  it("renders link with correct path param", async () => {
    render(
      <MemoryRouter>
        <PatternCard patternID="456" />
      </MemoryRouter>
    );

    expect(await screen.findByRole("link")).toHaveAttribute(
      "href",
      "/pattern/456"
    );
  });
});
