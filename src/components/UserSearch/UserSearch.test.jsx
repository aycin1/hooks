import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import UserSearch from "./UserSearch";

describe("user search", () => {
  it("updates input field when user types", async () => {
    const user = userEvent.setup();
    render(<UserSearch />);

    await user.type(
      screen.getByPlaceholderText("Search for your friends!"),
      "user"
    );

    expect(
      screen.getByPlaceholderText("Search for your friends!").value
    ).toStrictEqual("user");
  });

  it("renders error message for no user found", async () => {
    const user = userEvent.setup();
    render(<UserSearch />);

    await user.type(
      screen.getByPlaceholderText("Search for your friends!"),
      "wrongUser"
    );
    await user.click(screen.getByRole("button", { name: "Search" }));

    await waitFor(() =>
      expect(screen.getByText(/no users found/i)).toBeInTheDocument()
    );
  });

  it("renders foundUser as a link on success", async () => {
    const user = userEvent.setup();
    render(<UserSearch />);

    await user.type(
      screen.getByPlaceholderText("Search for your friends!"),
      "thisUser"
    );
    await user.click(screen.getByRole("button", { name: "Search" }));

    await waitFor(() => {
      expect(screen.getByTestId("mockedUserLink")).toHaveTextContent(
        "thisUser"
      );
    });
  });
});
