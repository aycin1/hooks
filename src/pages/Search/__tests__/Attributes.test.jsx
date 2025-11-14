import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import Attributes from "../components/Attributes";

vi.mock("../components/Checkbox", () => ({
  default: ({ node }) => (
    <div data-testid="mockedCheckbox">
      {node.map((n) => (
        <span key={n.value}>
          {n.label}
          {n.children.map((child) => (
            <span key={child.id}>{child.name}</span>
          ))}
        </span>
      ))}
    </div>
  ),
}));

it("renders attributes returned by server", async () => {
  render(<Attributes handleChange={vi.fn()} />);

  expect(await screen.findByText("size")).toBeInTheDocument();
  expect(await screen.findByText("extra-small")).toBeInTheDocument();
  expect(await screen.findByText("small")).toBeInTheDocument();
});
