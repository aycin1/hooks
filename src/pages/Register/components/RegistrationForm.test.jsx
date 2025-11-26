import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { describe, expect, it, vi } from "vitest";
import { server } from "../../../mocks/node";
import RegistrationForm from "./RegistrationForm";

const mockedUseNavigate = vi.fn();
vi.mock("react-router", async () => {
  const mod = await vi.importActual("react-router");
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

describe("registration form", () => {
  async function fillValidForm() {
    await userEvent.type(
      screen.getByLabelText(/email address/i),
      "test@gmail.com"
    );
    await userEvent.type(screen.getByLabelText(/username/i), "validUser");
    await userEvent.type(screen.getByLabelText("Password:"), "MyPwd123!");
    await userEvent.type(
      screen.getByLabelText(/confirm password/i),
      "MyPwd123!"
    );
  }

  it("updates input fields when user types", async () => {
    render(<RegistrationForm />);

    await fillValidForm();

    expect(screen.getByLabelText(/email address/i).value).toStrictEqual(
      "test@gmail.com"
    );
  });

  it("navigates user to /login on success", async () => {
    render(<RegistrationForm />);

    await fillValidForm();
    await userEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() =>
      expect(mockedUseNavigate).toHaveBeenCalledExactlyOnceWith("/login")
    );
  });

  it("renders error message for no server response", async () => {
    server.use(
      http.post("http://localhost:2501/register", async () => {
        return HttpResponse.error();
      })
    );
    render(<RegistrationForm />);

    await fillValidForm();
    await userEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(screen.getByText(/no response from the server/i)).toBeDefined();
      expect(mockedUseNavigate).not.toHaveBeenCalled();
    });
  });

  describe("input validation", () => {
    it("initially disabled button enabled with valid field inputs", async () => {
      render(<RegistrationForm />);

      const button = screen.getByRole("button", { name: /register/i });
      expect(button).toBeDisabled();

      await fillValidForm();
      await waitFor(() => expect(button).toBeEnabled());
    });

    describe("email", () => {
      it("displays error message for invalid email", async () => {
        const user = userEvent.setup();
        render(<RegistrationForm />);

        const input = screen.getByLabelText(/email address/i);
        await user.type(input, "invalid@email");
        await user.click(screen.getByLabelText(/username/i));
        await userEvent.click(input);

        await waitFor(() =>
          expect(
            screen.getByText(/please enter a valid email address/i).className
          ).toContain("instructions")
        );

        await user.clear(input);
        await user.type(input, "valid@email.com");

        await waitFor(() =>
          expect(
            screen.getByText(/please enter a valid email address/i).className
          ).toContain("offscreen")
        );
      });

      it("renders error message for existing email", async () => {
        const user = userEvent.setup();
        render(<RegistrationForm />);

        await user.type(
          screen.getByLabelText(/email address/i),
          "already-exists@example.com"
        );
        await user.type(screen.getByLabelText(/username/i), "validUser");
        await user.type(screen.getByLabelText("Password:"), "MyPwd123!");
        await user.type(
          screen.getByLabelText(/confirm password/i),
          "MyPwd123!"
        );
        await user.click(screen.getByRole("button", { name: /register/i }));

        await waitFor(() => {
          expect(screen.getByText(/user already exists/i)).toBeDefined();
          expect(mockedUseNavigate).not.toHaveBeenCalled();
        });
      });
    });

    it("displays error message for short username", async () => {
      const user = userEvent.setup();
      render(<RegistrationForm />);

      const input = screen.getByLabelText(/username/i);
      await user.type(input, "hi");
      await user.click(screen.getByLabelText("Password:"));
      await user.click(input);

      await waitFor(() =>
        expect(
          screen.getByText(/username must be between 5 and 23 characters/i)
            .className
        ).toContain("instructions")
      );

      await user.clear(input);
      await user.type(input, "validUser");

      await waitFor(() =>
        expect(
          screen.getByText(/username must be between 5 and 23 characters/i)
            .className
        ).toContain("offscreen")
      );
    });

    it("displays requirements for password if weak", async () => {
      const user = userEvent.setup();
      render(<RegistrationForm />);

      const input = screen.getByLabelText("Password:");
      await user.type(input, "weak");
      await user.click(screen.getByLabelText(/username/i));
      await userEvent.click(input);

      await waitFor(() =>
        expect(
          screen.getByText(/password must be between 8 and 24 characters/i)
            .className
        ).toContain("instructions")
      );

      await user.clear(input);
      await user.type(input, "ValidPwd123!");

      await waitFor(() =>
        expect(
          screen.getByText(/password must be between 8 and 24 characters/i)
            .className
        ).toContain("offscreen")
      );
    });

    it("displays error message when passwords don't match", async () => {
      const user = userEvent.setup();
      render(<RegistrationForm />);

      const input = screen.getByLabelText(/confirm password/i);
      await user.type(input, "mismatch");
      await user.type(screen.getByLabelText("Password:"), "ValidPwd123!");
      await user.click(input);

      await waitFor(() =>
        expect(screen.getByText(/passwords must match/i).className).toContain(
          "instructions"
        )
      );

      await user.clear(input);
      await user.type(input, "ValidPwd123!");

      await waitFor(() =>
        expect(screen.getByText(/passwords must match/i).className).toContain(
          "offscreen"
        )
      );
    });
  });
});
