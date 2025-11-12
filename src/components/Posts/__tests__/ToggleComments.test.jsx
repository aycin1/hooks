import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ToggleComments from "../ToggleComments";

vi.mock("../Comments", () => ({
  default: ({ postID }) => <div data-testid="mockedComments">{postID}</div>,
}));

describe("toggle comments", () => {
  it("renders toggle button without comments initially", () => {
    render(<ToggleComments postID={123456} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.queryByTestId("mockedComments")).not.toBeInTheDocument();
  });

  it("renders comments on click of button", async () => {
    const user = userEvent.setup();
    render(<ToggleComments postID={123456} />);

    await user.click(screen.getByRole("button"));
    expect(screen.getByTestId("mockedComments")).toBeInTheDocument();
  });

  it("hides comments on second click of button", async () => {
    const user = userEvent.setup();
    render(<ToggleComments postID={123456} />);

    await user.click(screen.getByRole("button"));
    await user.click(screen.getByRole("button"));

    expect(screen.queryByTestId("mockedComments")).not.toBeInTheDocument();
  });
});
