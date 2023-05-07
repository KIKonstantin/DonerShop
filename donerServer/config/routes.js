const authController = require('../controllers/authController');
const homeController = require('../controllers/homeController');
// TODO: create homeController, menuController and profileController

const { hasUser } = require('../middlewares/guards');

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
};