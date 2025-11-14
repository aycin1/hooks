import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("../../../components/Dropdown/Dropdown", () => ({
  default: ({ patternID }) => (
    <div data-testid="mockedDropdown">dropdown for {patternID}</div>
  ),
}));

describe("pattern", () => {
  it("", async () => {});
});
