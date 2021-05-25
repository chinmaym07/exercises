import React from 'react'
import "./blog,styles.css";

const Blog = ({blog}) => (
  <div className="blog-cont">
    <a href={blog.url}>
      <div className="blog-head">
        <h2>{blog.title}</h2>
        <p>{blog.author}</p>
      </div>
      <p>{blog.likes} Likes</p>
    </a>
  </div>  
)

export default Blog;