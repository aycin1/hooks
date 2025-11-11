import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import usePattern from "../../hooks/usePattern";
import Thumbnail from "./Thumbnail";

vi.mock("../../hooks/usePattern", () => ({
  default: vi.fn(),
}));

describe("thumbnail", () => {
  it("returns image not found message if no photo", () => {
    usePattern.mockReturnValue({ id: "123456" });
    render(<Thumbnail patternID="123456" thumbnailOptions={{}} />);

    expect(screen.getByText(/^Image not found$/)).toBeInTheDocument();
  });

  it("renders image with appropriate alt text", () => {
    usePattern.mockReturnValue({
      id: "123456",
      photos: [
        {
          url: "example.jpg",
        },
      ],
    });
    render(<Thumbnail patternID="123456" thumbnailOptions={{}} />);

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "alt",
      "Image of pattern 123456"
    );
  });
});
