/* global module */
module.exports = function (grunt) {
	'use strict';

	// require all the dependencies
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// set grunt config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// https://github.com/gruntjs/grunt-contrib-jshint
		jshint: {
			ui: {
				options: {
					jshintrc: '../client/.jshintrc'
				},
				src: [
					'../client/src/**/*.js',
				]
			}
		},

		// https://github.com/ericclemmons/grunt-react
		react: {
			jsx: {
				expand: true,
				cwd: '../app/components',
				src: ['**/*.jsx'],
				dest: '../app/components-build',
				ext: '.js',
				watch: true
			}
		},

		// https://github.com/gruntjs/grunt-contrib-watch
		watch: {
			jsx: {
				files: ['../app/components/**/*.jsx'],
				tasks: ['react:jsx'],
				options: {
					spawn: false,
				},
			},
		},

		// creates a local server for viewing the examples
		// https://github.com/gruntjs/grunt-contrib-connect
		connect: {
			server: {
				options: {
					hostname: 'localhost',
					port: 8080,
					base: '../app',
					keepalive: true
				}
			}
		}
	});

	// register default task
	grunt.registerTask('build', ['react:jsx', 'compress:build']);
	grunt.registerTask('jsx', ['watch:jsx']);
	grunt.registerTask('server', ['connect:server']);
	grunt.registerTask('default', ['build']);
};