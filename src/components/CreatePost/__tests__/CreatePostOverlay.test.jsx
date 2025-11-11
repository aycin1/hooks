import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it, vi } from "vitest";
import CreatePostOverlay from "../CreatePostOverlay";

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();
});

vi.mock("../../../hooks/useAuth", () => ({
  default: () => ({ persist: true }),
}));

vi.mock("../PatternSelect", () => ({
  default: ({ handleClick }) => (
    <>
      <div data-testid="pattern 1" onClick={() => handleClick(1)}>
        pattern 1
      </div>
      <div onClick={() => handleClick(2)}>pattern 2</div>
    </>
  ),
}));
vi.mock("../UploadImage", () => ({
  default: ({ handleUploadSuccess }) => (
    <button data-testid="mockedUpload" onClick={handleUploadSuccess}>
      Upload Image
    </button>
  ),
}));

describe("create post overlay", () => {
  it("renders patterns to select from", () => {
    render(<CreatePostOverlay openClick={true} closeClick={vi.fn()} />);
    expect(screen.getByText("pattern 1")).toBeInTheDocument();
    expect(screen.getByText("pattern 2")).toBeInTheDocument();
  });

  it("disables submit button initially", () => {
    render(<CreatePostOverlay openClick={true} closeClick={vi.fn()} />);

    expect(screen.getByTestId("submit")).toBeDisabled();
  });

  it("enables submit button on pattern selection and image upload", async () => {
    const user = userEvent.setup();
    render(<CreatePostOverlay openClick={true} closeClick={vi.fn()} />);

    user.click(screen.getByTestId("pattern 1"));
    user.click(screen.getByTestId("mockedUpload"));

    await waitFor(() => {
      expect(screen.getByTestId("submit")).toBeEnabled();
    });
  });

  it("submits successfully and displays success message from server", async () => {
    const user = userEvent.setup();
    render(<CreatePostOverlay openClick={true} closeClick={vi.fn()} />);

    user.click(screen.getByTestId("pattern 1"));
    user.click(screen.getByTestId("mockedUpload"));
    await user.click(screen.getByTestId("submit"));

    await waitFor(() => {
      expect(screen.getByText("Posted")).toBeInTheDocument();
    });
  });
});
