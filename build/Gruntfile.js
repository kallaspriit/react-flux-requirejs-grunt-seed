/* global module */
module.exports = function (grunt) {
	'use strict';

	// require all the dependencies
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// set grunt config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// validates JavaScript for errors and style
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

		// cleans directories
		// https://github.com/gruntjs/grunt-contrib-clean
		clean: {
			// remove dist directory
			preDist: {
				src: '../dist',
				options: {
					force: true
				}
			},
			// remove unneeded files after combining
			postDist: {
				src: [
					'../dist/components',
					'../dist/components-build',
					'../dist/lib',
					'../dist/models',
					'../dist/src',
					'../dist/stores',
					'../dist/app.js',
					'../dist/stores.js',
					'../dist/routes.js',
					'../dist/.jshint*'
				],
				options: {
					force: true
				}
			}
		},

		// copies the project files to the distribution directory
		copy: {
			// copies all app files to dist directory
			dist: {
				files: [{
					expand: true,
					cwd: '../app',
					src: ['**'],
					dest: '../dist',
					dot: true
				}]
			}
		},

		// generates a single file distribution version of the project
		// https://github.com/asciidisco/grunt-requirejs
		requirejs: {
			combined: {
				options: {
					baseUrl: '../dist',
					// TODO extract this from app.js?
					paths: {
						// main directories
						src: 'src',
						lib: 'lib',
						config: 'config',
						components: 'components-build',

						// library directories
						logviking: 'lib/logviking',
						reactor: 'lib/reactor',

						// specific components
						jquery: 'lib/jquery/jquery-2.1.1.min',
						React: 'lib/react/react-with-addons',
						EventEmitter: 'lib/eventemitter/EventEmitter',
						Director: 'lib/director/director',

						// shortcuts
						logger: 'lib/logviking/Logger',
						intent: 'lib/reactor/Intent'
					},
					shim: {
						jquery: {
							exports: '$'
						},
						Director: {
							exports: 'Router'
						}
					},
					name: 'src/Application',
					out: '../dist/app.build.js',
					almond: true,
					wrap: {
						//startFile: 'fragments/almond-start.frag',
						endFile: 'fragments/almond-end.frag'
					},
					optimize: 'none',
					//optimize: 'uglify2',
					generateSourceMaps: true,
					preserveLicenseComments: false
				}
			}
		},

		'string-replace': {
			distScript: {
				files: {
					'../dist/index.html': ['../dist/index.html']
				},
				options: {
					replacements: [{
						pattern: /<script.*data-main.*requirejs.*<\/script>/i,
						replacement: '<script src="app.build.js"></script>'
					}]
				}
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
					spawn: false
				}
			}
		},

		// creates a local server for viewing the examples
		// https://github.com/gruntjs/grunt-contrib-connect
		connect: {
			dev: {
				options: {
					hostname: 'localhost',
					port: 8080,
					base: '../app',
					keepalive: true
				}
			},
			production: {
				options: {
					hostname: 'localhost',
					port: 8081,
					base: '../dist',
					keepalive: true
				}
			}
		}
	});

	// register composite tasks
	grunt.registerTask('build', [
		'react:jsx',
		'clean:preDist',
		'copy:dist',
		'requirejs:combined',
		'string-replace:distScript',
		'clean:postDist'
	]);
	grunt.registerTask('jsx', ['watch:jsx']);
	grunt.registerTask('server-dev', ['connect:dev']);
	grunt.registerTask('server-production', ['build', 'connect:production']);
	grunt.registerTask('default', ['build', 'server-dev']);
};