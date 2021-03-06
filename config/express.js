'use strict';

/**
 * Module dependencies.
 */
let express = require('express')
let compress = require('compression')
let methodOverride = require('method-override')
let config = require('./config')
let router = express.Router() // was missing ()
let prom = require('prom-client');

module.exports = function () {
	// Initialize express app
	let app = express();

	// Setting application local variables
	app.locals.title = config.app.title;
	app.locals.description = config.app.description;
	app.locals.keywords = config.app.keywords;

	// prometheus 
	prom.collectDefaultMetrics();

	// Passing the request url to environment locals
	app.use(function (req, res, next) {
		res.locals.url = req.protocol + '://' + req.headers.host + req.url;
		next();
	});

	// Should be placed before express.static
	app.use(compress({
		filter: function (req, res) {
			return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
		},
		level: 9
	}));

	// Showing stack errors
	app.set('showStackError', true);

	// Environment dependent middleware
	app.locals.cache = 'memory';

	// Request body parsing middleware should be above methodOverride
	app.use(express.json())
	app.use(methodOverride())

	// Routes definition
	app.get('/metrics', async (req, res) => {
		try {
			res.set('Content-Type', prom.register.contentType);
			res.end(await prom.register.metrics());
		} catch (ex) {
			res.status(500).end(ex);
		}
	});
	router.use('/api/v1', require('../app/routes/message.server.routes'))
	router.use('/api/v1', require('../app/routes/health.server.routes'))
	app.use(router)

	// Assume 'not found' in the error msgs is a 404.
	app.use(function (err, req, res, next) {
		// If the error object doesn't exists
		if (!err) return next();

		// Log it
		console.error(err.stack);

		// Error page
		res.status(404).json({ message: 'Endpoint not found.' });
	});

	// Assume 501 since no middleware responded
	app.use(function (req, res) {
		res.status(501).send({
			message: 'The requested endpoint does not exists or is not implemented.'
		});
	});

	// Return Express server instance
	return app;
};
