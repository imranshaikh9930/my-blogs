const jwt = require("jsonwebtoken");
const bcrypt= require("bcrypt");
const User= require("../model/userModel");

const profileController = async(req,res)=>{
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
const registerController = async (req, res) => {
    const { name, email, password } = req.body;
  
    // console.log(name,email,password);
    try {
      const hashedPassword = await bcrypt.hash(
        password,
        Number(process.env.SALT)
      );
  
      const userDb = {
        name,
        email,
        password: hashedPassword,
      };
  
      const user = new User(userDb);
  
      await user.save();
  
      res.status(200).send({ message: "User created successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error });
    }
  };
  
  const loginController = async(req,res)=>{
      const { username, password } = req.body;
  
    console.log(username, password);
  
    if (!username || !password) {
      res.status(422).json({ error: "Please fill in all the details" });
      return;
    }
  
    try {
      const userDb = await User.findOne({ email: username }).select("+password");
  
      if (!userDb) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }
  
      const isMatch = await bcrypt.compare(password, userDb.password);
  
      if (!isMatch) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }
  
      const { password: hashedPassword, ...rest } = userDb._doc;
  
      const token = jwt.sign(
        { id: userDb._id, name: userDb.name, email: userDb.email },
        process.env.SECRET_KEY,
        { expiresIn: "1d" }
      );
  
      res.cookie("token", token);
  
      res
        .status(200)
        .send({ id: userDb._id, username: userDb.email, name: userDb.name });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  

const logoutController = (req,res)=>{
    res.cookie("token", "", { expires: new Date(0) }).json("ok");
}


module.exports = {profileController,registerController,loginController,logoutController}