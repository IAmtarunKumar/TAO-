const express = require("express");
const Post = require("../models/post");
const verifyToken = require("../middleware/verifyToken");
const { getPost, createPost, updatePost, deletePost } = require("../controllers/postController");
const router = express.Router();

// Get all posts
router.get("/get",verifyToken, getPost);

// Create a new post
router.post("/create",verifyToken, createPost);

// Update a post
router.patch("/update/:id",verifyToken,updatePost );

// Delete a post
router.delete("/delete/:id",verifyToken, deletePost);

module.exports = router;
