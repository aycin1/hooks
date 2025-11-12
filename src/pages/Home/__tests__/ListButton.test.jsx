import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ListsProvider } from "../../../context/ListsProvider";
import ListButton from "../components/ListButton";

describe("list button", () => {
  it("renders with correct title", () => {
    render(
      <ListsProvider>
        <ListButton title="completed" handleClick={vi.fn()} />
      </ListsProvider>
    );

    expect(screen.getByRole("button", { name: /completed/i }))
      .toBeInTheDocument()
      .toHaveTextContent("completed");
  });

  it("calls handleClick with matching title on click", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <ListsProvider>
        <ListButton title="wishlist" handleClick={handleClick} />
      </ListsProvider>
    );

    await user.click(screen.getByRole("button", { name: /wishlist/i }));

    expect(handleClick).toHaveBeenCalledExactlyOnceWith("wishlist");
  });
});
