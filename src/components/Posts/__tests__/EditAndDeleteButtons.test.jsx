import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import EditAndDeleteButtons from "../EditAndDeleteButtons";

vi.mock("../../../hooks/useAuth", () => ({
  default: () => ({ persist: true }),
}));

describe("edit and delete buttons", () => {
  it("toggles input field on click of edit and close buttons ", async () => {
    const user = userEvent.setup();
    render(
      <EditAndDeleteButtons
        postID={123}
        currentCaption={"love this"}
        handleChange={vi.fn()}
      />
    );

    expect(screen.queryByPlaceholderText("love this")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "edit caption" }));
    expect(screen.getByPlaceholderText("love this")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "close input field" }));
    expect(screen.queryByPlaceholderText("love this")).not.toBeInTheDocument();
  });

  it("calls handle change with server response on caption edit", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <EditAndDeleteButtons
        postID={123}
        currentCaption={"love this"}
        handleChange={handleChange}
      />
    );

    await user.click(screen.getByRole("button", { name: "edit caption" }));
    await user.type(
      screen.getByPlaceholderText("love this"),
      "my favourite so far!"
    );
    await user.keyboard("{enter}");

    expect(handleChange).toHaveBeenCalledExactlyOnceWith("caption edited");
  });

  it("calls handle change with server response on post deletion", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <EditAndDeleteButtons
        postID={123}
        currentCaption={"love this"}
        handleChange={handleChange}
      />
    );

    await user.click(screen.getByRole("button", { name: "delete post" }));

    expect(handleChange).toHaveBeenCalledExactlyOnceWith("post deleted");
  });
});
