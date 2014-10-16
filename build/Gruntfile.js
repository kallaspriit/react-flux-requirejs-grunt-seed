/* global module */
module.exports = function (grunt) {
	'use strict';

	var util = require('./grunt-util.js');

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
					include: ['../dist/config/config', '../dist/stores', '../dist/config/routes', '../dist/activities'],
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
			},
			// replace the requirejs additional include paths
			distPaths: {
				files: {
					'../dist/app.build.js': ['../dist/app.build.js']
				},
				options: {
					replacements: [{
						pattern: '\'../dist/config/config',
						replacement: '\'config'
					}, {
						pattern: '\'../dist/stores',
						replacement: '\'stores'
					}, {
						pattern: '\'../dist/config/routes',
						replacement: '\'routes'
					}, {
						pattern: '\'../dist/activities',
						replacement: '\'activities'
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

		// prompts the user for some information
		// https://github.com/dylang/grunt-prompt
		prompt: {
			'generate': {
				what: null,

				options: {
					questions: [{
						message: 'What should we generate?',
						config: 'prompt.generate.what',
						type: 'list',
						choices: function () {
							return [
								{value: 'activity', name: 'Activity'},
								{value: 'component', name: 'React component'},
								{value: 'store', name: 'Store'},
								{value: 'model', name: 'Model'},
								{value: 'src', name: 'Application src file'}
							];
						}
					}]
				}
			},
			'generate-activity': {
				name: '',

				options: {
					questions: [{
						message: 'Activity name ("forum-post" etc)',
						config: 'prompt.generate-activity.name',
						type: 'input'
					}]
				}
			},
			'generate-component': {
				name: '',

				options: {
					questions: [{
						message: 'Component name  ("user-list" etc)',
						config: 'prompt.generate-component.name',
						type: 'input'
					}]
				}
			},
			'generate-store': {
				name: '',

				options: {
					questions: [{
						message: 'Store name  ("forum-post" etc)',
						config: 'prompt.generate-store.name',
						type: 'input'
					}]
				}
			}
		}
	});

	// register composite tasks
	grunt.registerTask('build', [
		'react:app',
		'clean:preDist',
		'copy:dist',
		'requirejs:combined',
		'string-replace:distScript',
		'string-replace:distPaths',
		'clean:postDist'
	]);

	// lints the sourcecode for errors
	grunt.registerTask('lint', ['jshint']);

	// executes application tests
	grunt.registerTask('test', ['react', 'karma']);

	// generates documentation from code
	grunt.registerTask('doc', ['jsdoc:dist']);

	// starts a JSX compiler watch
	grunt.registerTask('jsx', ['watch:jsx']);

	// starts development version server
	grunt.registerTask('server-dev', ['connect:dev']);

	// builds the application and start production server
	grunt.registerTask('server-production', ['build', 'connect:production']);

	// default task, performs all main tasks
	grunt.registerTask('default', ['lint', 'test', 'build', 'doc']);

	// starts the generator
    grunt.registerTask('generate', ['prompt:generate', '#handle-generate']);


	// following tasks are internal and should not be called directly

	// generates a new model using a template
	grunt.registerTask('#handle-generate', '[private] Triggers selected generator', function() {
		var what = grunt.config('prompt.generate.what');

        console.log('Generating ' + what);

		switch (what) {
			case 'activity':
				grunt.task.run('prompt:generate-activity', '#handle-generate-activity');
			break;

			case 'component':
				grunt.task.run('prompt:generate-component', '#handle-generate-component');
			break;

			case 'store':
				grunt.task.run('prompt:generate-store', '#handle-generate-store');
			break;

			default:
				throw new Error('Generating "' + what + '" is not implemented');
			break;
		}
	});

	grunt.registerTask('#handle-generate-activity', '[private] Generates activity', function() {
		var activityName = grunt.config('prompt.generate-activity.name'),
			info = {
				name: activityName,
				Name: util.convertEntityName(activityName),
				naMe: util.convertCallableName(activityName),
			},
			filename = '../app/activities/' + info.Name + 'Activity.js';

		if (activityName.toLowerCase() !== activityName) {
			throw new Error('Expected lower-case name like "forum-topic" that is converted to "ForumTopicActivity"');
		}

		if (activityName.indexOf('activity') !== -1) {
			throw new Error(
				'The name should not include "activity", this is added automatically. ' +
				'Expected name like "forum-topic" that is converted to "ForumTopicActivity"'
			);
		}

		util.copyTemplate(
			'generator-templates/activity.js.tpl',
			filename,
			info
		);

		console.log('Created activity called "' + activityName + '" in "' + filename + '"');

		grunt.task.run('#generate-activities-js');
	});

	grunt.registerTask('#handle-generate-component', '[private] Generates react component', function() {
		var componentName = grunt.config('prompt.generate-component.name'),
			info = {
				name: componentName,
				Name: util.convertEntityName(componentName),
				naMe: util.convertCallableName(componentName),
			},
			filename = '../app/components/' + info.Name + 'Component.js';

		if (componentName.toLowerCase() !== componentName) {
			throw new Error('Expected lower-case name like "user-list" that is converted to "UserListComponent"');
		}

		if (componentName.indexOf('component') !== -1) {
			throw new Error(
				'The name should not include "component", this is added automatically. ' +
				'Expected name like "user-list" that is converted to "UserListActivity"'
			);
		}

		util.copyTemplate(
			'generator-templates/component.js.tpl',
			filename,
			info
		);

		console.log('Created component called "' + componentName + '" in "' + filename + '"');
	});

	grunt.registerTask('#handle-generate-store', '[private] Generates a new store', function() {
		var storeName = grunt.config('prompt.generate-store.name'),
			info = {
				name: storeName,
				Name: util.convertEntityName(storeName),
				naMe: util.convertCallableName(storeName),
				NAME: util.convertConstantName(storeName),
			},
			filename = '../app/stores/' + info.Name + 'Store.js';

		if (storeName.toLowerCase() !== storeName) {
			throw new Error('Expected lower-case name like "forum-post" that is converted to "ForumPostStore"');
		}

		if (storeName.indexOf('store') !== -1) {
			throw new Error(
				'The name should not include "store", this is added automatically. ' +
				'Expected name like "forum-post" that is converted to "ForumPostStore"'
			);
		}

		util.copyTemplate(
			'generator-templates/store.js.tpl',
			filename,
			info
		);

		console.log('Created store called "' + storeName + '" in "' + filename + '"');

		grunt.task.run('#generate-stores-js');
	});

	grunt.registerTask('#generate-activities-js', '[private] Generates activities.js', function() {
		var files = util.getFiles(
				'*Activity.js', {
					cwd: '../app/activities'
				}
			),
			classNames = [],
			includes = [],
			classes = [],
			mapping = [],
			replace;

		files.forEach(function(activityFile) {
			var className = activityFile.replace(/\.[^/.]+$/, ''),
				baseName = className.substr(0, className.length - 8),
				keyName = baseName.substr(0, 1).toLowerCase() + baseName.substr(1);

			classNames.push(className);
			includes.push('activities/' + className);
			classes.push(className);
			mapping.push(keyName + ': ' + className);
		});

		replace = {
			includes: '\t\'' + includes.join('\',\n\t\'') + '\'',
			classes: '\t' + classes.join(',\n\t'),
			mapping: '\t\t' + mapping.join(',\n\t\t')
		};

		util.copyTemplate(
			'generator-templates/activities.js.tpl',
			'../app/activities.js',
			replace
		);

		console.log('Generated activities.js (' + classNames.join(', ') + ')');
	});

	grunt.registerTask('#generate-stores-js', '[private] Generates stores.js', function() {
		var files = util.getFiles(
				'*Store.js', {
					cwd: '../app/stores'
				}
			),
			classNames = [],
			includes = [],
			classes = [],
			mapping = [],
			replace;

		files.forEach(function(activityFile) {
			var className = activityFile.replace(/\.[^/.]+$/, ''),
				baseName = className.substr(0, className.length - 5),
				keyName = baseName.substr(0, 1).toLowerCase() + baseName.substr(1);

			classNames.push(className);
			includes.push('stores/' + className);
			classes.push(className);
			mapping.push(keyName + ': new ' + className + '()');
		});

		replace = {
			includes: '\t\'' + includes.join('\',\n\t\'') + '\'',
			classes: '\t' + classes.join(',\n\t'),
			mapping: '\t\t' + mapping.join(',\n\t\t')
		};

		util.copyTemplate(
			'generator-templates/stores.js.tpl',
			'../app/stores.js',
			replace
		);

		console.log('Generated stores.js (' + classNames.join(', ') + ')');
	});
};