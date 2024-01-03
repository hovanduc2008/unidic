const mongoose = require('mongoose');

// Định nghĩa schema cho ChatModel
const chatSchema = new mongoose.Schema({
  // ID của người gửi tin nhắn
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Tham chiếu đến mô hình User nếu bạn có mô hình người dùng
    required: true
  },
  
  // ID của người nhận tin nhắn
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Tham chiếu đến mô hình User
    required: true
  },
  
  // Nội dung của tin nhắn
  message: {
    type: String,
    required: true
  },
  
  // Thời gian gửi tin nhắn
  timestamp: {
    type: Date,
    default: Date.now
  },
  
  // Trạng thái của tin nhắn (đọc, chưa đọc, v.v.)
  status: {
    type: String,
    enum: ['sent', 'delivered', 'read'],  // Có thể mở rộng thêm trạng thái khác nếu cần
    default: 'sent'
  }
});

// Tạo và xuất mô hình từ schema
const ChatModel = mongoose.model('Chat', chatSchema);

module.exports = ChatModel;
