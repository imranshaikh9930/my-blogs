import React, { useContext, useEffect, useState } from "react";
import { useNavigate,NavLink } from "react-router-dom";
import { UserContext } from "../Context/UserContext";


const Header = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserContext);


  useEffect(() => {
    fetchProfile();
  }, [userInfo]);

  useEffect(() => {
    const username = userInfo?.email;
  }, []); 
  const fetchProfile = async () => {
    try {
      const response = await fetch("http://localhost:8080/profile", {
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      setUserInfo(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } 
  };
  const logout = async () => {
    try {
      const response = await fetch("http://localhost:8080/logout", {
        credentials: "include",
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setUserInfo(null);
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const username = userInfo?.email;

  return (
    <header>
        <NavLink to={"/"} className="logo">My Blogs</NavLink>
      <nav>
        {username ? (
          <>
            <NavLink to="/create-post">Create new post</NavLink>
            <a onClick={logout}>Logout ({userInfo.name})</a>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
