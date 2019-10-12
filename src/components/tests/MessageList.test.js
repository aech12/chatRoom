import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import MessageList from "../MessageList";
import { prettyDOM } from "@testing-library/dom";

test("no props.roomId => doesnt render messages", () => {
  const component = render(<MessageList />);
  const component2 = render(<MessageList roomId={undefined} />);
  const component3 = render(<MessageList roomId={false} />);
  const component4 = render(<MessageList roomId={null} />);

  expect(component.container).toHaveTextContent("Join a room!");
  expect(component2.container).toHaveTextContent("Join a room!");
  expect(component3.container).toHaveTextContent("Join a room!");
  expect(component4.container).toHaveTextContent("Join a room!");
});
test("with props.roomId => renders all messages", () => {
  const messagesDb = [
    { senderId: "u1", text: "t1" },
    { senderId: "u1", text: "t2!" },
    { senderId: "u2", text: "t3 -_-" }
  ];
  const component = render(<MessageList roomId={123} messages={messagesDb} />);
  const messagesInComponent = component.container.querySelectorAll(".message");
  for (let i = 0; i < messagesInComponent.length; i++) {
    expect(messagesInComponent[i]).toHaveTextContent(
      `${messagesDb[i].senderId}: ${messagesDb[i].text}`
    );
  }
});
