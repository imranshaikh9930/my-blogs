import React,{useEffect, useState} from 'react';
import {useNavigate,useParams} from "react-router-dom"
import Editor from '../Components/Editor';
import EditIcon from '@mui/icons-material/Edit';
  
const EditPost = () => {
    const {id} = useParams();
    const [content,setContent] = useState("");
    const [title,setTitle] = useState("");
    const [summary,setSummary] = useState("");
    const [files,setFiles] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://my-blogs-xlgz.onrender.com/'+id)
          .then(response => {
            response.json().then(postInfo => {
              setTitle(postInfo.title);
              setContent(postInfo.content);
              setSummary(postInfo.summary);
              setFiles(postInfo.files);
            });
          });
      }, []);
    
      async function editPost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        if (files?.[0]) {
          data.set('file', files?.[0]);
        }
        const response = await fetch('https://my-blogs-xlgz.onrender.com/post', {
          method: 'PUT',
          body: data,
          credentials: 'include',
        });
        
        const datas = await response.json();

        toast.success("Post Edited Sucessfully", {})

       navigate("/")

        // console.log(datas);
      }

  return (
    <form onSubmit = {editPost}>
        <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}placeholder='Title' />
        <input type="text" value={summary} onChange={(e)=>setSummary(e.target.value)}placeholder='Summary' />
        <input type="file" onChange={(e)=>setFiles(e.target.files)} />
        <Editor onChange={setContent} value={content} />
        <button style={{marginTop:"10px",padding:"10px 0px"}}>Edit Post</button>
    </form>
  )
}

export default EditPost
