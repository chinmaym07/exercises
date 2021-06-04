import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./index";

test("renders content",() => {
  let blog = {
    "author":"Saranya Jena",
    "title":"Introducing Teaming in LitmusChaos to ease your Chaos Engineering experience",
    "url":"https://dev.to/saranyajena/introducing-teaming-in-litmuschaos-to-ease-your-chaos-engineering-experience-5alo",
    "likes": 10
  };
  const blogComponent = render(
    <Blog blog={blog} />
  );
  //console.log(blogComponent);

  expect(blogComponent.findAllByText("Introducing Teaming in LitmusChaos to ease your Chaos Engineering experience")).toBeDefined();

  expect(blogComponent.container.firstChild.className).toBe("blog-cont");
  const div = blogComponent.container.querySelector(".blog-head");
  expect(div).toHaveTextContent(
    "Introducing Teaming in LitmusChaos to ease your Chaos Engineering experience"
  );
  expect(blogComponent.getByText(
    "Introducing Teaming in LitmusChaos to ease your Chaos Engineering experience"
  )).toBeDefined();

});


test("Clicking the Like button calls event handler once",() => {
  let blog = {
    "author":"Saranya Jena",
    "title":"Introducing Teaming in LitmusChaos to ease your Chaos Engineering experience",
    "url":"https://dev.to/saranyajena/introducing-teaming-in-litmuschaos-to-ease-your-chaos-engineering-experience-5alo",
    "likes": 10
  };
  const mockHandler = jest.fn();
  const blogComponent = render(
    <Blog blog={blog} onLiked={mockHandler} isOpen={true}/>
  );
  const button = blogComponent.getByText("Like");
  fireEvent.click(button);
  expect(mockHandler.mock.calls).toHaveLength(1);
});

test("Clicking the Like button twice calls event handler twice",() => {
  let blog = {
    "author":"Saranya Jena",
    "title":"Introducing Teaming in LitmusChaos to ease your Chaos Engineering experience",
    "url":"https://dev.to/saranyajena/introducing-teaming-in-litmuschaos-to-ease-your-chaos-engineering-experience-5alo",
    "likes": 10
  };
  const mockHandler = jest.fn();
  const blogComponent = render(
    <Blog blog={blog} onLiked={mockHandler} isOpen={true}/>
  );
  const button = blogComponent.getByText("Like");
  fireEvent.click(button);
  const button2 = blogComponent.getByText("Like");
  fireEvent.click(button2);
  expect(mockHandler.mock.calls).toHaveLength(2);
});

test("Intially when the blog component renders it only has blog's title & author but does not render it url & likes", () => {
  const blog = {
    "author":"Saranya Jena",
    "title":"Introducing Teaming in LitmusChaos to ease your Chaos Engineering experience",
    "url":"https://dev.to/saranyajena/introducing-teaming-in-litmuschaos-to-ease-your-chaos-engineering-experience-5alo",
    "likes": 10
  };
  const blogComponent = render(
    <Blog blog={blog} />
  );
  expect(blogComponent.getByText("Saranya Jena")).toBeDefined();
  expect(blogComponent.getByText("Introducing Teaming in LitmusChaos to ease your Chaos Engineering experience")).toBeDefined();
  const contentDiv = blogComponent.container.querySelector(".otherContent");
  expect(contentDiv).toHaveStyle("display: none");

});

test(" blog's url and number of likes are shown when the button controlling the shown details has been clicked", () => {
  const blogActive = jest.fn();
  //console.log(blogActive);
  const blog = {
    "author": "Saranya Jena",
    "title": "Introducing Teaming in LitmusChaos to ease your Chaos Engineering experience",
    "url": "https://dev.to/saranyajena/introducing-teaming-in-litmuschaos-to-ease-your-chaos-engineering-experience-5alo",
    "likes": 10
  };
  const blogComponent = render(
    <Blog blog={blog} toggleActive={blogActive} index={1} id={1}/>
  );

  const button = blogComponent.container.querySelector(".open-close-btn");
  fireEvent.click(button);
  expect(blogComponent.getByText("Saranya Jena")).toBeDefined();
  expect(blogComponent.getByText("Introducing Teaming in LitmusChaos to ease your Chaos Engineering experience")).toBeDefined();
  expect(blogComponent.getByText("10 Likes")).toBeDefined();
  expect(blogComponent.getByText("https://dev.to/saranyajena/introducing-teaming-in-litmuschaos-to-ease-your-chaos-engineering-experience-5alo")).toBeDefined();

});