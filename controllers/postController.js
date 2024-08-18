const Post = require("../models/post");


exports.getPost =  async (req, res) => {
    try {
        const allPosts = await Post.find();
        return res.status(200).send(allPosts);
    } catch (error) {
        return res.status(500).send(`Internal server error: ${error.message}`);
    }
}


exports.createPost = async (req, res) => {
    try {
        const { text } = req.body;
        let createPost = new Post({
            text
        });
        await createPost.save();
        return res.status(201).send(createPost);
    } catch (error) {
        return res.status(500).send(`Internal server error: ${error.message}`);
    }
}

exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;
        let updatedPost = await Post.findByIdAndUpdate(id, { text }, { new: true });
        if (!updatedPost) {
            return res.status(404).send("Post not found");
        }
        return res.status(200).send(updatedPost);
    } catch (error) {
        return res.status(500).send(`Internal server error: ${error.message}`);
    }
}


exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        let deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).send("Post not found");
        }
        return res.status(200).send("Post deleted successfully");
    } catch (error) {
        return res.status(500).send(`Internal server error: ${error.message}`);
    }
}