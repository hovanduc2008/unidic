const asyncHandler = require('express-async-handler');
const CommentModel = require('../models/CommentModel'); // Đường dẫn tới model của bạn

// CREATE: Thêm mới một bình luận
const createComment = asyncHandler(async (req, res) => {
  const { userId, content, postId } = req.body;
  
  // Tạo một bình luận mới
  const comment = new CommentModel({ userId, content, postId });
  await comment.save();
  
  res.status(201).json(comment);
});

// READ: Lấy tất cả bình luận của một bài viết cụ thể
const getCommentsByPostId = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  
  // Tìm tất cả bình luận dựa trên postId
  const comments = await CommentModel.find({ postId }).sort({ createdAt: -1 }); // Sắp xếp theo thời gian tạo giảm dần
  
  res.json(comments);
});

// UPDATE: Cập nhật thông tin của một bình luận
const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { content, status } = req.body;
  
  // Tạo một đối tượng để cập nhật thông tin bình luận
  const updateData = { content, status, updatedAt: Date.now() };
  
  const updatedComment = await CommentModel.findByIdAndUpdate(commentId, updateData, { new: true });
  
  if (!updatedComment) {
    return res.status(404).json({ error: 'Comment not found' });
  }
  
  res.json(updatedComment);
});

// DELETE: Xóa một bình luận
const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  
  const deletedComment = await CommentModel.findByIdAndDelete(commentId);
  
  if (!deletedComment) {
    return res.status(404).json({ error: 'Comment not found' });
  }
  
  res.json({ message: 'Comment deleted successfully' });
});

module.exports = {
  createComment,
  getCommentsByPostId,
  updateComment,
  deleteComment,
};
