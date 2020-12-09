require('dotenv').config();

const usersRouter = require('./routes/user.routes');
const messagesRouter = require('./routes/message.routes');
const MessageService = require('./services/message.service');

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socketIo = require('socket.io');

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/messages", messagesRouter);
app.use(cors());

const serverHttp = require('http').Server(app);


const connect = mongoose.connect(process.env.MONGO_URI)
   .then((_) => {
      console.log('Connection successful to database');
   })
   .catch((error) => {
      console.error(error);
   });

const io = socketIo(serverHttp, {
   cors: {
      origin: process.env.CLIENT_HOST,
      methods: ["GET", "POST"]
   }
});

io.on('connection', (socket) => {
   socket.on('send-message', (message) => {
      const newMessage = {
         user: message.userId,
         text: message.text,
         createdAt: new Date()
      };
      
      MessageService.save(newMessage)         
         .then(dbMessage => {
            socket.emit('read-message', dbMessage);
            socket.broadcast.emit('read-message', dbMessage);
         })
         .catch(error => {
            console.log(error);
         });      
   });
});

const server = serverHttp.listen(app.get('port'), () => {
   console.log('Server on port', app.get('port'))
});