import React, { useState } from "react";
import "./blog,styles.css";

const Blog = ({ blog, onLiked, deleteBlog, deleteBlogBtn }) => {
  const [visible, setVisible] = useState(false);
  const toggleActive = () => {
    setVisible(!visible);
  };
  const contentStyle = { "display": visible ? "block" : "none" };
  return (
    <div className="blog-cont">
      <div className="blog-head">
        <h2>{blog.title}</h2>
        <p>{blog.author}</p>
      </div>
      <button className="open-close-btn" onClick={toggleActive}>{visible ? "hide" : "Show"}</button>
      <div className="otherContent" style={contentStyle} >
        <p>{blog.likes} Likes</p>
        <p>{blog.url}</p>
        <button onClick={() => onLiked(blog)}>Like</button>
        {
          deleteBlogBtn ? <button onClick={() => deleteBlog(blog)}>Delete</button> : null
        }
      </div>
    </div>
  );
};

export default Blog;