import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Posts from "../Posts";

vi.mock("../Post", () => ({
  default: ({ post }) => <div data-testid="mockedPost">{post.username}</div>,
}));

describe("posts", () => {
  it("renders appropriate number of posts", () => {
    const mockPosts = [
      { post_id: 1, username: "user", caption: "a" },
      { post_id: 2, username: "user2", caption: "b" },
      { post_id: 3, username: "user3", caption: "c" },
    ];

    render(<Posts posts={mockPosts} />);

    expect(screen.getAllByTestId("mockedPost")).toHaveLength(3);
    expect(screen.getAllByTestId("mockedPost")[1]).toHaveTextContent("user2");
  });
});
