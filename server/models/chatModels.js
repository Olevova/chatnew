const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
id: String,
  comments: [
    {
      id:Number,
      body: String,
      postId: String,
      user: {
        id: String,
        username: String
      }
    }
  ],
  total: Number,
  skip: Number,
  limit: Number
});


const Comment = model('Comment', commentSchema);
module.exports = Comment;