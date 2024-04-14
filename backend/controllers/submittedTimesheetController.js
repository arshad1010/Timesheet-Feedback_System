const submittedTimesheet = require('../models/submittedTimesheet')
const Timesheet = require('../models/timesheet');


exports.submitTimesheet = async (req, res) => {

    try {
      const { startDate, userId, brows, srows } = req.body; 
  
      // Check if the Timesheet already exists for the startDate
      let timesheet = await submittedTimesheet.findOne({ startDate });

      let timesheet1 = await Timesheet.findOne({ startDate });

      if (!timesheet1) {
        // If timesheet doesn't exist, you can choose to create a new one or handle the error
        // For example, you can create a new timesheet with the startDate
        try {
          timesheet1 = new Timesheet({ startDate, users: [] });
          await timesheet1.save();
          console.log('New timesheet created successfully.');
        } catch (error) {
          console.error('Error creating new timesheet:', error);
          // Handle the error appropriately, such as returning an error response
          return res.status(500).json({ error: 'Internal server error' });
        }
      }

      const userIndex1 = timesheet1.users.findIndex(user => user.userId.toString() === userId);
      if (userIndex1 !== -1) {
        timesheet1.users[userIndex1].status="submitted";
      }

      await timesheet1.save();
  
      if (!timesheet) {
        // If Timesheet doesn't exist for the startDate, create a new one
        timesheet = new submittedTimesheet({
          startDate,
          users: [{ userId, projects: [] }] // Initialize users array with the first user
        });
      } 
       else {

            timesheet.users.push({ userId, projects: [] });
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

