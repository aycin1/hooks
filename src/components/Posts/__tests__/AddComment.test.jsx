import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { describe, expect, it, vi } from "vitest";
import { server } from "../../../mocks/node";
import AddComment from "../AddComment";

describe("add comment", () => {
  it("calls POST on submit with relevant data and clears input", async () => {
    const user = userEvent.setup();
    const postSpy = vi.fn();

    server.use(
      http.post("http://localhost:2501/comments", async ({ request }) => {
        postSpy(await request.json());
        return HttpResponse.json({ message: "comment posted" });
      })
    );
    const handleChange = vi.fn();
    render(<AddComment postID={123456} handleChange={handleChange} />);

    await user.type(
      screen.getByPlaceholderText("Comment..."),
      "this looks great!"
    );
    await user.keyboard("{enter}");

    await waitFor(() => {
      expect(postSpy).toHaveBeenCalledExactlyOnceWith({
        message: "this looks great!",
        post_id: 123456,
      });
      expect(handleChange).toHaveBeenCalledExactlyOnceWith("comment posted");
      expect(screen.getByPlaceholderText("Comment...").value).toStrictEqual("");
    });
  });
});
