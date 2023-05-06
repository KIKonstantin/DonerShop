const validator = require('validator');
const { register, login } = require('../services/authService');
const { parseError } = require('../utils/parser');

const authController = require('express').Router();

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
        console.log('hi');

        const token = await register(req.body.email, req.body.username, req.body.password);
        res.cookies('token', token);
        res.redirect('/');
    } catch (error) {
        const errors = parseError(error);

        console.error(errors);

        res.render('register', {
            title: 'Register Page',
            errors,
            body: {
                email: req.body.email,
                username: req.body.username
            }
        });

    }
})

// TODO: write functions for /login and /logout

module.exports = authController;