const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('../middlewares/session');
const trimBody = require('../middlewares/trimBody');
const bodyParser = require('body-parser');

module.exports = (app) => {
    app.use(express.json());
    app.use(morgan('tiny'));
    app.use(cookieParser());
    app.use(session());
    app.use(trimBody('password'));
};