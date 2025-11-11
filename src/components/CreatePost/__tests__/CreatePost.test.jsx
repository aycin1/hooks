import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CreatePost from "../CreatePost";

vi.mock("../CreatePostOverlay", () => ({
  default: vi.fn(({ openClick }) => (
    <dialog data-testid="mockedOverlay">{openClick && "open"}</dialog>
  )),
}));

describe("create post", () => {
  it("renders button that expands overlay on click", () => {
    render(<CreatePost />);

    expect(
      screen.getByRole("button", { name: /add a post!/i })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /add a post!/i }));

    expect(screen.getByTestId("mockedOverlay")).toHaveTextContent("open");
  });
});
