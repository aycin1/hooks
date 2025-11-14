import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import RefineSearch from "../components/RefineSearch";
import nodes from "../components/customNodes";

vi.mock("../components/Checkbox", () => ({
  default: ({ node }) => (
    <div data-testid="mockedCheckbox">
      {node.map((n) => (
        <span key={n.value}>
          {n.label}
          {n.children.map((child) => (
            <span key={child.value}>{child.label}</span>
          ))}
        </span>
      ))}
    </div>
  ),
}));

vi.mock("../components/Attributes", () => ({
  default: () => <div data-testid="mockedAttributes">Attributes</div>,
}));

vi.mock("../components/Categories", () => ({
  default: () => <div data-testid="mockedCategories">Categories</div>,
}));

it("renders custom nodes, attributes, and categories", () => {
  render(<RefineSearch handleChange={vi.fn()} />);

  nodes.forEach((group) =>
    expect(screen.getByText(group[0].label)).toBeInTheDocument()
  );

  expect(screen.getByText(/attributes/i)).toBeInTheDocument();
  expect(screen.getByText(/categories/i)).toBeInTheDocument();
});
