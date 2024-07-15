import React, { useState } from 'react';
import {useNavigate} from "react-router-dom"
import toast from "react-hot-toast"
import Editor from '../Components/Editor';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {

    const [content,setContent] = useState("");
    const [title,setTitle] = useState("");
    const [summary,setSummary] = useState("");
    const [files,setFiles] = useState("");
    const navigate = useNavigate();


    const createNewPost = async (e) => {
      e.preventDefault();
    
      // Ensure you have the required state variables defined
      const data = new FormData();
      data.append("content", content);
      data.append("title", title);
      data.append("summary", summary);
      
      if (files && files[0]) {
        data.append("file", files[0]);
      } else {
        console.error("No file selected");
        return;
      }
    
      try {
        const response = await fetch("https://my-blogs-xlgz.onrender.com/post", {
          method: 'POST',
          body: data,
          credentials: "include"
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const result = await response.json();
        toast.success("Post Created")
        navigate("/")
        console.log(result);
      } catch (error) {
        console.error('Error creating new post:', error);
      }
    };
    
    
  return (
    <form onSubmit = {createNewPost}>
        <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}placeholder='Title' />
        <input type="text" value={summary} onChange={(e)=>setSummary(e.target.value)}placeholder='Summary' />
        <input type="file" onChange={(e)=>setFiles(e.target.files)} />
        <Editor value={content} onChange={setContent} />
        <button style={{marginTop:"10px",padding:"10px 0px"}}>Create Post</button>
    </form>
  )
}

export default CreatePost
