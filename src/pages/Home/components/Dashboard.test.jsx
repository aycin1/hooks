import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ListsProvider } from "../../../context/ListsProvider";
import { testAxios } from "../../../testAxios";
import Dashboard from "./Dashboard";

vi.mock("../../hooks/useAxiosPrivate", () => ({ default: () => testAxios }));

vi.mock("./ListButton", () => ({
  default: ({ handleClick, title }) => (
    <button data-testid="mockedListButton" onClick={() => handleClick(title)}>
      {title}
    </button>
  ),
}));

vi.mock("./DisplayList", () => ({
  default: ({ chosenList }) => (
    <div data-testid="mockedDisplayList">{chosenList}</div>
  ),
}));

vi.mock("../../../components/SearchLink/SearchLink", () => ({
  default: ({ children }) => <a data-testid="mockedSearchLink">{children}</a>,
}));

describe("dashboard", () => {
  it("renders list buttons", async () => {
    render(
      <ListsProvider>
        <Dashboard />
      </ListsProvider>
    );

    await waitFor(() => {
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(3);
      expect(screen.getByText("wishlist")).toBeInTheDocument();
    });
  });

  it("renders message when no list is selected", async () => {
    render(
      <ListsProvider>
        <Dashboard />
      </ListsProvider>
    );

    expect(screen.getByText(/please select a list/i)).toBeInTheDocument();
  });

  it("renders appropriate list on click", async () => {
    const user = userEvent.setup();

    render(
      <ListsProvider>
        <Dashboard />
      </ListsProvider>
    );

    await screen.findByText("wip");
    await user.click(screen.getByText("wip"));

    expect(await screen.findByTestId("mockedDisplayList")).toHaveTextContent(
      "wip"
    );
  });

  it("renders SearchLink when chosen list is empty", async () => {
    const user = userEvent.setup();

    render(
      <ListsProvider>
        <Dashboard />
      </ListsProvider>
    );

    await user.click(await screen.findByText("completed"));

    waitFor(() => {
      const list = screen.findByTestId("mockedDisplayList");
      expect(list).toHaveTextContent("wip");
      expect(list).toHaveLength(2);
    });
  });
});
