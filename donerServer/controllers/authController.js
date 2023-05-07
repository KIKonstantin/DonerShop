const validator = require('validator');
const { register, login, getAllUsers } = require('../services/authService');
const { parseError } = require('../utils/parser');

const authController = require('express').Router();

authController.get('/users', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.send(users);

    } catch (error) {
        console.error(error);
        res.status(404).json({message: 'User database is empty'});
    };
});

authController.post('/register', async(req, res) => {
    try {
        if(validator.default.isEmail(req.body.email) === false){
            throw new Error('Invalid Email Input');
        }else if (req.body.username === '' || req.body.password === ''){
            throw new Error('All fields are required');
        }else if (req.body.password !== req.body.repass) {
            throw new Error ('Passwords don\'t match');
        }else if (req.body.password.length < 6){
            throw new Error ('Password must be at least 6 characters long');
        }

        const token = await register(req.body.email, req.body.username, req.body.password);
        res.cookies('token', token);
        res.redirect('/');
    } catch (error) {
        const errors = parseError(error);
        console.error(errors);
    }
});

authController.post('/login', async (req, res) => {
    try {
        const token = await login(req.body.username, req.body.password);
        res.cookie('token', token);
        res.redirect('/'); //Redirect to home page
    } catch (error) {
        const errors = parseError(error);
        // Add errors to the body
        console.error(errors);
    }
});

authController.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});


module.exports = authController;