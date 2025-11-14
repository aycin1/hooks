import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import RenderImage from "../RenderImage";

vi.mock("@imagekit/react", async () => {
  const actual = await vi.importActual("@imagekit/react");
  return {
    ...actual,
    Image: (post) => <img data-testid="mockedImagekit" {...post} />,
  };
});

describe("render image", () => {
  it("passes postID to Image component", () => {
    render(<RenderImage postID={12} />);

    expect(screen.getByRole("img")).toHaveAttribute("src", "/12");
  });
});
