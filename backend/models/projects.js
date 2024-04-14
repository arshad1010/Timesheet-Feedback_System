const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  // projectId: {
  //   type: mongoose.Schema.Types.ObjectId, // Assuming you want to use ObjectId as the type for project IDs
  //   required: true,
  //   unique: true
  // },
  projectType: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  // Reference to users working on this project
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
  // You can include other fields as needed
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
