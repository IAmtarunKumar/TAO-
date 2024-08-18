const express = require("express")
const Comment = require("../models/comment")
const verifyToken = require("../middleware/verifyToken");
const { createComment, replyOnComment, getCommentsForPost, expandParentComment } = require("../controllers/commentController");
const router = express.Router()

router.post('/posts/:postId/comments', verifyToken, createComment);

router.post('/posts/:postId/comments/:commentId/reply', verifyToken, replyOnComment);

router.get('/posts/:postId/comments', getCommentsForPost);

router.get('/posts/:postId/comments/:commentId/expand', expandParentComment);

module.exports = router