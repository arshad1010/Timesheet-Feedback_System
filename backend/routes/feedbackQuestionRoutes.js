// routes/feedbackQuestionRoutes.js
const express = require('express');
const router = express.Router();
const feedbackQuestionController = require('../controllers/feedbackQuestionController');

router.post('/', feedbackQuestionController.createQuestion);
router.get('/', feedbackQuestionController.getQuestions);
router.get('/user', feedbackQuestionController.getQuestionsByUser);
router.get('/:id', feedbackQuestionController.getQuestionById); // Route to get a specific question by ID
router.put('/:id', feedbackQuestionController.updateQuestionById); // Route to update a specific question by ID
router.delete('/:id', feedbackQuestionController.deleteQuestionById); // Route to delete a specific question by ID

module.exports = router;
