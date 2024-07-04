const Comment = require("../model/commentModel");
const addNewCommentController = async(req,res)=>{
try {
    const newComment = new Comment(req.body); // Ensure 'new' keyword is used
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({
      message: "An error occurred while creating the comment.",
      error: error.message,
    });
  }
}

const updateCommentController = async(req,res)=>{
    try {
        const updateComment = await Comment.findByIdAndUpdate(req.params.id);
        res.status(200).json(updateComment);
      } catch (error) {
        res.status(500).json(error);
      }
}

const deleteCommentController = async(req,res)=>{
    try {
        await Comment.findByIdAndDelete(req.params.id);
      } catch (error) {
        res.status(500).json(error);
      }
}

const displayCommentController = async (req,res)=>{
    try {
        const comments = await Comment.find({ postId: req.params.postId });
        res.status(200).json(comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({
          message: "An error occurred while fetching comments.",
          error: error.message,
        });
      }
}

module.exports ={addNewCommentController,updateCommentController,deleteCommentController,displayCommentController}