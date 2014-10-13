/* global module */
module.exports = function(config) {
	'use strict';

	// enable debugging if some error occurs, removes code coverage
	var debug = false;

    config.set({
 
        // base path, that will be used to resolve files and exclude
        basePath: '../',
 
        // frameworks to use
        frameworks: ['jasmine', 'requirejs'],

        preprocessors: {
			'test/**/*.html': ['html2js']
		},

        // list of files / patterns to load in the browser
        files: [
			// we need some shims for example bind()
			{pattern: 'test/shim/**/*.js', included: true, watched: true, served: true},

			// get css files, include these so they will be loaded by the time tests start
			{pattern: 'app/style/**/*.css', included: true, watched: true, served: true},

			// include jQuery
			{pattern: 'app/lib/jquery/*.js', included: true, watched: true, served: true},

			// serve the actual sources
			{pattern: 'app/**/*.js', included: false, watched: true, served: true},

			// and the specs
			{pattern: 'test/specs/**/*Spec.js', included: false, watched: true, served: true},

			// include the main test file
			{pattern: 'test/test.js', included: true, watched: true, served: true},

            // include html fixtures
			{pattern: 'test/**/*.html', included: true, watched: true, served: true},
        ],

        // test results reporter to use
        reporters: ['progress'],

		// set to a real host if accessing from another machine
		hostname: 'localhost',

        // web server port
        port: 9876,
 
        // enable / disable colors in the output (reporters and logs)
        colors: true,
 
        // level of logging
        logLevel: config.LOG_INFO,
 
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,
 
        // Start these browsers
        browsers: [
			//'PhantomJS',
			'Chrome',
			//'IE',
			//'Firefox',
			//'Safari',
			//'Opera' // does not currently work with the new blink-based Opera
		],

		// Loggers to use
		loggers: [{type: 'console'}],
 
        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,
 
        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true
    });
};