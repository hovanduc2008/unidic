const asyncHandler = require('express-async-handler');
const LocationModel = require('../models/LocationModel'); // Đường dẫn tới model của bạn

// CREATE: Tạo một địa điểm mới
const createLocation = asyncHandler(async (req, res) => {
  const { name, address, coordinates, description } = req.body;
  
  // Tạo một địa điểm mới
  const location = new LocationModel({ name, address, coordinates, description });
  await location.save();
  
  res.status(201).json(location);
});

// READ: Lấy tất cả các địa điểm
const getAllLocations = asyncHandler(async (req, res) => {
  const locations = await LocationModel.find();
  res.json(locations);
});

// UPDATE: Cập nhật thông tin một địa điểm
const updateLocation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, address, coordinates, description } = req.body;
  
  const updatedLocation = await LocationModel.findByIdAndUpdate(
    id,
    { name, address, coordinates, description, updatedAt: Date.now() },
    { new: true }
  );
  
  if (!updatedLocation) {
    return res.status(404).json({ error: 'Location not found' });
  }
  
  res.json(updatedLocation);
});

// DELETE: Xóa một địa điểm
const deleteLocation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const deletedLocation = await LocationModel.findByIdAndDelete(id);
  
  if (!deletedLocation) {
    return res.status(404).json({ error: 'Location not found' });
  }
  
  res.json({ message: 'Location deleted successfully' });
});

module.exports = {
  createLocation,
  getAllLocations,
  updateLocation,
  deleteLocation,
};
