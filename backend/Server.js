const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const userRoutes = require('./routes/userRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const feedbackQuestionRoutes = require('./routes/feedbackQuestionRoutes');
const timesheetRoutes = require('./routes/timesheetRoutes');
const projectRoutes = require('./routes/projectRoutes');

const app=express()
app.use(cors())
app.use(express.json())
require('dotenv').config();


mongoose.connect("mongodb+srv://skarsu74:tYAg0Wb2MfbG7ivD@cluster0.dh3rzx1.mongodb.net/jmanDB?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("Connected to MongoDB")
})
.catch(err => console.error('Error connecting to MongoDB:', err));

app.use('/api/users', userRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/feedback-question', feedbackQuestionRoutes);
app.use('/api/timesheet', timesheetRoutes);
app.use('/api/projects', projectRoutes);

app.listen(3001, () => {
    console.log("server is running at port 3001")
})