import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import Post from "../Post";

vi.mock("../EditAndDeleteButtons", () => ({
  default: () => (
    <>
      <button data-testid="mockedEditButton">edit</button>
      <button data-testid="mockedDeleteButton">delete</button>
    </>
  ),
}));

vi.mock("../RenderImage", () => ({
  default: ({ postID }) => (
    <img data-testid="mockedRenderImage" src={`/${postID}`} />
  ),
}));

vi.mock("../../PatternCard/PatternCard", () => ({
  default: ({ patternID }) => (
    <div data-testid="mockedPatternCard">pattern card {patternID}</div>
  ),
}));

vi.mock("../../Dropdown/Dropdown", () => ({
  default: ({ patternID }) => (
    <div data-testid="mockedDropdown">dropdown for {patternID}</div>
  ),
}));

vi.mock("../Likes", () => ({
  default: ({ postID }) => (
    <div data-testid="mockedLikes">likes for {postID}</div>
  ),
}));

vi.mock("../ToggleComments", () => ({
  default: ({ postID }) => (
    <div data-testid="mockedToggleComments">comments for {postID}</div>
  ),
}));

describe("post", () => {
  it("renders edit and delete buttons for user's post", async () => {
    const mockPost = {
      username: "thisUser",
      post_id: 123,
      caption: "my caption",
      pattern_id: 321,
    };

    render(
      <MemoryRouter>
        <Post post={mockPost} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("mockedDeleteButton")).toBeInTheDocument();
      expect(screen.getByTestId("mockedEditButton")).toBeInTheDocument();
    });
  });

  it("doesn't render edit and delete buttons for different user's post", async () => {
    const mockPost = {
      username: "anotherUser",
      post_id: 123,
      caption: "my caption",
      pattern_id: 321,
    };

    render(
      <MemoryRouter>
        <Post post={mockPost} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.queryByTestId("mockedDeleteButton")
      ).not.toBeInTheDocument();
      expect(screen.queryByTestId("mockedEditButton")).not.toBeInTheDocument();
      expect(screen.getByTestId("mockedPatternCard")).toBeInTheDocument();
      expect(screen.getByTestId("mockedLikes")).toBeInTheDocument();
      expect(screen.getByTestId("mockedToggleComments")).toBeInTheDocument();
      expect(screen.getByTestId("mockedRenderImage")).toBeInTheDocument();
    });
  });

  it("renders link to user profile", () => {
    const mockPost = {
      username: "thisUser",
      post_id: 123,
      caption: "my caption",
      pattern_id: 321,
    };

    render(
      <MemoryRouter>
        <Post post={mockPost} />
      </MemoryRouter>
    );

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/profile/thisUser"
    );
  });
});
