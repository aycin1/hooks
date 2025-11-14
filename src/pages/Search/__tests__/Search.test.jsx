import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import { axiosPrivate } from "../../../api/axios";
import { server } from "../../../mocks/node";
import Search from "../Search";
let capturedUrl = "";
describe("search", () => {
  it("displays results for user input", async () => {
    const user = userEvent.setup();
    const axiosSpy = vi.spyOn(axiosPrivate, "get");

    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    await user.type(
      screen.getByPlaceholderText(/search for patterns!/i),
      "hat"
    );

    await user.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(screen.getAllByText("wooly hat")).toHaveLength(2);
      expect(axiosSpy).toHaveBeenCalled();
      expect(axiosSpy.mock.calls[5][0]).toContain("query=hat");
    });
  });

  it("changes operators and icons when broaden search is toggled", async () => {
    server.use(
      http.get("*/patterns/refine/", ({ request }) => {
        capturedUrl = request.url;
        return HttpResponse.json([]);
      })
    );
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    await user.click(screen.getByRole("img"));
    await user.click(screen.getAllByTestId("mockedCheckboxTree")[0]);

    await waitFor(() => {
      expect(capturedUrl).toContain("%7C");
      expect(screen.getByRole("img")).toHaveAttribute(
        "data-icon",
        "square-check"
      );
    });

    await user.click(screen.getByRole("img"));
    await waitFor(() => {
      expect(capturedUrl).toContain("%2B");
      expect(screen.getByRole("img")).toHaveAttribute("data-icon", "square");
    });
  });
});
