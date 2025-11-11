import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ListsProvider } from "../../../context/ListsProvider";
import Lists from "../Lists";

vi.mock("../components/List", () => ({
  default: ({ listTitle }) => <div data-testid="mockedList">{listTitle}</div>,
}));

describe("lists", () => {
  it("renders lists from API", async () => {
    render(
      <ListsProvider>
        <Lists />
      </ListsProvider>
    );

    await waitFor(() => {
      expect(screen.getAllByTestId("mockedList")).toHaveLength(3);
      expect(screen.getByText("wishlist")).toBeInTheDocument();
      expect(screen.getByText("wip")).toBeInTheDocument();
      expect(screen.getByText("completed")).toBeInTheDocument();
    });
  });
});
