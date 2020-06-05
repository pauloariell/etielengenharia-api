const express = require('express');
const routes = express.Router();

const SendMailController = require('./controllers/SendMailController')

routes.post('/sendmail', SendMailController.ContactUs);


module.exports = routes;