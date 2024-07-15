const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const upload = multer();

require("dotenv").config();
const app = express();
const {
  registerController,
  loginController,
  profileController,
  logoutController,
} = require("./Controller/userController");
const {
  addNewCommentController,
  deleteCommentController,
  displayCommentController,
} = require("./Controller/commentController");
const {
  uploadImageController,
  updateImageController,
  deleteCurrentPost,
  displayCurrentPost,
  displayPosts,
} = require("./Controller/postController");

// Db Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDb Connected Sucessfully"))
  .catch((err) => console.log(err));

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "my-blogs-frontend2.onrender.com",
    credentials: true,
  })
);
app.use("/uploads", express.static(__dirname + "/uploads"));

const port = process.env.PORT || 3000;

app.post("/register", registerController);

app.post("/login", loginController);

app.get("/profile", profileController);

app.post("/post", uploadMiddleware.single("file"), uploadImageController);

app.put("/post", uploadMiddleware.single("file"), updateImageController);

app.delete("/delete/:id", deleteCurrentPost);

app.get("/post", displayPosts);

app.get("/post/:id", displayCurrentPost);

app.post("/logout", logoutController);

app.post("/create", upload.none(), addNewCommentController);

app.delete("/create/:id", deleteCommentController);

app.get("/comments/:postId", displayCommentController);

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
