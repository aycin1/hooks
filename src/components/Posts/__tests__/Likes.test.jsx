import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { describe, expect, it, vi } from "vitest";
import { server } from "../../../mocks/node";
import Likes from "../Likes";

describe("likes", () => {
  it("renders button with like count", async () => {
    render(<Likes postID={123} />);

    await waitFor(() => {
      expect(screen.getByRole("button")).toHaveTextContent(3);
    });
  });

  it("submits post request on initial click and delete request on the second", async () => {
    const user = userEvent.setup();

    render(<Likes postID={123} />);

    await user.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(screen.getByRole("button").textContent).toStrictEqual(" 4");
    });

    await user.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(screen.getByRole("button").textContent).toStrictEqual(" 3");
    });
  });

  it("toggles heart icon between regular and solid on like", async () => {
    const user = userEvent.setup();

    render(<Likes postID={123} />);

    expect(screen.getByRole("img")).toHaveAttribute("prefix", "far");

    await user.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(screen.getByRole("img")).toHaveAttribute("prefix", "fas");
    });

    await user.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(screen.getByRole("img")).toHaveAttribute("prefix", "far");
    });
  });

  it("submits delete request if user has liked initially", async () => {
    const user = userEvent.setup();
    const deleteSpy = vi.fn();

    server.use(
      http.get("http://localhost:2501/likes/user/:postID", () => {
        return HttpResponse.json(true);
      }),
      http.delete("http://localhost:2501/likes", async ({ request }) => {
        deleteSpy(await request.json());
        return HttpResponse.json({
          message: "like removed",
        });
      })
    );

    render(<Likes postID={123} />);

    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(deleteSpy).toHaveBeenCalledExactlyOnceWith({ post_id: 123 });
    });
  });
});
