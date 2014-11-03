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

// create connection to mongodb with multivision database
// mongoose object will create multivision database if database is not exists
mongoose.connect("mongodb://localhost/multivision");
/**
 * db object refer to mongodb connection to multivision database
 * @type {object}
 */
var db = mongoose.connection;
	// create listener to log errors if happened when connect to mongodb
	db.on('error', console.error.bind(console, "connection error: ") );
	// create listener when connection to mongodb opened
	db.once('open', function callback () {

		console.log("connection to multivision database is opened");
	});
// create Schema for message , massage Schema define the shape of the message document
// i.e we define properties with properties type for message document
var messageSchema = mongoose.Schema({
	message : String
});
// create Message Model using message Schema
// Message Model will repersent Message collection
/**
 * Message Model
 * @type {object}
 */
var Message = mongoose.model('Message', messageSchema);
// create a message and save it into mongodb
var message = new Message({message : "Hello Mongo"});
/**
 * save message object as document
 * @param  {string} err   	error message if any happened when insert message document
 * @param  {object} message messgae object which refer to saved document
 */
message.save(function (err, message) {

	if (err) {
		return console.error(err);
	}
	console.log("Message object saved");
});
/**
 * saved message doecument object
 * @type {object}
 */
var savedMessageObject;
/**
* use Message Model to find one document into Message collection
* @param  {string} err   	error message if any happened when find one message document
* @param  {object} message messgae object which refer to selected document
*/
Message.findOne({},function (err, message) {

		if (err) {
			return console.error(err);
		}
		console.log(message);
		savedMessageObject = message;
});

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

		res.render('index',{
				mongoMessage : savedMessageObject.message
		});

	});
	// set port number for Node Application
	app.listen(3030);

// create a message will display into console when we run server.js file
console.log("MultiVision Application Listening on port 3030");
