const Comment = require("../models/comment");




exports.createComment =  async (req, res) => {

    try {
      const { postId } = req.params;
      const {text} = req.body
      const comment = new Comment({
        postId,
        text,
        userId: req.user._id,
      });
      await comment.save();
      res.status(201).send("Comment created successfully");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }



exports.replyOnComment = async (req, res) => {
    const { postId, commentId } = req.params;
    const { text } = req.body;

    const parentComment = await Comment.findById(commentId);
    console.log("parand comment" , parentComment)
if (!parentComment) {
    return res.status(404).send('Parent comment not found' );
}

    try {
        // Create a reply
        const reply = await Comment.create({
            postId,
            userId: req.user._id,
            text,
            parentCommentId: commentId,
        });

       

        // Update the parent comment to include this reply
        const updatedParentComment = await Comment.findByIdAndUpdate(
            commentId,
            { $push: { replies: reply._id } },
            { new: true, useFindAndModify: false }
        );

       

        if (!updatedParentComment) {
            return res.status(404).send( 'Parent comment not found' );
        }

        res.status(201).send("Reply added successfully");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}



exports.getCommentsForPost = async (req, res) => {
    try {
      const { postId } = req.params;
      console.log("postid", postId)
      const comments = await Comment.find({ postId, parentCommentId: null }).sort({ createdAt: -1 });
      res.send(comments);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }


exports.expandParentComment = async (req, res) => {
    try {
      const { postId, commentId } = req.params;
      const { page = 1, pageSize = 10 } = req.query;

      console.log("req.params" , req.params)
      console.log("req.quary" , req.query)
   
      const replies = await Comment.find({ postId, parentCommentId: commentId })
        .sort({ createdAt: -1 })
        .skip((page - 1) * pageSize)
        .limit(Number(pageSize));
      res.send(replies);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  

