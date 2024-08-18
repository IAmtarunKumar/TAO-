const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: { type: String, required: true },
}, { timestamps: true });

const Post = mongoose.model('Post', commentSchema);
module.exports = Post