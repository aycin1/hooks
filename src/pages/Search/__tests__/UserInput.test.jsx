import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import UserInput from "../components/UserInput";

describe("user input", () => {
  it("calls handleUserInput with input field on submit", async () => {
    const user = userEvent.setup();
    const mockHandleUserInput = vi.fn();

    render(<UserInput handleUserInput={mockHandleUserInput} />);

    await user.type(
      screen.getByPlaceholderText("Search for patterns!"),
      "wooly hat"
    );
    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(mockHandleUserInput).toHaveBeenCalledExactlyOnceWith(
        "wooly%20hat"
      );
    });
  });

  it("doesn't call handleUserInput with empty input field", async () => {
    const user = userEvent.setup();
    const mockHandleUserInput = vi.fn();

    render(<UserInput handleUserInput={mockHandleUserInput} />);

    await user.click(screen.getByRole("button"));
    expect(mockHandleUserInput).not.toHaveBeenCalled();
  });
});
