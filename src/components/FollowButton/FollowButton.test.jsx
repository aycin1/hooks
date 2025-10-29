import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { testAxios } from "../../testAxios";
import FollowButton from "./FollowButton";

vi.mock("../../hooks/useAxiosPrivate", () => ({ default: () => testAxios }));

describe("follow button", () => {
  it("clicking button toggles following state", async () => {
    const user = userEvent.setup();
    render(<FollowButton username="newUser" />);

    await waitFor(() =>
      expect(screen.getByRole("button")).toHaveTextContent(/^follow$/)
    );

    await user.click(screen.getByText(/^follow$/));

    await waitFor(() => {
      expect(screen.getByRole("button")).toHaveTextContent(/^unfollow$/);
    });

    await user.click(screen.getByText(/^unfollow$/));

    await waitFor(() =>
      expect(screen.getByRole("button")).toHaveTextContent(/^follow$/)
    );
  });
});
