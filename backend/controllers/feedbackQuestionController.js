// controllers/feedbackQuestionController.js
const mongoose = require('mongoose');
const FeedbackQuestion = require('../models/feedbackQuestion');
const ObjectId = mongoose.Types.ObjectId;
const User = require('../models/user');

// Controller method to create a new feedback question
exports.createQuestion = async (req, res) => {
  console.log("Reached create question")
  console.log(req.body)
  try {
    console.log(req.body)
    const { questionText,selectedRoles,selectedProjects } = req.body;
    // const projects1 = projects.map(id => mongoose.Types.ObjectId(id));
    // Create a new feedback question
    const newQuestion = await FeedbackQuestion.create({ text:questionText, roles:selectedRoles, projects:selectedProjects });
    res.status(201).json({ success: true, data: newQuestion });
  } catch (error) {
    console.error('Error creating feedback question:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// Controller method to get all feedback questions
exports.getQuestions = async (req, res) => {
  try {
    const questions = await FeedbackQuestion.find().populate('answers.userId');
    const questionsWithUsernames = questions.map((question) => {
      const formattedAnswers = question.answers.map((answer) => {
        return {
          ...answer.toObject(),
          username: answer.userId.username
        };
      });
      return {
        ...question.toObject(),
        answers: formattedAnswers
      };
    });
    res.json({ data: questionsWithUsernames });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getQuestionsByUser = async (req, res) => {
  console.log("Get questions by user")
  const { role, userId, projectIds } = req.query;
  console.log(req.query)

  try {
      // Query the database to get pending feedbacks
      const xrole = role.toLowerCase();
      let pendingFeedbacks;

      pendingFeedbacks = await FeedbackQuestion.find({ roles: xrole, 'answers.userId': { $ne: userId } });
      
      // if (projectIds === undefined) {
      //     pendingFeedbacks = await FeedbackQuestion.find({ roles: xrole, 'answers.userId': { $ne: userId } });
      // } else {
      //     pendingFeedbacks = await FeedbackQuestion.find({ roles: xrole, 'answers.userId': { $ne: userId }, projects: { $in: projectIds } });
      // }

      // Query the database to get submitted feedbacks
      let submittedFeedbacks;

      submittedFeedbacks = await FeedbackQuestion.find({ roles: xrole, 'answers.userId': userId });

      // if (projectIds === undefined) {
      //     submittedFeedbacks = await FeedbackQuestion.find({ roles: xrole, 'answers.userId': userId });
      // } else {
      //     submittedFeedbacks = await FeedbackQuestion.find({ roles: xrole, 'answers.userId': userId, projects: { $in: projectIds } });
      // }

      // Send both pending and submitted feedbacks in the response
      console.log(pendingFeedbacks)
      console.log(submittedFeedbacks)
      res.status(200).json({ pendingFeedbacks, submittedFeedbacks });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

// exports.getQuestionsByUser = async (req, res) => {
//   console.log("get")
//   const { role, projectIds } = req.query; 
//   console.log(role)
//   console.log(projectIds)
//   // var feedbacks;
//   try {
//     // Query the database with a filter for the presence of the role in the roles array
//     let pendingFeedbacks;
//     let submittedFeedbacks;

//     // Query the database to get pending feedbacks
//     if (projectIds === undefined) {
//       pendingFeedbacks = await FeedbackQuestion.find({ status: 'pending', roles: role });
//     } else {
//       pendingFeedbacks = await FeedbackQuestion.find({ status: 'pending', roles: role, projects: { $in: projectIds } });
//     }

//     // Query the database to get submitted feedbacks
//     if (projectIds === undefined) {
//       submittedFeedbacks = await FeedbackQuestion.find({ status: 'submitted', roles: role });
//     } else {
//       submittedFeedbacks = await FeedbackQuestion.find({ status: 'submitted', roles: role, projects: { $in: projectIds } });
//     }

//     // Send both pending and submitted feedbacks in the response
//     res.status(200).json({ pendingFeedbacks, submittedFeedbacks });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// Controller method to get a single feedback question by ID
exports.getQuestionById = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the feedback question by ID
    const question = await FeedbackQuestion.findById(id);
    if (!question) {
      return res.status(404).json({ success: false, error: 'Question not found' });
    }
    res.status(200).json({ success: true, data: question });
  } catch (error) {
    console.error('Error fetching feedback question:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// Controller method to update a feedback question by ID
exports.updateQuestionById = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the feedback question by ID and update it
    const updatedQuestion = await FeedbackQuestion.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedQuestion) {
      return res.status(404).json({ success: false, error: 'Question not found' });
    }
    res.status(200).json({ success: true, data: updatedQuestion });
  } catch (error) {
    console.error('Error updating feedback question:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// Controller method to delete a feedback question by ID
exports.deleteQuestionById = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the feedback question by ID and delete it
    const deletedQuestion = await FeedbackQuestion.findByIdAndDelete(id);
    if (!deletedQuestion) {
      return res.status(404).json({ success: false, error: 'Question not found' });
    }
    res.status(200).json({ success: true, data: deletedQuestion });
  } catch (error) {
    console.error('Error deleting feedback question:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
