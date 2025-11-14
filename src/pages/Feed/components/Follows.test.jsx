import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import Follows from "./Follows";

describe("follows", () => {
  it("renders follow count buttons", async () => {
    render(<Follows />);

    const buttons = await screen.findAllByRole("button");
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveTextContent(/^4 followers$/);
    expect(buttons[1]).toHaveTextContent(/^6 following$/);
  });

  it("renders followers correctly on click", async () => {
    const user = userEvent.setup();
    render(<Follows />);

    const followerBtn = await screen.findByRole("button", {
      name: /followers/i,
    });
    await user.click(followerBtn);

    const mockedUserLinks = await screen.findAllByTestId("mockedUserLink");
    expect(mockedUserLinks).toHaveLength(4);
    expect(mockedUserLinks[0]).toHaveTextContent("f1");
    expect(mockedUserLinks[3]).toHaveTextContent("f4");
  });

  it("renders following correctly on click", async () => {
    const user = userEvent.setup();
    render(<Follows />);

    const followingBtn = await screen.findByRole("button", {
      name: /following/i,
    });
    await user.click(followingBtn);

    const mockedUserLinks = await screen.findAllByTestId("mockedUserLink");
    expect(mockedUserLinks).toHaveLength(6);
    expect(mockedUserLinks[0]).toHaveTextContent("fA");
    expect(mockedUserLinks[5]).toHaveTextContent("fG");
  });
});
