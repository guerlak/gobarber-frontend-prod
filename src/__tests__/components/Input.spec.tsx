import React from "react";
import { render, fireEvent, wait, act } from "@testing-library/react";
import Input from "../../components/Input";

describe("Input component", () => {
  it("Should be able to render an input", () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="email" error="" />
    );
    expect(getByPlaceholderText("email")).toBeTruthy();
  });

  it("Should renders highlight on input focus", async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="email" error="" />
    );

    const inputEl = getByPlaceholderText("email");
    const containerEl = getByTestId("input-container");

    act(() => {
      fireEvent.focus(inputEl);
    });

    await wait(() => {
      expect(containerEl).toHaveStyle("border-color: #ff9000");
    });

    act(() => {
      fireEvent.blur(inputEl);
    });

    await wait(() => {
      expect(containerEl).not.toHaveStyle("color: #ff9000");
    });
  });
});
