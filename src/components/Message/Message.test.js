import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Message from "./Message";
import { prettyDOM } from "@testing-library/dom";

test("render Message", () => {
  const message = render(<Message username={"user1"} text={"test1"} />);
  expect(message.container).toHaveTextContent("user1: test1");
  // console.log(prettyDOM(comp.container));
  // const { getByText } = comp;
  // const { getByText } = message;
  // getByText("user1: test1");
});
test("Message class is message", () => {
  const message = render(<Message username={"user1"} text={"test1"} />);
  expect(message.container.childNodes[0]).toHaveClass("message");
});
