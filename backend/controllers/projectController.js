// controllers/projectController.js

const Project = require('../models/projects');

exports.addProject = async (req, res) => {
    console.log("add")
    
  try {
    const { activity, name, description, startDate, endDate, users } = req.body;
    console.log(users)

    // Create a new project instance
    const newProject = new Project({
      projectType: activity,
      name,
      description,
      startDate,
      endDate,
      users
    });

    // Save the new project to the database
    const savedProject = await newProject.save();

    res.status(201).json(savedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllProjects = async (req, res) => {
  console.log("reached get all projects")
  try {
      const projects = await Project.find();
      res.status(200).json(projects);
  } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getProjectsByUser = async (req, res) => {
  const { userId } = req.query;
  console.log("reached get all projects")
  try {
      const projects = await Project.find({users : userId});
      res.status(200).json(projects);
  } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};