const express = require("express");
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const http = require('http').Server(app);
const router = require('../server/routes/router');
const { Server } = require('socket.io');
const Comment = require('./models/chatModels');
const { v4: uuidv4 } = require('uuid');
app.use(cors({ origin: "*" }));
const io = new Server(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
app.use(express.json());
app.use(router);
// Підключення до бази даних
mongoose.connect('mongodb+srv://olevova1983:olevova1983@cluster0.qu7icj6.mongodb.net/comments', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

io.on('connection', (socket) => {
  socket.on('join', ({ chat }) => {
    socket.join(chat);
  });

  console.log('Client connected');

  socket.on('getComments', () => {
    Comment.find()
      .then((comments) => {
        socket.emit('updateComments', { comments });
      })
      .catch((error) => {
        console.error('Error retrieving comments:', error);
      });
  });

  socket.on('addComment', (comment) => {
    const { commentText, userParams } = comment;
    const { name } = userParams;

    Comment.findOne({ 'comments.user.username': name }).exec()
      .then((existingUser) => {
        let user;
        if (existingUser) {
          user = existingUser.comments.find((comment) => comment.user.username === name).user;
        } else {
          user = { id: uuidv4(), username: name };
        }

        const newComment = {
          id: Number(new Date()),
          body: commentText,
          postId: uuidv4(),
          user,
        };

        return Comment.findOneAndUpdate({}, { $push: { comments: newComment }, $inc: { total: 1 } }, { new: true }).exec();
      })
      .then((updatedComment) => {
        io.emit('newComment', updatedComment);
        return Comment.find().exec();
      })
      .then((comments) => {
        socket.emit('updateComments', { comments });
      })
      .catch((error) => {
        console.error('Error saving comment:', error);
      });
  });

 socket.on('deleteComment', (commentId) => {
  console.log(commentId);
  // Видалення коментаря та оповіщення всіх клієнтів
  Comment.findOneAndUpdate(
    { 'comments.id': commentId }, 
    { $pull: { 'comments': { 'id': commentId } } },
    { new: true }
  )
    .then((updatedComment) => {
        io.emit('newComment', updatedComment);
        return Comment.find().exec();
      })
      .then((comments) => {
        socket.emit('updateComments', { comments });
      })
      .catch((error) => {
        console.error('Error saving comment:', error);
      });
 });
  
  io.on('disconnect', () => {
    console.log('Disconnect');
  });
});
// Підключення до сервера
  http.listen(5050, () => {
  console.log('Server started on port 5050');
  });
