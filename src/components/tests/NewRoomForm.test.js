import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";
import NewRoomForm from "../NewRoomForm";
import { prettyDOM } from "@testing-library/dom";

describe("NewRoomForm", () => {
  test("click submit => props.addRoom gets called", () => {
    const onSubmit = jest.fn();
    const component = render(<NewRoomForm addRoom={onSubmit} />);
    const { getByText } = component;
    fireEvent.click(getByText("+").parentNode);
    expect(onSubmit).toHaveBeenCalled();
  });

  test("write message => changes message state", () => {
    const component = render(<NewRoomForm />);
    const input = component.container.querySelector("input");
    fireEvent.change(input, { target: { value: "new room" } });
    expect(input).toHaveAttribute("value");
    expect(input.value).toBe("new room");
  });

  test("click submit => correct message is sent and input.value is emptied", () => {
    const onSubmit = jest.fn();
    const component = render(<NewRoomForm addRoom={onSubmit} />);
    const input = component.container.querySelector("input");
    fireEvent.change(input, { target: { value: "test message 1" } });

    fireEvent.click(component.getByText("+").parentNode);
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
