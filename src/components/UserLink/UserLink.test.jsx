import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import useUsername from "../../hooks/useUsername";
import UserLink from "./UserLink";

vi.mock("../../hooks/useUsername", () => ({
  default: vi.fn(),
}));

vi.mock("../FollowButton/FollowButton", () => ({
  default: ({ username }) => (
    <div data-testid="mockedFollowButton">{username}</div>
  ),
}));

describe("user link", () => {
  it("renders link to found user", () => {
    useUsername.mockReturnValue("thisUser");
    render(
      <MemoryRouter>
        <UserLink foundUser="foundUser" />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: "foundUser" });
    expect(link).toHaveAttribute("href", "/profile/foundUser");
  });

  it("renders follow button when viewing another user", async () => {
    useUsername.mockReturnValue("thisUser");
    render(
      <MemoryRouter>
        <UserLink foundUser="foundUser" />
      </MemoryRouter>
    );

    expect(screen.getByTestId("mockedFollowButton")).toHaveTextContent(
      "foundUser"
    );
  });

  it("doesn't render follow button for logged in user", () => {
    useUsername.mockReturnValue("thisUser");
    render(
      <MemoryRouter>
        <UserLink foundUser="thisUser" />
      </MemoryRouter>
    );

    expect(screen.queryByTestId("mockedFollowButton")).not.toBeInTheDocument();
  });
});
