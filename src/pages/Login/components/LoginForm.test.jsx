import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { server } from "../../../mocks/node";
import LoginForm from "./LoginForm";

const mockedUseNavigate = vi.fn();

vi.mock("react-router", async () => {
  const mod = await vi.importActual("react-router");
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
    useLocation: () => ({ state: { from: { pathname: "/dashboard" } } }),
  };
});

const mockedSetAuth = vi.fn();

vi.mock("../../../hooks/useAuth", () => ({
  default: () => ({
    setAuth: mockedSetAuth,
    setPersist: (fn) => {
      const newVal = fn(false);
      localStorage.setItem("persist", newVal);
    },
  }),
}));

describe("login form", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("updates input fields when user types", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const username = screen.getByLabelText(/username/i);
    const password = screen.getByLabelText(/password/i);

    await user.type(username, "example");
    await user.type(password, "MyPwd123!");

    expect(username.value).toStrictEqual("example");
    expect(password.value).toStrictEqual("MyPwd123!");
  });

  it("submits user data and navigates on success", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText(/username/i), "example");
    await user.type(screen.getByLabelText(/password/i), "MyPwd123!");
    await user.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(mockedSetAuth).toHaveBeenCalledWith({
        username: "example",
        password: "MyPwd123!",
        accessToken: "mockToken123",
      });

      expect(mockedUseNavigate).toHaveBeenCalledWith("/dashboard", {
        replace: true,
      });
    });
  });

  it("renders error message for invalid credentials", async () => {
    const user = userEvent.setup();

    render(<LoginForm />);

    await user.type(screen.getByLabelText(/username/i), "incorrect");
    await user.type(screen.getByLabelText(/password/i), "user");
    await user.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeDefined();
      expect(mockedUseNavigate).not.toHaveBeenCalled();
    });
  });

  it("renders error message for no server response", async () => {
    const user = userEvent.setup();
    server.use(
      http.post("http://localhost:2501/login", async () => {
        return HttpResponse.error();
      })
    );
    render(<LoginForm />);

    await user.type(screen.getByLabelText(/username/i), "example");
    await user.type(screen.getByLabelText(/password/i), "MyPwd123!");
    await user.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(screen.getByText(/no response from the server/i)).toBeDefined();
      expect(mockedUseNavigate).not.toHaveBeenCalled();
    });
  });

  it("updates localStorage when persist changes", async () => {
    const user = userEvent.setup();

    render(<LoginForm />);

    const checkbox = screen.getByRole("checkbox", {
      name: /trust this device/i,
    });

    expect(checkbox.checked).toEqual(false);

    await user.click(checkbox);

    expect(localStorage.getItem("persist")).toBe("true");
    expect(checkbox.checked).toEqual(true);
  });
});
