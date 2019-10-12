import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";
import SendMessageForm from "../SendMessageForm";
import { prettyDOM } from "@testing-library/dom";

describe("SendMessageForm", () => {
  test("click submit (w empty message) => props.sendMessage doesnt gets called", () => {
    const onSubmit = jest.fn();
    const component = render(<SendMessageForm sendMessage={onSubmit} />);
    const { getByText } = component;
    fireEvent.click(getByText("Send").parentNode);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test("write message => changes message state", () => {
    const component = render(<SendMessageForm />);
    const input = component.container.querySelector("input");
    fireEvent.change(input, { target: { value: "new message" } });
    expect(input).toHaveAttribute("value");
    expect(input.value).toBe("new message");
  });

  test("click submit => correct message is sent and input.value is emptied", () => {
    const onSubmit = jest.fn();

    const component = render(<SendMessageForm sendMessage={onSubmit} />);
    const input = component.container.querySelector("input");
    fireEvent.change(input, { target: { value: "test message 1" } });

    fireEvent.click(component.getByText("Send").parentNode);
    expect(onSubmit).toHaveBeenCalledWith("test message 1");
    expect(input.value).toBe("");
  });

  test.skip("press enter => props.sendMessage gets called", () => {
    const onSubmit = jest.fn();

    const component = render(<SendMessageForm sendMessage={onSubmit} />);
    const input = component.container.querySelector("input");
    // fireEvent.change(input, { target: { value: "test Enter" } });

    fireEvent.keyDown(input, {
      key: "Enter",
      keyCode: 13,
      bubbles: true
    });
    // console.log(prettyDOM(input));
    expect(onSubmit).toHaveBeenCalled();
    // expect(onSubmit).toHaveBeenCalledWith("test Enter");
    // expect(input.value).toBe("");
  });
});
