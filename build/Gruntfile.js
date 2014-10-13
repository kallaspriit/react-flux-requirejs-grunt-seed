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
			app: {
				options: {
					jshintrc: '../app/.jshintrc'
				},
				src: [
					'../app/src/**/*.js',
					'../app/models/**/*.js',
					'../app/stores/**/*.js',
					'../app/lib/reactor/**/*.js',
					'../app/app.js',
					'../app/stores.js',
					'../app/routes.js',
					'../app/activities.js'
				]
			}
		},

		// generates documentation from code
		// https://github.com/krampstudio/grunt-jsdoc
		jsdoc : {
			dist : {
				src: [
					'../app/src/**/*.js',
					'../app/models/**/*.js',
					'../app/stores/**/*.js',
					'../app/lib/reactor/**/*.js'
				],
				options: {
					destination: '../doc'
				}
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
					mainConfigFile: '../dist/app.js',
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

		// modifies files by replacing some content
		// https://github.com/erickrdch/grunt-string-replace
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
			app: {
				expand: true,
				cwd: '../app/components',
				src: ['**/*.jsx'],
				dest: '../app/components-build',
				ext: '.js'
			},
			test: {
				expand: true,
				cwd: '../test/specs/components',
				src: ['**/*.jsx'],
				dest: '../test/specs/components-build',
				ext: '.js'
			}
		},

		// https://github.com/gruntjs/grunt-contrib-watch
		watch: {
			jsx: {
				files: [
					'../app/components/**/*.jsx',
					'../test/specs/components/**/*.jsx'
				],
				tasks: ['react'],
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
		},

		// executes tests using karma test runner
		// https://github.com/karma-runner/grunt-karma
		karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
	});

	// register composite tasks
	grunt.registerTask('build', [
		'react:app',
		'clean:preDist',
		'copy:dist',
		'requirejs:combined',
		'string-replace:distScript',
		'clean:postDist'
	]);
	grunt.registerTask('lint', ['jshint']);
	grunt.registerTask('test', ['react', 'karma']);
	grunt.registerTask('doc', ['jsdoc:dist']);
	grunt.registerTask('jsx', ['watch:jsx']);
	grunt.registerTask('server-dev', ['connect:dev']);
	grunt.registerTask('server-production', ['build', 'connect:production']);
	grunt.registerTask('default', ['lint', 'test', 'build', 'doc']);
};