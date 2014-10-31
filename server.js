/**
 * @requires express package
 * @requires stylus  package
 * @requires morgon  package
 * @requires mongoose package 
 */
var express  = require('express'),
	stylus   = require('stylus'),
	morgan   = require('morgan'),
	mongoose = require('mongoose');

// set environment mode value for node application and default value must be development
// env value will contains process.env.NODE_ENV value or default value (development)
/**
 * environment 
 * @type {string}
 */
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// create object from express module
/**
 * initialize express object  
 * @type {object}
 */
var app = express();
	// set configuration for path of views directory
	app.set('views', __dirname + '/server/views');
	// set view engine which will used in Node Application 
	app.set('view engine', 'jade');
	// use morgan middleware to log info into terminal 
	app.use(morgan('dev'));
	// use stylus middleware
	app.use(stylus.middleware(
		{	
			// set path for source file
			src : __dirname + '/public',
			// set compile function for stylus	
			compile : function (str, path) {
				return stylus(str)
					.set('filename', path);	
			}

		}
	));
	// use express.static to enable express to look into public directory 
	// to enable route to get images , styles and javascript files 
	app.use(express.static(__dirname + '/public'));
	/**
	 * set route of Node Application [any route]
	 * 
	 * @param {object} req request object which will come from this route
	 * @param {object} res response object which will come from this route
	 */
	app.get('/partials/:partialPath', function (req, res) {

		res.render('partials/' + req.params.partialPath);
	});
	app.get('*', function(req, res) {

		res.render('index');
	});
	// set port number for Node Application
	app.listen(3030);
	
// create a message will display into console when we run server.js file	
console.log("MultiVision Application Listening on port 3030");