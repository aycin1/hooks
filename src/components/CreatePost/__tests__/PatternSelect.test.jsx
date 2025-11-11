import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ListsProvider } from "../../../context/ListsProvider";
import PatternSelect from "../PatternSelect";

vi.mock("../../Thumbnail/Thumbnail", () => ({
  default: ({ patternID }) => (
    <div data-testid="mockedThumbnail">{patternID}</div>
  ),
}));

describe("pattern select", () => {
  it("renders appropriate message if pattern isn't selected", async () => {
    render(
      <ListsProvider>
        <PatternSelect chosenPattern={null} handleClick={vi.fn()} />
      </ListsProvider>
    );

    expect(screen.getByRole("paragraph")).toHaveTextContent(
      /Select a pattern from your lists to post.../i
    );

    await waitFor(() => {
      expect(screen.getAllByTestId("mockedThumbnail")).toHaveLength(3);
    });
  });

  it("renders thumbnail for each pattern in lists", async () => {
    render(
      <ListsProvider>
        <PatternSelect chosenPattern={null} handleClick={vi.fn()} />
      </ListsProvider>
    );

    const thumbnails = await screen.findAllByTestId("mockedThumbnail");
    expect(thumbnails).toHaveLength(3);
    expect(thumbnails[0]).toHaveTextContent(123);
    expect(thumbnails[1]).toHaveTextContent("abc");
    expect(thumbnails[2]).toHaveTextContent("def");
  });

  it("calls handleClick with chosen thumbnails pattern ID", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <ListsProvider>
        <PatternSelect chosenPattern={null} handleClick={handleClick} />
      </ListsProvider>
    );

    await user.click(
      (
        await screen.findAllByTestId("mockedThumbnail")
      )[0].parentElement
    );

    expect(handleClick).toHaveBeenCalledExactlyOnceWith(123);
  });

  it("applies styling on chosen patterns thumbnail", async () => {
    const handleClick = vi.fn();
    render(
      <ListsProvider>
        <PatternSelect chosenPattern={123} handleClick={handleClick} />
      </ListsProvider>
    );

    expect(
      (await screen.findAllByTestId("mockedThumbnail"))[0].parentElement
        .className
    ).toContain("chosen");
  });
});
