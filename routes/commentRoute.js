const express = require("express")
const Comment = require("../models/comment")
const verifyToken = require("../middleware/verifyToken");
const { createComment, replyOnComment, getCommentsForPost, expandParentComment } = require("../controllers/commentController");
const { rateLimiterMiddleware } = require("../middleware/rateLimiter");
const router = express.Router()


router.post('/posts/:postId/comments',rateLimiterMiddleware, verifyToken, createComment);
 //a
router.post('/posts/:postId/comments/:commentId/reply', verifyToken,rateLimiterMiddleware, replyOnComment);

router.get('/posts/:postId/comments',verifyToken,rateLimiterMiddleware, getCommentsForPost);

router.get('/posts/:postId/comments/:commentId/expand',verifyToken,rateLimiterMiddleware, expandParentComment);

module.exports = router