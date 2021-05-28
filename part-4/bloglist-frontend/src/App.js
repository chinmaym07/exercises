import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/blog";
import blogService from "./services/blogs";
import Login from "./components/login/login";
import "./index.css";
import Notification from "./components/notification/notification";
import AddNewBlogForm from "./components/AddNewBlogForm";
import TogglableComponent from "./components/togglable-component/togglable";


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notifMessage, setNotifMessage] = useState("");
  const [notifMessageStatus, setNotifMessageStatus] = useState(0);
  const blogFormRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [ID, setID] = useState(-1);

  const toggleActive = (id) => {
    //console.log(id);
    if(isOpen){
      if(ID === id){
        setIsOpen(false);
        setID(-1);
      } else{
        setIsOpen(false);
        setID(id);
        setIsOpen(true);
      }
    } else{
      setID(id);
      setIsOpen(true);
    }
  };
  const fetchBlogs = async () => {
    let allBlogs = await blogService.getAll();
    allBlogs.sort((a,b) => a.likes-b.likes);
    setBlogs( allBlogs );
  };

  const onLiked = async (blog) => {
    let updateBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    try{
      await blogService.updateExistingBlog(blog.id,updateBlog);
      fetchBlogs();
    }
    catch(err){
      setNotifMessage("Blog Cannot be Updated!!");
      console.log(err);
      setNotifMessageStatus(-1);
    }
  };

  const createNewBlog = async(newBlog) => {
    try{
      let res = await blogService.createNewBlog(newBlog);
      setNotifMessage(`${res.title} blog by ${res.author} is added`);
      setNotifMessageStatus(1);
      fetchBlogs();
    }
    catch(err)
    {
      setNotifMessage("Blog Cannot be added");
      console.log(err);
      setNotifMessageStatus(-1);
    }
    blogFormRef.current.toggleVisibility();
    setTimeout(() => {
      setNotifMessage("");
    },5000);
  };

  const deleteBlog = async (blog) => {
    let conf = window.confirm(`Remove blog: ${blog.title} by ${blog.author}`);
    if(conf)
    {
      try {
        let result = await blogService.deleteBlogPost(blog.id);
        console.log(result);
        if(result.status === 200 )
        {
          setNotifMessage(`${blog.title} by ${blog.author} is deleted Successfully`);
          setNotifMessageStatus(1);
          fetchBlogs();
        }
        else{
          setNotifMessage(`${blog.title} by ${blog.author} cannot be deleted due to Error : ${result.data.message}`);
          setNotifMessageStatus(-1);
        }
      } catch(err){
        console.log(err);
      }
      setTimeout(() => {
        setNotifMessage("");
      },5000);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("user");
    if(loggedInUser)
    {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div>
      {
        notifMessage?<Notification message={notifMessage} status={notifMessageStatus}/>:null
      }
      {
        user === null ? <Login setUser={setUser} setNotifMessage={setNotifMessage} setNotifMessageStatus={setNotifMessageStatus}/>:<div>
          <h3>Welcome {user.username}</h3>
          <button onClick={handleLogout} >Logout</button>
          <h2>Blogs Stored</h2>
          <TogglableComponent buttonLabel="Create a New Blog" ref={blogFormRef}>
            <AddNewBlogForm createNewBlog={createNewBlog}/>
          </TogglableComponent>
          <div className="blogs-container">
            {
              blogs.map((blog,index) =>
                <Blog key={index} blog={blog} id={ID} toggleActive={toggleActive} isOpen={isOpen} index={index} onLiked={onLiked} deleteBlog={deleteBlog} deleteBlogBtn={blog.user.username === user.username}/>
              )
            }
          </div>
        </div>
      }
    </div>
  );
};

export default App;