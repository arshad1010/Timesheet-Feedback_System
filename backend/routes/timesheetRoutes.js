// routes/timesheetRoutes.js
const express = require('express');
const router = express.Router();
const timesheetController = require('../controllers/timesheetController');
const submittedTimesheetController = require('../controllers/submittedTimesheetController')

router.get('/', timesheetController.getTimesheet);
router.get('/week', timesheetController.getTimesheetByWeek);
router.post('/', timesheetController.createTimesheet);
router.post('/submit', submittedTimesheetController.submitTimesheet);
// Implement other routes for reading, updating, and deleting timesheets

module.exports = router;
