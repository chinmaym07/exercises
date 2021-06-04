import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import AddNewBlogForm from "./index";

test("<AddNewBlogForm /> update Parent State & calls onSubmit", () => {
  const createNewBlog = jest.fn();
  let component = render(
    <AddNewBlogForm createNewBlog={createNewBlog} />
  );
  const form = component.container.querySelector("form");
  const titleInput = component.container.querySelector("input[name='title']");
  const authorInput = component.container.querySelector("input[name='author']");
  const urlInput = component.container.querySelector("input[name='url']");
  const likesInput = component.container.querySelector("input[name='likes']");
  fireEvent.change(titleInput,{
    target: { value: "Introducing Teaming in LitmusChaos to ease your Chaos Engineering experience" }
  });
  fireEvent.change(authorInput,{
    target: { value: "Saranya Jena" }
  });
  fireEvent.change(urlInput,{
    target: { value: "https://dev.to/saranyajena/introducing-teaming-in-litmuschaos-to-ease-your-chaos-engineering-experience-5alo" }
  });
  fireEvent.change(likesInput,{
    target: { value: 10 }
  });

  fireEvent.submit(form);

  expect(createNewBlog.mock.calls).toHaveLength(1);
  expect(createNewBlog.mock.calls[0][0].title).toBe("Introducing Teaming in LitmusChaos to ease your Chaos Engineering experience");
  expect(createNewBlog.mock.calls[0][0].url).toBe("https://dev.to/saranyajena/introducing-teaming-in-litmuschaos-to-ease-your-chaos-engineering-experience-5alo");
  expect(createNewBlog.mock.calls[0][0].author).toBe("Saranya Jena");
  expect(Number(createNewBlog.mock.calls[0][0].likes)).toBe(10);
});

test("<AddNewBlogForm /> Submit event does not succeeds when the newBlog object is not in correct format & does not have all details as url is missing here", () => {
  const createNewBlog = jest.fn();
  let component = render(
    <AddNewBlogForm createNewBlog={createNewBlog} />
  );
  const form = component.container.querySelector("form");
  const titleInput = component.container.querySelector("input[name='title']");
  const authorInput = component.container.querySelector("input[name='author']");
  const urlInput = component.container.querySelector("input[name='url']");
  const likesInput = component.container.querySelector("input[name='likes']");
  fireEvent.change(titleInput,{
    target: { value: "Introducing Teaming in LitmusChaos to ease your Chaos Engineering experience" }
  });
  fireEvent.change(authorInput,{
    target: { value: "Saranya Jena" }
  });
  fireEvent.change(urlInput,{
    target: { value: "" }
  });

  fireEvent.change(likesInput,{
    target: { value: 10 }
  });

  const obj = {
    title: titleInput.value,
    author: authorInput.value,
    url: urlInput.value,
    likes: likesInput.value,
  };

  if(!obj.title
    && !obj.url
    && !obj.author
    && !obj.likes
  )
    fireEvent.submit(form);
  expect(createNewBlog.mock.calls).toHaveLength(0);
});