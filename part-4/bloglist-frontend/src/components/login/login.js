import React,{ useState } from "react";
import "./login.styles.css";
import loginService  from "../../services/login.service";
import blogService from "../../services/blogs";

const Login = ({ setUser, setNotifMessage, setNotifMessageStatus}) => {
    const [username , setUserName] = useState("");
    const [password , setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        let userObj = {
            username,
            password
        };
        try {
            const result = await loginService.registerNewUser(userObj);
            
            window.localStorage.setItem('user',JSON.stringify(result));
            blogService.setToken(result.token);
            setPassword("");
            setUserName("");
            setUser(result);
            
        }catch(err){
            setNotifMessage("Wrong username or password");
            setNotifMessageStatus(-1);
            console.log(err);
        }
        setTimeout(()=> {
            setNotifMessage('');
          },5000);
    }
    
    return (
        <div className="login-form">
            <h2>Bloglist Application Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="input">
                    username: <input name="username" type="text" onChange={({target}) =>  setUserName(target.value)} required/>
                </div>
                <div className="input">
                    password: <input name="password" type="password" onChange={({target}) =>  setPassword(target.value)} required/>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;