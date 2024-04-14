const User = require('../models/user');
const Project = require('../models/projects');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email, username: user.username }, 'hgjuhg', {
      expiresIn: '1h'
    });
};

const generateRandomPassword = () => {
  const length = 8;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let newPassword = '';

  for (let i = 0; i < length; i++) {
    newPassword += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return newPassword;
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    // Generate a random temporary password
    const tempPassword = generateRandomPassword();

    // Hash the temporary password
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // Update the user's password in the database
    user.password = hashedPassword; // Update the password field with the hashed temporary password
    await user.save(); // Save the updated user document

    // Send the password reset email
    const transporter = nodemailer.createTransport({
      service: 'outlook',
      auth: {
        user: 'sathvikchowdari@jmangroup.com',
        pass: 'Jman@600113'
      }
    });

    const mailOptions = {
      from: 'sathvikchowdari@jmangroup.com',
      to: 'skarsu74@gmail.com',
      subject: 'Forgot Password',
      text: `Your temporary password is: ${tempPassword}. Please change it after logging in.
      `
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: 'Failed to send password reset email' });
      } else {
        console.log('Password reset email sent: ' + info.response);
        return res.status(200).json({ message: 'Password reset email sent successfully', user });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.addUser = async (req, res) => {
    // Implementation for user registration
    const { username, email, role, userRole } = req.body;
    console.log(req.body);
    try {
        // Check if the username already exists
        const user = await User.findOne({ email });
        if (user) {
          return res.status(400).json({ error: 'User already exists' });
        }

        const tempPassword = generateRandomPassword();

        const hashedPassword = await bcrypt.hash(tempPassword, 10);
    
        const newUser = await User.create({ username, email, role, password:hashedPassword, userRole});

        // console.log(hashedPassword);
        // console.log(user.password);
        // newUser.password = hashedPassword; 
        // console.log(user.password);
        // await newUser.save();

        const transporter = nodemailer.createTransport({
          service: 'outlook',
          auth: {
            user: 'sathvikchowdari@jmangroup.com',
            pass: 'Jman@600113'
          }
        });
    
        const mailOptions = {
          from: 'sathvikchowdari@jmangroup.com',
          to: 'skarsu74@gmail.com',
          subject: 'You have been registered !',
          text: `You were added by admin,

          Your credentials:
          Username : ${username}. 
          Email : ${email}. 
          temporary password : ${tempPassword}. 

          Please change password after logging in.
          `
        };
    
        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Failed to send password reset email' });
          } else {
            console.log('Password reset email sent: ' + info.response);
            return res.status(200).json({ message: 'Password reset email sent successfully' });
          }
        });
    
        // Generate JWT token
        const token = generateToken(newUser);
    
        // Respond with token
        res.status(201).json({ token });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    // console.log(username)
  
    try {
      // Find user by username
      const user = await User.findOne({ username });
      // console.log(user)
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      // Verify password
      //  console.log(password)
      // const hashedPassword = await bcrypt.hash("1234", 10);
      // console.log(hashedPassword);
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // Fetch projects associated with the user
      const projects = await Project.find({ users: user._id });

      const projectIds = projects.map(project => project._id);
  
      // Generate JWT token
      const token = generateToken(user);

      const userData = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        userRole: user.userRole,
        projects: projectIds
      };
      console.log(userData)
  
      // Respond with token and user data
      res.status(200).json({ token, userData: userData });
  
      // Respond with token
      // console.log("Success")
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

exports.changePassword = async (req, res) => {
  // Implementation for changing user password
  const { username, currentPassword, newPassword } = req.body;

  try {
    // Find the user by ID
    const user = await User.findOne({username});
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('Current Password:', currentPassword);
    console.log('User Password:', user.password);

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    // Respond with success message
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.logout = async (req, res) => {

};


exports.getUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    console.log("users for add project")
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};