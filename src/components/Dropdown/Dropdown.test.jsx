import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ListsProvider } from "../../context/ListsProvider";
import { testAxios } from "../../testAxios";
import Dropdown from "./Dropdown";

vi.mock("../../hooks/useAxiosPrivate", () => ({ default: () => testAxios }));

describe("dropdown", () => {
  beforeEach(() => {
    vi.spyOn(testAxios, "post").mockResolvedValue({
      data: { message: "added" },
    });
    vi.spyOn(testAxios, "patch").mockResolvedValue({
      data: { message: "updated" },
    });
    vi.spyOn(testAxios, "delete").mockResolvedValue({
      data: { message: "removed" },
    });
  });

  it("renders correct placeholder if pattern is in a list", async () => {
    render(
      <ListsProvider>
        <Dropdown patternID={123} />
      </ListsProvider>
    );

    await waitFor(() => {
      expect(screen.getByRole("combobox")).toBeInTheDocument();
      expect(screen.getByText("edit list")).toBeInTheDocument();
    });
  });

  it("renders correct placeholder if pattern is NOT in any list", async () => {
    render(
      <ListsProvider>
        <Dropdown patternID={456} />
      </ListsProvider>
    );

    await waitFor(() => {
      expect(screen.getByRole("combobox")).toBeInTheDocument();
      expect(screen.getByText("add to list")).toBeInTheDocument();
    });
  });

  it("adds pattern to a list if it's not already in one", async () => {
    const user = userEvent.setup();
    render(
      <ListsProvider>
        <Dropdown patternID={456} />
      </ListsProvider>
    );

    await waitFor(() => expect(screen.getByText("add to list")));

    await user.selectOptions(screen.getByRole("combobox"), "wishlist");

    await waitFor(() => expect(screen.getByText("added")).toBeInTheDocument());
  });

  it("edits list if pattern is already in another one", async () => {
    const user = userEvent.setup();
    render(
      <ListsProvider>
        <Dropdown patternID={123} />
      </ListsProvider>
    );

    await waitFor(() => screen.getByText("edit list"));

    await user.selectOptions(screen.getByRole("combobox"), "wip");

    await waitFor(() =>
      expect(screen.getByText("updated")).toBeInTheDocument()
    );
  });

  it("removes pattern from list", async () => {
    const user = userEvent.setup();
    render(
      <ListsProvider>
        <Dropdown patternID={123} />
      </ListsProvider>
    );

    await waitFor(() => screen.getByText("edit list"));

    await user.selectOptions(screen.getByRole("combobox"), "remove");

    await waitFor(() =>
      expect(screen.getByText("removed")).toBeInTheDocument()
    );
  });
});
