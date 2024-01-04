const asyncHandler = require('express-async-handler');
const ScheduleModel = require('../models/ScheduleModel'); // Ensure the path is correct

// CREATE: Create a new schedule
const createSchedule = asyncHandler(async (req, res) => {
  const { title, description, startDate, endDate, location, createdBy } = req.body;
  
  const schedule = new ScheduleModel({ title, description, startDate, endDate, location, createdBy });
  await schedule.save();
  
  res.status(201).json(schedule);
});

// READ: Get all schedules
const getAllSchedules = asyncHandler(async (req, res) => {
  const schedules = await ScheduleModel.find().populate('createdBy');
  res.json(schedules);
});

// UPDATE: Update a schedule
const updateSchedule = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, startDate, endDate, location } = req.body;
  
  const updatedSchedule = await ScheduleModel.findByIdAndUpdate(
    id,
    { title, description, startDate, endDate, location, updatedAt: Date.now() },
    { new: true }
  );
  
  if (!updatedSchedule) {
    return res.status(404).json({ error: 'Schedule not found' });
  }
  
  res.json(updatedSchedule);
});

// DELETE: Delete a schedule
const deleteSchedule = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const deletedSchedule = await ScheduleModel.findByIdAndDelete(id);
  
  if (!deletedSchedule) {
    return res.status(404).json({ error: 'Schedule not found' });
  }
  
  res.json({ message: 'Schedule deleted successfully' });
});

module.exports = {
  createSchedule,
  getAllSchedules,
  updateSchedule,
  deleteSchedule,
};
