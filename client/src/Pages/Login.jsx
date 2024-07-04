import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import toast from 'react-hot-toast';
import Validate from "../Validate";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {setUserInfo} = useContext(UserContext);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
      
     if(!username){
      
      toast.error("Username is required");r
      return;
     }
     if(!password){
      toast.error("Password is required");r
      return;
     }

   
      const resp = await fetch("http://localhost:8080/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "content-type": "application/json" },
        credentials: "include",
      });
  
      if (resp.status === 200) {
        const data = await resp.json();
        // console.log(data);
        toast.success("Login Sucessfully", {})
        setUserInfo(data);
        
        navigate("/");
      }
      else{
        toast.error("invalid Credentials")
      }
    
    
  };
  return (
    <form onSubmit={handleLoginSubmit} className="login">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Login</button>
    </form>
  );
};

export default Login;
