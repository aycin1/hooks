import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import Categories from "../components/Categories";

vi.mock("../components/Checkbox", () => ({
  default: ({ node }) => (
    <div data-testid="mockedCheckbox">
      {node.map((n) => (
        <span key={n.name}>
          {n.label}
          {n.children.map((child) => (
            <span key={child.name}>{child.name}</span>
          ))}
        </span>
      ))}
    </div>
  ),
}));

it("renders categories returned from server", async () => {
  render(<Categories handleChange={vi.fn()} />);

  expect(await screen.findByText("hats")).toBeInTheDocument();
  expect(screen.getByText("beanies")).toBeInTheDocument();
});
