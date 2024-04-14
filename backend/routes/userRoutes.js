const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.get('/', UserController.getUsers);
router.post('/login', UserController.loginUser);
router.post('/logout', UserController.logout);
router.post('/change-password', UserController.changePassword);
router.post('/add-user', UserController.addUser);
router.post('/forgot-password', UserController.forgotPassword);

module.exports = router;

