import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { beforeEach, describe, expect, it, vi } from "vitest";
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
  beforeEach(() => {
    vi.clearAllMocks();
  });

  async function fillValidForm() {
    await userEvent.type(screen.getByTestId("email"), "test@gmail.com");
    await userEvent.type(screen.getByTestId("username"), "validUser");
    await userEvent.type(screen.getByTestId("password"), "MyPwd123!");
    await userEvent.type(screen.getByTestId("passwordConfirm"), "MyPwd123!");
  }

  it("updates input fields when user types", async () => {
    render(<RegistrationForm />);

    await fillValidForm();

    expect(screen.getByTestId("email").value).toStrictEqual("test@gmail.com");
    expect(screen.getByTestId("username").value).toStrictEqual("validUser");
    expect(screen.getByTestId("password").value).toStrictEqual("MyPwd123!");
    expect(screen.getByTestId("passwordConfirm").value).toStrictEqual(
      "MyPwd123!"
    );
  });

  it("navigates user to /login on success", async () => {
    render(<RegistrationForm />);

    await fillValidForm();
    await userEvent.click(screen.getByTestId("registerButton"));

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
    await userEvent.click(screen.getByTestId("registerButton"));

    await waitFor(() => {
      expect(screen.getByText(/no response from the server/i)).toBeDefined();
      expect(mockedUseNavigate).not.toHaveBeenCalled();
    });
  });

  describe("input validation", () => {
    it("initially disabled button enabled with valid field inputs", async () => {
      render(<RegistrationForm />);

      const button = screen.getByTestId("registerButton");
      expect(button).toBeDisabled();

      await fillValidForm();
      await waitFor(() => expect(button).toBeEnabled());
    });

    describe("email", () => {
      it("displays error message for invalid email", async () => {
        const user = userEvent.setup();
        render(<RegistrationForm />);

        const emailInput = screen.getByTestId("email");
        await user.type(emailInput, "invalid@email");
        await user.click(screen.getByLabelText(/username/i));
        await userEvent.click(emailInput);

        await waitFor(() =>
          expect(
            screen.getByText(/please enter a valid email address/i)
          ).toBeValid()
        );

        await user.clear(emailInput);
        await user.type(emailInput, "valid@email.com");

        await waitFor(() =>
          expect(
            screen.getByText(/please enter a valid email address/i)
          ).not.toBeValid()
        );
      });

      it("renders error message for existing email", async () => {
        const user = userEvent.setup();
        render(<RegistrationForm />);

        await user.type(
          screen.getByTestId("email"),
          "already-exists@example.com"
        );
        await user.type(screen.getByTestId("username"), "validUser");
        await user.type(screen.getByTestId("password"), "MyPwd123!");
        await user.type(screen.getByTestId("passwordConfirm"), "MyPwd123!");
        await user.click(screen.getByTestId("registerButton"));

        await waitFor(() => {
          expect(screen.getByText(/user already exists/i)).toBeDefined();
          expect(mockedUseNavigate).not.toHaveBeenCalled();
        });
      });
    });

    it("displays error message for short username", async () => {
      const user = userEvent.setup();
      render(<RegistrationForm />);

      const usernameInput = screen.getByTestId("username");
      await user.type(usernameInput, "hi");
      await user.click(screen.getByTestId("password"));
      await user.click(usernameInput);

      await waitFor(() =>
        expect(
          screen.getByText(/username must be between 5 and 23 characters/i)
        ).toBeValid()
      );

      await user.clear(usernameInput);
      await user.type(usernameInput, "validUser");

      await waitFor(() =>
        expect(
          screen.getByText(/username must be between 5 and 23 characters/i)
        ).not.toBeValid()
      );
    });

    it("displays requirements for password if weak", async () => {
      const user = userEvent.setup();
      render(<RegistrationForm />);

      const passwordInput = screen.getByTestId("password");
      await user.type(passwordInput, "weak");
      await user.click(screen.getByLabelText(/username/i));
      await userEvent.click(passwordInput);

      await waitFor(() =>
        expect(
          screen.getByText(/password must be between 8 and 24 characters/i)
        ).toBeValid()
      );

      await user.clear(passwordInput);
      await user.type(passwordInput, "ValidPwd123!");

      await waitFor(() =>
        expect(
          screen.getByText(/password must be between 8 and 24 characters/i)
        ).toBeInvalid()
      );
    });

    it("displays error message when passwords don't match", async () => {
      const user = userEvent.setup();
      render(<RegistrationForm />);

      const confirmInput = screen.getByTestId("passwordConfirm");
      await user.type(confirmInput, "mismatch");
      await user.type(screen.getByTestId("password"), "ValidPwd123!");
      await user.click(confirmInput);

      await waitFor(() =>
        expect(screen.getByText(/passwords must match/i)).toBeValid()
      );

      await user.clear(confirmInput);
      await user.type(confirmInput, "ValidPwd123!");

      await waitFor(() =>
        expect(screen.getByText(/passwords must match/i)).toBeInvalid()
      );
    });
  });
});
