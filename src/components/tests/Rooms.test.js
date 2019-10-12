import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";
import Rooms from "../Rooms";
import { prettyDOM } from "@testing-library/dom";

describe("Rooms", () => {
  test("click submit => props.subscribeToRoom gets called", () => {
    const onSubmit = jest.fn();
    const component = render(
      <Rooms
        rooms={[
          { name: "roomOne", id: 1 },
          { name: "room_Two", id: 2 },
          { name: "room3", id: 3 }
        ]}
        roomId={1}
        subscribeToRoom={onSubmit}
      />
    );
    // console.log(prettyDOM(component.container));
    const { getByText } = component;
    fireEvent.click(getByText("# roomOne"));
    expect(onSubmit).toHaveBeenCalled();
  });
});
