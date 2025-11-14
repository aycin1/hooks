import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import UserSearch from "./UserSearch";

describe("user search", () => {
  it("updates input field when user types", async () => {
    const user = userEvent.setup();
    render(<UserSearch />);

    await user.type(screen.getByTestId("userSearchInput"), "user");

    expect(screen.getByTestId("userSearchInput").value).toStrictEqual("user");
  });

  it("renders error message for no user found", async () => {
    const user = userEvent.setup();
    render(<UserSearch />);

    await user.type(screen.getByTestId("userSearchInput"), "wrongUser");
    await user.click(screen.getByTestId("userSearchButton"));

    await waitFor(() =>
      expect(screen.getByText(/no users found/i)).toBeInTheDocument()
    );
  });

  it("renders foundUser as a link on success", async () => {
    const user = userEvent.setup();
    render(<UserSearch />);

    await user.type(screen.getByTestId("userSearchInput"), "thisUser");
    await user.click(screen.getByTestId("userSearchButton"));

    await waitFor(() => {
      expect(screen.getByTestId("mockedUserLink")).toHaveTextContent(
        "thisUser"
      );
    });
  });
});
