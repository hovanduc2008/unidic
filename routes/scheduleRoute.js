const express = require('express');
const router = express.Router();
const {
  createSchedule,
  getAllSchedules,
  updateSchedule,
  deleteSchedule
} = require('../controllers/scheduleController'); // Ensure the path is correct

// Routes for schedules
router.post('/create', createSchedule); // Create a new schedule
router.get('/', getAllSchedules); // Get all schedules
router.put('/update/:id', updateSchedule); // Update a schedule by ID
router.delete('/delete/:id', deleteSchedule); // Delete a schedule by ID

module.exports = router;
