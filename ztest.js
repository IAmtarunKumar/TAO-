router.post('/posts/:postId/comments', authMiddleware, createComment);

router.get('/posts/:postId/comments', getCommentsForPost);




const Comment = require('../models/Comment');

exports.createComment = async (req, res) => {
  try {
    const { postId, text } = req.body;
    const comment = new Comment({
      postId,
      text,
      userId: req.user.id,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.replyToComment = async (req, res) => {
  try {
    const { postId, commentId, text } = req.body;
    const reply = new Comment({
      postId,
      text,
      parentCommentId: commentId,
      userId: req.user.id,
    });
    await reply.save();
    res.status(201).json(reply);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCommentsForPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId, parentCommentId: null }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.expandParentComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { page = 1, pageSize = 10 } = req.query;
    const replies = await Comment.find({ postId, parentCommentId: commentId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(Number(pageSize));
    res.json(replies);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


///////////working comment code /////////////////

const express = require("express")
const Comment = require("../models/comment")
const verifyToken = require("../middleware/verifyToken")
const router = express.Router()


router.get("/" , async(req,res)=>{
    try {
        const allComment = await Comment.find()
    } catch (error) {
        return res.status(500).send(`Internal server error ${error.message}`)
    }
})



router.post("/createComment" ,verifyToken, async (req, res) => {
    console.log("req.user" , req.user)
  try {
    const { postId, text } = req.params;
    const comment = new Comment({
      postId,
      text,
      userId: req.user._id,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})





// router.post("/replyOnComment" ,verifyToken, async (req, res) => {
//   try {
//     const { postId, commentId, text } = req.body;
//     const reply = new Comment({
//       postId,
//       text,
//       parentCommentId: commentId,
//       userId: req.user._id,
//     });
//     await reply.save();
//     res.status(201).json(reply);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// })


router.post("/replyOnComment" ,verifyToken,async (req, res) => {
    const { postId, text } = req.body;
    const { commentId } = req.body;

    const parentComment = await Comment.findById(commentId);
    console.log("parand comment" , parentComment)
if (!parentComment) {
    return res.status(404).json({ message: 'Parent comment not found' });
}

    try {
        // Create a reply
        const reply = await Comment.create({
            postId,
            userId: req.user._id,
            text,
            parentCommentId: commentId,
        });

        console.log("reply" , reply)

        // Update the parent comment to include this reply
        const updatedParentComment = await Comment.findByIdAndUpdate(
            commentId,
            { $push: { replies: reply._id } },
            { new: true, useFindAndModify: false }
        );

        console.log("update..." , updatedParentComment )

        if (!updatedParentComment) {
            return res.status(404).json({ message: 'Parent comment not found' });
        }

        res.status(201).json(reply);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}
)


 router.post("/getCommentsForPost" , async (req, res) => {
  try {
    const { postId } = req.body;
    console.log("postid", postId)
    const comments = await Comment.find({ postId, parentCommentId: null }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})



router.post("/expandParentComment" , async (req, res) => {
  try {
    const { postId, commentId } = req.body;
    // const { page = 1, pageSize = 10 } = req.query;
    let page=1 , pageSize=10
    const replies = await Comment.find({ postId, parentCommentId: commentId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(Number(pageSize));
    res.json(replies);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})


module.exports = router

/////////////end working comment code //////////