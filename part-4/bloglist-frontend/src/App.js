import React, { useState, useEffect } from 'react'
import Blog from './components/blog'
import blogService from './services/blogs';
import Login from "./components/login/login";
import "./index.css";
import Notification from "./components/notification/notification";
import AddNewBlogForm from './components/AddNewBlogForm';


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null);
  const [notifMessage, setNotifMessage] = useState("");
  const [notifMessageStatus, setNotifMessageStatus] = useState(0);
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('user');
    if(loggedInUser)
    {
      const user = JSON.parse(loggedInUser)
      setUser(user);
      blogService.setToken(user.token);
    }
  }, [])

  const handleLogout = ()=> {
    window.localStorage.removeItem('user');
    setUser(null);
  }

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
        <AddNewBlogForm setBlogs={setBlogs} blogs={blogs} setNotifMessage={setNotifMessage} setNotifMessageStatus={setNotifMessageStatus}/>
        <div className="blogs-container">
          {
            blogs.map((blog,index) =>
            <Blog key={index} blog={blog} />
            )
          }
        </div>
      </div>
    }
    
    </div>
  )
}

export default App