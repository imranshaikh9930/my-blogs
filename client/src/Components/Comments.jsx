import React, { useEffect,useContext } from "react";
import { UserContext } from "../Context/UserContext";
import DeleteIcon from "@mui/icons-material/Delete";
const Comments = ({ c,  }) => {
  const { userInfo } = useContext(UserContext);

  const deleteComment = async (id) => {
    try {
      // await axios.delete(URL+"/api/comments/"+id,{withCredentials:true})
      await fetch(`https://my-blogs-baclkend.onrender.com/${id}`, {
        method: "DELETE",
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="comment-container">
      <div className="comment-header">
        <h3 className="comment-author">{c.author}</h3>
        <div className="comment-meta">
          <p>{new Date(c.updatedAt).toString().slice(0, 15)}</p>
          <p>{new Date(c.updatedAt).toString().slice(16, 24)}</p>
          {userInfo?.id === c?.userId && (
            <div className="comment-actions">
              <p
                className="delete-comment"
                onClick={() => deleteComment(c._id)}
              >
                <DeleteIcon />
              </p>
            </div>
          )}
        </div>
      </div>
      <p className="comment-content">{c.comment}</p>
    </div>
  );
};

export default Comments;
