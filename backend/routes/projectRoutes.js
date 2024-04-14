// routes/projects.js

const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Route to handle adding a new project
router.get('/', projectController.getAllProjects);
router.post('/', projectController.addProject);
router.get('/user', projectController.getProjectsByUser);

module.exports = router;
