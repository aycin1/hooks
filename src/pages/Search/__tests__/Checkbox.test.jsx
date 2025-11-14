import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Checkbox from "../components/Checkbox";

describe("checkbox", () => {
  it("calls handleChange when user checks item", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <Checkbox
        node={[{ label: "test", value: "v1" }]}
        value="value"
        handleChange={handleChange}
      />
    );

    await user.click(screen.getByTestId("mockedCheckboxTree"));

    expect(handleChange).toHaveBeenCalledExactlyOnceWith("value", [
      "node1",
      "node2",
    ]);
  });
});
