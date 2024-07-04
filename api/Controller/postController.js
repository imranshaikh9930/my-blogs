const jwt = require("jsonwebtoken");
const fs = require("fs");
const Post = require("../model/postModel");
const uploadImageController = async(req,res)=>{
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
  
    jwt.verify(token, process.env.SECRET_KEY, (err, info) => {
      if (err) {
        return res.status(403).json({ message: "Failed to authenticate token" });
      }
  
      res.json(info);
    });
}

const updateImageController = async(req,res)=>{
    let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = `${path}.${ext}`;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;

  const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

  const { id, title, summary, content } = req.body;

  // console.log(id);
  try {
    const postDoc = await Post.findById(id);
    console.log("postDoc", postDoc);

    if (!postDoc) {
      return res.status(404).json({ error: "Post not found" });
    }

    console.log("VerifyToken", verifyToken);
    const isAuthor =
      JSON.stringify(postDoc.author) === JSON.stringify(verifyToken.id);
    if (!isAuthor) {
      return res.status(403).json({ error: "You are not the author" });
    }

    await postDoc.updateOne({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });

    res.json(postDoc);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the post" });
  }
}

const displayPosts = async(req,res)=>{
    console.log(req.body);
    res.json(
      await Post.find()
        .populate("author", ["name"])
        .sort({ createdAt: -1 })
        .limit(20)
    );
}

const displayCurrentPost = async(req,res)=>{
    const { id } = req.params;
  const currentPost = await Post.findById(id).populate("author", ["name"]);

  res.json(currentPost);
}

const deleteCurrentPost = async(req,res)=>{
    const { id } = req.params;
  const { token } = req.cookies;

  try {
    const info = jwt.verify(token, process.env.SECRET_KEY);
    const postDoc = await Post.findById(id);

    if (!postDoc) {
      return res.status(404).json({ error: "Post not found" });
    }

    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);

    if (!isAuthor) {
      return res.status(403).json({ error: "You are not the author" });
    }

    await Post.findOneAndDelete({ _id: id });

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the post" });
  }
}



module.exports = {uploadImageController,updateImageController,displayPosts,displayCurrentPost,deleteCurrentPost}