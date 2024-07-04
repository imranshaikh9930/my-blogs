import React, { useState, useEffect, useContext } from "react";
import { formatISO9075, format } from "date-fns";
import toast from "react-hot-toast";
import Comments from "../Components/Comments";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import Loader from "../Components/Loader";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [postInfo, setPostInfo] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    const getPost = async () => {
      const resp = await fetch(`http://localhost:8080/post/${id}`);
      const data = await resp.json();
      setPostInfo(data);
    };

    setTimeout(() => {
      setLoading(false);
    }, 2500);

    getPost();
  }, [id]);

  const deletePost = async () => {
    try {
      const resp = await fetch(`http://localhost:8080/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!resp.ok) {
        throw new Error(`Error: ${resp.status}`);
      }

      const data = await resp.json();
      toast.success("Post deleted  Sucessfully", {});
      // console.log(data);

      navigate("/");
    } catch (error) {
      console.error("An error occurred while deleting the post:", error);
    }
  };

  const fetchPostCmt = async () => {
    try {
      // Corrected the typo in the URL
      const resp = await fetch(`http://localhost:8080/comments/${id}`);

      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }

      const data = await resp.json();

      setComments(data);

      // console.log(data);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchPostCmt();
    
  }, [id,comments]);

  useEffect(()=>{postComment},[comments]);


  const postComment = async () => {
    const formData = new FormData();
    formData.append("comment", comment);
    formData.append("author", userInfo.name);
    formData.append("postId", postInfo._id);
    formData.append("userId", userInfo.id);
    try {
      const resp = await fetch("http://localhost:8080/create", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      // const data = await resp.json();

      const newComment = await resp.json();
      setComments((prevComments) => [...prevComments, newComment]);
      setComment(""); // C
      // window.location.reload(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="post-page">
            <h1>{postInfo.title}</h1>
            {postInfo.createdAt && (
              <time>
                Publish: {format(new Date(postInfo.createdAt), "MM/dd/yyyy")}
              </time>
            )}
            <div className="author">by @{postInfo.author?.name}</div>
            {postInfo.author && userInfo.id === postInfo.author._id && (
              <div className="edit-row">
                <NavLink className="edit-btn" to={`/edit/${postInfo._id}`}>
                  <EditIcon />
                </NavLink>
                <a className="delete-btn" onClick={deletePost}>
                  <DeleteIcon />
                </a>
              </div>
            )}
            <div className="image">
              <img src={`http://localhost:8080/${postInfo.cover}`} alt="" />
            </div>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: postInfo.content }}
            />
          </div>

          <div className="comments-section">
            <h3 className="comments-heading">Comments:</h3>
            <div className="comments-container">
              {comments?.map((c) => (
                <Comments key={c._id} c={c} post={postInfo} />
              ))}
            </div>
            <div className="write-comment-container">
              <input
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                type="text"
                placeholder="Write a comment"
                className="write-comment-input"
              /> 
              <button onClick={postComment} className="write-comment-button">
                Add Comment
              </button>
            
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PostPage;
