const socketIo = require('socket.io');
const ChatModel = require('../../models/ChatModel');

let io;


function initializeSocket(server) {
  io = socketIo(server,{
    cors: {
      origin: "http://localhost",
      methods: ["GET", "POST"]
    }
  });
  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('send-message', async (data) => {
        try {
          const { sender, receiver, message } = data;

          console.log(data);
    
          // Lưu tin nhắn vào cơ sở dữ liệu
          const chatMessage = new ChatModel({ sender, receiver, message });
          await chatMessage.save();
    
          // Gửi tin nhắn đã lưu đến tất cả các client khác
          io.emit('receive-message', chatMessage);
        } catch (error) {
          console.error('Error saving message:', error);
        }
    });


    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
}

module.exports = {
  initializeSocket,
};