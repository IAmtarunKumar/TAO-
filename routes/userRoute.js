const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("../models/user");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { getUser, registerUser, loginUser, updateUser, deleteUser } = require("../controllers/userController");

require("dotenv").config()



// get all users
// router.get("/get", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

router.get("/get"  ,verifyToken,getUser )





// Register a new user
// router.post("/register", async (req, res) => {
//   const { email, name, password } = req.body;
  
//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ email, name, password: hashedPassword });

//     await user.save();
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error("Error registering user:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });


router.post("/register" , registerUser)



// Login user
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   console.log("req.body" , req.body)
//   try {
//     const user = await User.findOne({ email });
//     console.log("user" , user)
//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }
//     console.log("user password" , user.password)

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign({ user: user }, process.env.privateKey, { expiresIn: '5h' });
//     res.status(200).json({ message: "Login successful", token });
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

router.post("./login" , loginUser)


// Update user
// router.patch("/update/:id", async (req, res) => {
//   const { id } = req.params;
//    let { email, name, password } = req.body;
//   try {
//     if(password){
//     password = await bcrypt.hash(password, 10);
//     }
//     const updatedUser = await User.findByIdAndUpdate(
//       id,
//       { email, name, password },
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({ message: "User updated successfully", updatedUser });
//   } catch (error) {
//     console.error("Error updating user:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

router.patch("/update/:id" ,verifyToken, updateUser)

// Delete user
// router.delete("/delete/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deletedUser = await User.findByIdAndDelete(id);

//     if (!deletedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({ message: "User deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

router.delete("/delete/:id" ,verifyToken, deleteUser )


module.exports = router;
