import React,{useState,useEffect} from "react";
import { formatISO9075 } from "date-fns";
import { NavLink } from "react-router-dom";
import Loader from "./Components/Loader";
const Post = (post) => {
  // console.log(post);
  const [loading,setLoading] = useState(true);
  const { cover } = post.post;
  // console.log(cover);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500); // Simulate a 2-second loading time
  }, []);
  return (
    <>
    {loading ? (
     <Loader /> // Content to display while loading
    ) : (
      <div className="post">
        <div className="image">
          <NavLink to={`/post/${post.post._id}`}>
            <img src={`http://localhost:8080/${cover}`} alt="" />
          </NavLink>
        </div>
        <div className="texts">
          <NavLink to={`/post/${post.post._id}`}>
            <h2 style={{ color: "black" }}>{post.post.title}</h2>
          </NavLink>

          <p className="info">
            <a className="author">author:@{post.post.author.name}</a>
            <time>Publish Date: {formatISO9075(new Date(post.post.createdAt))}</time>
          </p>
          <p className="summary">{post.post.summary}</p>
          {/* <div className='summary' dangerouslySetInnerHTML={{__html:post.post.content}}/> */}
        </div>
      </div> // Content to display when loading is complete
    )}
  </>
   
  );
};

export default Post;
