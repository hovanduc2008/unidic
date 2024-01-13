const asyncHandler = require('express-async-handler');
const ChatModel = require('../models/ChatModel'); // Đường dẫn tới model của bạn
const { initializeSocket } = require('../config/services/socket');

// CREATE: Gửi một tin nhắn mới
const sendMessage = asyncHandler(async (req, res) => {
  const { sender, receiver, message } = req.body;
  const chatMessage = new ChatModel({ sender, receiver, message });
  console.log('Hello')
  await chatMessage.save();
  req.io.emit('receive-message', chatMessage);
  res.status(201).json(chatMessage);
});

// READ: Lấy tất cả tin nhắn giữa hai người dùng
const getChatMessagesBetweenUsers = asyncHandler(async (req, res) => {
  const { userId1, userId2 } = req.params;
  
  // Tìm tất cả tin nhắn giữa hai người dùng dựa trên sender và receiver
  const chatMessages = await ChatModel.find({
    $or: [
      { sender: userId1, receiver: userId2 },
      { sender: userId2, receiver: userId1 },
    ],
  }).sort({ timestamp: 1 }); // Sắp xếp theo thời gian gửi
  
  res.json(chatMessages);
});

// UPDATE: Cập nhật trạng thái của một tin nhắn
const updateMessageStatus = asyncHandler(async (req, res) => {
  const { messageId } = req.params;
  const { status } = req.body;
  
  const updatedMessage = await ChatModel.findByIdAndUpdate(
    messageId,
    { status },
    { new: true }
  );
  
  if (!updatedMessage) {
    return res.status(404).json({ error: 'Message not found' });
  }
  
  res.json(updatedMessage);
});

// DELETE: Xóa một tin nhắn
const deleteMessage = asyncHandler(async (req, res) => {
  const { messageId } = req.params;
  
  const deletedMessage = await ChatModel.findByIdAndDelete(messageId);
  
  if (!deletedMessage) {
    return res.status(404).json({ error: 'Message not found' });
  }
  
  res.json({ message: 'Message deleted successfully' });
});

module.exports = {
  sendMessage,
  getChatMessagesBetweenUsers,
  updateMessageStatus,
  deleteMessage,
};
