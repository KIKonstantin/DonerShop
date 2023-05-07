const homeController = require('express').Router();

homeController.get('/', (req, res) => {
    res.send('Hello world')
})

module.exports = homeController;