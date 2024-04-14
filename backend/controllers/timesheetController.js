// controllers/timesheetController.js
const mongoose = require('mongoose');
const Timesheet = require('../models/timesheet');
const submittedTimesheet = require('../models/submittedTimesheet')

// const findOrCreateTimesheet = async (entry) => {
//   // Find a timesheet record with the same start date
//   console.log("entry")
//   console.log(entry)
//   let timesheetRecord = await Timesheet.findOne({ startDate: entry.startDate });
//   // console.log(timesheetRecord);

//   if (timesheetRecord) {
//       // Check if there is an existing project with the same project type, project name, and task
//       const existingProjectIndex = timesheetRecord.projects.findIndex(project => 
//           project.projectType === entry.projectType &&
//           project.projectName === entry.projectName &&
//           project.task === entry.task
//       );

//       if (existingProjectIndex !== -1) {
//           // Update the existing project's hours array and total
//           console.log("updated hours");
//           timesheetRecord.projects[existingProjectIndex].hours = entry.hours;
//           timesheetRecord.projects[existingProjectIndex].total = entry.total;
//       } else {
//           // Add a new project to the existing timesheet record
//           console.log("pushed new project")
//           timesheetRecord.projects.push({
//               projectType: entry.projectType,
//               projectName: entry.projectName,
//               task: entry.task,
//               hours: entry.hours,
//               total: entry.total
//           });
//       }

//       // Save the updated timesheet record
//       timesheetRecord = await timesheetRecord.save();
//   } else {
//       // Create a new timesheet record with the provided entry
//       console.log("new timesheet")
//       timesheetRecord = new Timesheet({
//           id: entry.id,
//           project: [{
//               projectType: entry.projectType,
//               projectName: entry.projectName,
//               task: entry.task,
//               hours: entry.hours,
//               total: entry.total
//           }],
//           startDate: entry.startDate,
//           endDate: entry.endDate
//       });

//       // Save the new timesheet record
//       timesheetRecord = await timesheetRecord.save();
//   }

//   return timesheetRecord;
// };

exports.createTimesheet = async (req, res) => {
    try {
      const { startDate, userId, brows, srows } = req.body; 
  
      // Check if the Timesheet already exists for the startDate
      console.log(startDate)
      let timesheet = await Timesheet.findOne({ startDate });
  
      if (!timesheet) {
        // If Timesheet doesn't exist for the startDate, create a new one
        timesheet = new Timesheet({
          startDate,
          users: [{ userId, projects: [] }] // Initialize users array with the first user
        });
      } else {
        // If Timesheet already exists, check if the user exists
        const existingUserIndex = timesheet.users.findIndex(user => user.userId.toString() === userId);

        if (existingUserIndex !== -1) {
          console.log("Popping projects")
          timesheet.users[existingUserIndex].projects = [];
          console.log(timesheet.users[existingUserIndex].projects);
            // const existingUser = timesheet.users[existingUserIndex];
            // const existingProjectIndex = existingUser.projects.findIndex(project =>
            //     project.projectType === entry.projectType &&
            //     project.project === entry.projectName &&
            //     project.task === entry.task
            // );

            // if (existingProjectIndex !== -1) {
            //     // Update the hours of the existing project
            //     timesheet.users[existingUserIndex].projects[existingProjectIndex].hours = entry.hours;
            //     timesheet.users[existingUserIndex].projects[existingProjectIndex].total = entry.total;
            // } else {
            //     // Add a new project to the existing user's projects array
            //     timesheet.users[existingUserIndex].projects.push({
            //         projectType: entry.projectType,
            //         project: entry.projectName,
            //         task: entry.task,
            //         hours: entry.hours,
            //         total: entry.total
            //     });
            // }
        } else {
            // If user doesn't exist, add a new user with empty projects array
            timesheet.users.push({ userId, projects: [] });
        }
      }
      console.log(timesheet)
  
      // Process each entry in brows (or srows, depending on your requirement)
      brows.forEach(entry => {
        // Find the user in the Timesheet
        console.log(timesheet.users[0].userId)
        console.log(userId)
        const userIndex = timesheet.users.findIndex(user => user.userId.toString() === userId);
        console.log(userIndex);
        
        // Push the new project to the user's projects array
        timesheet.users[userIndex].projects.push({
          projectType: entry.projectType,
          project: entry.projectName,
          task: entry.task,
          hours: entry.hours,
          total: entry.total
        });
      });

      srows.forEach(entry => {
        // Find the user in the Timesheet
        console.log(timesheet.users[0].userId)
        console.log(userId)
        const userIndex = timesheet.users.findIndex(user => user.userId.toString() === userId);
        console.log(userIndex);
        
        // Push the new project to the user's projects array
        timesheet.users[userIndex].projects.push({
          projectType: entry.projectType,
          project: entry.projectName,
          task: entry.task,
          hours: entry.hours,
          total: entry.total
        });
      });
  
      // Save the updated Timesheet
      await timesheet.save();
  
      res.status(201).json({ message: 'Timesheet created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  

// Implement other controller functions for reading, updating, and deleting timesheets
exports.getTimesheet = async (req, res) => {
  try {
    console.log(req.query)
      const { userId, startDate } = req.query;
      console.log(startDate)
      console.log(userId)

      // Find the timesheet for the given user ID and start date
      // const timesheet = await submittedTimesheet.find({ startDate, 'users.userId': userId.toString() });
      // Fetch timesheets based on the start date
      const timesheetsByStartDate = await submittedTimesheet.find({ startDate });

      console.log(timesheetsByStartDate)

      const timesheet = timesheetsByStartDate[0].users.filter(user => user.userId.toString() === userId);

      // Filter timesheets to include only the desired user ID
      // const timesheet = timesheetsByStartDate.filter(sheet => sheet.users.some(user => user.userId.toString() === userId));

      console.log(timesheet)

      if (!timesheet) {
          return res.status(404).json({ error: 'Timesheet not found' });
      }

      // Return the timesheet data
      res.status(200).json({ timesheet });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

const { ObjectId } = require('mongoose').Types;


exports.getTimesheetByWeek = async (req, res) => {
  try {
    const { userId, startDate } = req.query;

    console.log(userId)
    console.log(startDate)

    const timesheetData = await Timesheet.findOne({startDate})
    console.log(timesheetData)

    // Format the timesheet data into brows and srows
    const brows = [];
    const srows = [];

    if (timesheetData) {
        const user = timesheetData.users.find(user => user.userId.toString() === userId);
        console.log("user",user)
        if (user) {
            user.projects.forEach(project => {
                const row = {
                    projectType: project.projectType,
                    projectName: project.project,
                    task: project.task,
                    hours: project.hours,
                    total: project.total,
                    startDate: project.startDate,
                    endDate: project.endDate
                };

                if (project.projectType === 'BAU Activity') {
                    brows.push(row);
                } else if (project.projectType === 'Sales Activity') {
                    srows.push(row);
                }
            });
        }
    }

    // Return the formatted timesheet data
    res.status(200).json({ brows, srows });
} catch (error) {
    console.error('Error fetching timesheet data:', error);
    res.status(500).json({ error: 'Internal server error' });
}
}
