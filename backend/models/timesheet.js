const mongoose = require('mongoose');

// Define the project schema
const projectSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    projectType: String,
    project: String,
    task: String,
    hours: [Number],
    total: Number
});

// Define the user schema
const userSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, default: 'pending' },
    projects: [projectSchema]
});

// Define the date schema
const dateSchema = new mongoose.Schema({
    startDate: Date,
    users: [userSchema]
});

// Create a Mongoose model using the dateSchema
const Timesheet = mongoose.model('Timesheet', dateSchema);

module.exports = Timesheet;
