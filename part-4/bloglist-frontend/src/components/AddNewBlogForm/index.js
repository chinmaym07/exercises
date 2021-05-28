import React, { useState } from "react";
import "./addnewblogform.styles.css";


const AddNewBlogForm = ({ createNewBlog }) => {

  const [newBlog,setNewBlog] = useState({
    title:"",
    url:"",
    author:"",
    likes: 0
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    createNewBlog(newBlog);
    setNewBlog({
      title:"",
      url:"",
      author:"",
      likes: 0
    });
  };

  return (
    <div className="blog-form">
      <h3>Add New Blog</h3>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
            Title <input type="text" name="title" value={newBlog.title} onChange={({ target }) => setNewBlog({ ...newBlog, "title": target.value })} required/>
        </div>
        <div className="inputs">
            Author <input type="text" name="author" value={newBlog.author} onChange={({ target }) => setNewBlog({ ...newBlog, "author": target.value })} required/>
        </div>
        <div className="inputs">
            Url <input type="url" name="url" value={newBlog.url} onChange={({ target }) => setNewBlog({ ...newBlog, "url": target.value })} required/>
        </div>
        <div className="inputs">
            Likes <input type="number" name="likes" value={newBlog.likes} onChange={({ target }) => setNewBlog({ ...newBlog, "likes": target.value })} required/>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddNewBlogForm;