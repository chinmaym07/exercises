import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TogglableComponent from "./togglable";

describe("<Togglable />",() => {
  let component;
  beforeEach(() => {
    component = render(
      <TogglableComponent buttonLabel="Show">
        <div className="testDiv" />
      </TogglableComponent>
    );
  });

  test("render its children", () => {
    expect(
      component.container.querySelector(".testDiv")
    ).toBeDefined();
  });

  test("At Start Children are not displayed", () => {
    const div = component.container.querySelector(".togglableContent");
    expect(div).toHaveStyle("display: none");
  });


  test("After Clicking the Button, Childrens are displayed !", () => {
    const div = component.container.querySelector(".togglableContent");
    const button = component.getByText("Show");
    fireEvent.click(button);

    expect(div).not.toHaveStyle("display: none");

  });

  test("After Clicking the Cancel Button, Childrens are not displayed !", () => {

    const openButton = component.getByText("Show");
    fireEvent.click(openButton);

    const closeButton = component.getByText("Cancel");
    fireEvent.click(closeButton);
    const div = component.container.querySelector(".togglableContent");

    expect(div).toHaveStyle("display: none");

  });
});

