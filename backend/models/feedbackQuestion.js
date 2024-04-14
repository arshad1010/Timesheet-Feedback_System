// models/FeedbackQuestion.js
const mongoose = require('mongoose');

const feedbackQuestionSchema = new mongoose.Schema({
  // questionId: {
  //   type: String,
  //   required: true,
  //   unique: true
  // },
  text: {
    type: String,
    required: true
  },
  // status: {
  //   type: String,
  //   default: 'pending'
  // },
  answers: [{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}],
  roles: [{
    type: String // Array of roles allowed to answer this question
  }],
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project' // Array of project IDs associated with this question
  }],
  date: {
    type: Date,
    default: Date.now
}
});

const FeedbackQuestion = mongoose.model('FeedbackQuestion', feedbackQuestionSchema);

module.exports = FeedbackQuestion;
