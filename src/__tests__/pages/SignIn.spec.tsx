import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import SignIn from "../../pages/SignIn";

jest.mock("react-router-dom", () => {
  return {
    useHistory: jest.fn(),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock("../../hooks/Auth", () => {
  return {
    useAuth: () => ({
      signIn: jest.fn(),
    }),
  };
});

const mockFoo = jest.fn();

jest.mock("../../hooks/Toast", () => {
  return {
    useToast: () => ({
      addToast: mockFoo,
    }),
  };
});

describe("SignIn page", () => {
  it("Should be able to sign IN", async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const email = getByPlaceholderText("e-mail");
    const pass = getByPlaceholderText("senha");
    const button = getByText("Entrar");

    fireEvent.change(email, { target: { value: "rafahotmail.com" } });
    fireEvent.change(pass, { target: { value: "aloha" } });
    fireEvent.click(button);

    await wait(() => {
      expect(mockFoo).not.toHaveBeenCalled();
    });
  });
});
