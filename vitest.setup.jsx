import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import React from "react";
import { afterAll, afterEach, beforeAll, beforeEach, vi } from "vitest";
import { server } from "./src/mocks/node";

// Start server before all tests
beforeAll(() => {
  server.listen();
});

// Reset handlers after each test for test isolation
afterEach(() => {
  server.resetHandlers();
  cleanup();
});

// Close server after all tests
afterAll(() => server.close());

beforeEach(() => {
  vi.clearAllMocks();
});

vi.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: (props) =>
    React.createElement("img", {
      "data-icon": props.icon?.iconName || "mockedIcon",
      prefix: props.icon.prefix,
      ...props,
    }),
}));

vi.mock("@fortawesome/free-solid-svg-icons", async (importOriginal) => {
  const actual = await importOriginal("@fortawesome/free-solid-svg-icons");
  return {
    ...actual,
    faSquareXMark: { iconName: "square-xmark", prefix: "fas" },
    faPencil: { iconName: "pencil", prefix: "fas" },
    faTrashCan: { iconName: "trash-can", prefix: "fas" },
    faHeart: { iconName: "heart", prefix: "fas" },
    faComments: { iconName: "comments", prefix: "fas" },
    faCheck: { iconName: "check", prefix: "fas" },
    faCircleInfo: { iconName: "circle-info", prefix: "fas" },
    faXmark: { iconName: "xmark", prefix: "fas" },
    faChevronDown: { iconName: "chevron-down", prefix: "fas" },
    faChevronRight: { iconName: "chevron-right", prefix: "fas" },
    faFolder: { iconName: "folder", prefix: "fas" },
    faFolderOpen: { iconName: "folder-open", prefix: "fas" },
    faSquareMinus: { iconName: "square-minus", prefix: "fas" },
    faSquarePlus: { iconName: "square-plus", prefix: "fas" },
    faSquare: { iconName: "square", prefix: "fas" },
    faSquareCheck: { iconName: "square-check", prefix: "fas" },
  };
});

vi.mock("@fortawesome/free-regular-svg-icons", async (importOriginal) => {
  const actual = await importOriginal("@fortawesome/free-regular-svg-icons");
  return {
    ...actual,
    faHeart: { iconName: "heart", prefix: "far" },
  };
});

vi.mock("react-checkbox-tree", () => ({
  default: ({ onCheck }) => (
    <button
      data-testid="mockedCheckboxTree"
      onClick={() => onCheck(["node1", "node2"])}
    >
      mock checkbox tree
    </button>
  ),
}));

vi.mock("./src/components/Thumbnail/Thumbnail", () => ({
  default: ({ patternID }) => (
    <div data-testid="mockedThumbnail">{patternID}</div>
  ),
}));

vi.mock("./src/components/SearchLink/SearchLink", () => ({
  default: ({ children }) => <a data-testid="mockedSearchLink">{children}</a>,
}));

vi.mock("./src/components/FollowButton/FollowButton", () => ({
  default: ({ username }) => (
    <button data-testid="mockedFollowButton">{username}</button>
  ),
}));

vi.mock("./src/components/UserLink/UserLink", () => ({
  default: ({ foundUser }) => (
    <a href="https://test.com" data-testid="mockedUserLink">
      {foundUser}
    </a>
  ),
}));
