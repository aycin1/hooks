import { render, screen, waitFor } from "@testing-library/react";
import * as router from "react-router";
import { describe, expect, it, vi } from "vitest";
import Profile from "./Profile";

vi.mock("../../hooks/usePosts", () => ({
  default: vi.fn(),
}));

vi.mock("../../components/CreatePost/CreatePost", () => ({
  default: () => <div data-testid="mockedCreatePost">Create Post</div>,
}));

vi.mock("../../components/Posts/Posts", () => ({
  default: ({ posts }) => <a data-testid="mockedPosts">{posts}</a>,
}));

describe("profile", () => {
  it("renders create post when viewing own profile", async () => {
    vi.spyOn(router, "useParams").mockReturnValue({ username: "thisUser" });

    render(<Profile />);

    await waitFor(() => {
      expect(screen.getByText("thisUser")).toBeInTheDocument();
      expect(screen.getByText("Create Post")).toBeInTheDocument();
    });
  });

  it("renders follow button when viewing another users profile", async () => {
    vi.spyOn(router, "useParams").mockReturnValue({ username: "diffUser" });

    render(<Profile />);

    await waitFor(() => {
      expect(screen.getByRole("heading")).toHaveTextContent("diffUser");
      expect(screen.getByRole("button")).toHaveTextContent("diffUser");
    });
  });
});
