/**
 * @requires express Module
 * @type {object}
 */
var express = require('express');

// set environment mode value for node application and default value must be development
// env value will contains process.env.NODE_ENV value or default value (development)
/**
 * @type {string}
 */
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// create object from express module
/**
 * initialize express object  
 * @type {express object}
 */
var app = express();
	// set configuration for path of views directory
	app.set('views', __dirname + '/server/views');
	// set view engine which will used in Node Application 
	app.set('view engine', 'jade');
	/**
	 * set route of Node Application [any route]
	 * 
	 * @param {object} req request object which will come from this route
	 * @param {object} res response object which will come from this route
	 */
	app.get('*', function(req, res) {
		res.render('index');
	});
	// set port number for Node Application
	app.listen(3030);
	
// create a message will display into console when we run server.js file	
console.log("MultiVision Application Listening on port 3030");