
import express from 'express'
import enrouten from 'express-enrouten'
import session from 'express-session'
import chalk from 'chalk'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import basicAuth from 'basic-auth'
import config from 'config'
import passport from 'passport'
import { Strategy } from 'passport-nest'
import cookieParser from 'cookie-parser'

const app = express()

// Change for production apps.
// This secret is used to sign session ID cookies.
const SUPER_SECRET_KEY = 'keyboard-cat';

if (config.isDev) {
	console.log('')
	console.log(chalk.blue('––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––'))
	console.log(chalk.blue('| CONFIGURATION                                                      |'))
	console.log(chalk.blue('======================================================================'))
	console.log(config)
	console.log(chalk.blue('––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––'))
	console.log('')
}

passport.use(new Strategy({
  // Read credentials from your environment variables.
  clientID: config.nest.client_id,
  clientSecret: config.nest.client_secret
}));

/**
 * No user data is available in the Nest OAuth
 * service, just return the empty user objects.
 */
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Use native promises
mongoose.Promise = global.Promise;

// enable CORS for local development
if (config.isDev) {
	app.use((req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});
}

app.use(cookieParser(SUPER_SECRET_KEY));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(session({
  secret: SUPER_SECRET_KEY,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// route requests to controllers
app.use(enrouten({ directory: 'controllers' }))

// handle 404s
app.use((req, res, next) => { console.log("error:", __filename, "LINE_N", "404:", req.url); res.status(404).send();})

mongoose.set('debug', false); // set true to get lots of logs

mongoose.connect(config.db.c_string);


mongoose.connection.once('open', function() {
  	// we're connected to db, start express server
	app.listen(config.server.port, function () {
		console.log('info: server running...')
	});
});

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('info: Mongoose default connection open');
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('info: Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('info: Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('info: Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

process.on('SIGTERM', function() {
  console.log("info: SIGTERM");
});

process.on('exit', function() {
  console.log("info: exit");
});

