const mongoose = require('mongoose');

// Define the project schema
const projectSchema = new mongoose.Schema({
    projectType: String,
    project: String,
    task: String,
    hours: [Number],
    total: Number
});

// Define the user schema
const userSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    projects: [projectSchema]
});

// Define the date schema
const dateSchema = new mongoose.Schema({
    startDate: { 
        type: Date,
     },
    users: [userSchema]
});

// Create a Mongoose model using the dateSchema
const submittedTimesheet = mongoose.model('submittedTimesheet', dateSchema);

module.exports = submittedTimesheet;
