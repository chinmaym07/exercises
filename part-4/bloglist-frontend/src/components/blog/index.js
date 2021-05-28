import React from "react";
import "./blog,styles.css";

const Blog = ({ blog, id, toggleActive, isOpen, index, onLiked, deleteBlog, deleteBlogBtn }) => {
  return (
    <div className="blog-cont">
      <div className="blog-head">
        <h2>{blog.title}-{blog.author}</h2>
      </div>
      <button onClick={() => toggleActive(index)}>{ isOpen && id === index ? "hide" : "Show"}</button>
      {
        isOpen && id === index ?
          <div>
            <p>{blog.likes} Likes <button onClick={() => onLiked(blog)}>Like</button></p>
            <p>{blog.url}</p>
            {
              deleteBlogBtn ? <button onClick={() => deleteBlog(blog)}>Delete</button> : null
            }
          </div>
          :
          null
      }
    </div>
  );
};

export default Blog;