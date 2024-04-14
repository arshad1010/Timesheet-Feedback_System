// controllers/feedbackController.js
const Feedback = require('../models/feedback');
const FeedbackQuestion = require('../models/feedbackQuestion');
const Projects = require('../models/projects');
const feedback = require('../models/feedback')

exports.submitFeedback = async (req, res) => {
  const { questionId, answer, userId } = req.body;

  try {
      // Create a new answer object
      const newAnswer = {
          userId: userId,
          answer: answer,
          date: new Date() // Current date and time
      };

      // Update the FeedbackQuestion document with the new answer
      await FeedbackQuestion.findByIdAndUpdate(questionId, {
          $push: { answers: newAnswer } // Add the new answer to the answers array
      });

      res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

// exports.submitFeedback = async (req, res) => {
//     console.log("Ok")
//     console.log(req.body)
//   const { questionId, answer, userId } = req.body;

//   try {
//     const newFeedback = new feedback({
//       questionId,
//       content:answer,
//       userId,
//     });

//     await newFeedback.save();

//     await FeedbackQuestion.findByIdAndUpdate(questionId, { status: 'submitted' });
//     await FeedbackQuestion.findByIdAndUpdate(questionId, { answer: answer });

//     res.status(201).json({ message: 'Feedback submitted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

exports.getFeedback = async (req, res) => {
  console.log("get")
  
};

