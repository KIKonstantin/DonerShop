const authController = require('../controllers/authController');

// TODO: create homeController, menuController and profileController

const { hasUser } = require('../middlewares/guards');

module.exports = (app) => {
    app.use('/auth', authController);
};