import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import { server } from "../../../mocks/node";
import Comments from "../Comments";

vi.mock("../AddComment", () => ({
  default: ({ postID }) => (
    <div data-testid="mockedAddComment">add comment for post {postID}</div>
  ),
}));

describe("comments", () => {
  it("shows comments upon fetch", async () => {
    render(
      <MemoryRouter>
        <Comments postID={123456} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByRole("paragraph")).toHaveLength(2);
      expect(screen.getAllByRole("paragraph")[0]).toHaveTextContent("c1");
      expect(screen.getAllByRole("paragraph")[1]).toHaveTextContent("c2");
    });
  });

  it("renders link to user profile", async () => {
    render(
      <MemoryRouter>
        <Comments postID={123456} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByRole("link")[0]).toHaveAttribute(
        "href",
        "/profile/user"
      );
      expect(screen.getAllByRole("link")[1]).toHaveAttribute(
        "href",
        "/profile/thisUser"
      );
    });
  });

  it("renders delete button only for current user", async () => {
    render(
      <MemoryRouter>
        <Comments postID={123456} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByRole("button", { name: /delete/i })).toHaveLength(
        1
      );
    });
  });

  it("calls delete on click of button", async () => {
    const user = userEvent.setup();
    const deleteSpy = vi.fn();
    server.use(
      http.delete("http://localhost:2501/comments/", async ({ request }) => {
        deleteSpy(await request.json());
        return HttpResponse.json({ message: "comment deleted" });
      })
    );

    render(
      <MemoryRouter>
        <Comments postID={123456} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("c2")).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: "delete comment" }));

    await waitFor(() => {
      expect(deleteSpy).toHaveBeenCalledExactlyOnceWith({
        comment: "c2",
        post_id: 123456,
      });
    });
  });
});
