const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("../models/user");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { getUser, registerUser, loginUser, updateUser, deleteUser } = require("../controllers/userController");

require("dotenv").config()



//get all users
router.get("/get", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/get"  ,verifyToken,getUser )





// Register a new user
router.post("/register" , registerUser)

// Login user
router.post("/login" , loginUser)

router.patch("/update/:id" ,verifyToken, updateUser)

router.delete("/delete/:id" ,verifyToken, deleteUser )


module.exports = router;
