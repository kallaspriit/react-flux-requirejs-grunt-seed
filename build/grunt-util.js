/* global module */
(function(module) {
	'use strict';

	var fs = require('fs'),
		glob = require('glob'),
		mkdirp = require('mkdirp');

	module.exports = {
		createDirectory: function(directory) {
			return mkdirp.sync(directory);
		},
		fileExists: function(filename) {
			return fs.existsSync(filename);
		},
		readFile: function(filename) {
			return fs.readFileSync(filename, 'utf-8');
		},
		writeFile: function(filename, contents) {
			var file = fs.openSync(filename, 'w');

			fs.write(file, contents);
			fs.close(file);
		},
		getFiles: function(globPattern, options) {
			return glob.sync(globPattern, options || {});
		},
		replaceInFile: function(filename, find, replace, once) {
			var contents = this.readFile(filename);

			// remove windows newlines
			contents = contents.replace(/\r/g, '');

			while (contents.indexOf(find) !== -1) {
				contents = contents.replace(find, replace);

				if (once) {
					break;
				}
			}

			this.writeFile(filename, contents);
		},
		replaceBlockInFile: function(filename, startBlock, endBlock, replace) {
			var originalContents = this.readFile(filename),
				lines = originalContents.split(/\n/),
				startLine = null,
				endLine = null,
				removeBlock,
				newContents,
				i;

			for (i = 0; i < lines.length; i++) {
				if (lines[i].indexOf(startBlock) !== -1) {
					if (startLine !== null) {
						throw new Error('Multiple start blocks "' + startBlock + '" found');
					}

					startLine = i;
				} else if (lines[i].indexOf(endBlock) !== -1) {
					if (endLine !== null) {
						throw new Error('Multiple end blocks "' + endBlock + '" found');
					}

					endLine = i;
				}
			}

			if (startLine === null) {
				throw new Error('Start block "' + startBlock + '" not found');
			}

			if (endLine === null) {
				throw new Error('End block "' + endBlock + '" not found');
			}

			removeBlock = lines.splice(startLine, endLine - startLine + 1, replace);

			newContents = lines.join('\n');

			//console.log('start', startLine, 'end', endLine, removeBlock, newContents);

			this.writeFile(filename, newContents);
		},
		convertEntityName: function(name) {
			var dashPos;

			while ((dashPos = name.indexOf('-')) != -1) {
				name = name.substr(0, dashPos) + (name.substr(dashPos + 1, 1)).toUpperCase() + name.substr(dashPos + 2);
			}

			return name.substr(0, 1).toUpperCase() + name.substr(1);
		},
        convertCallableName: function(name) {
            var dashPos;

            while ((dashPos = name.indexOf('-')) != -1) {
                name = name.substr(0, dashPos) + (name.substr(dashPos + 1, 1)).toUpperCase() + name.substr(dashPos + 2);
            }

            return name;
        },
        convertConstantName: function(name) {
            return name.replace(/\-/g, '_').toUpperCase();
        },
		copyTemplate: function(from, to, replace) {
			var contents = this.readFile(from),
				key,
				token,
				value;

			for (key in replace) {
				value = replace[key];
				token = '$(' + key + ')';

				while (contents.indexOf(token) !== -1) {
					contents = contents.replace(token, value);
				}
			}

			this.writeFile(to, contents);
		},
		createTemplatedFile: function(name, type, templateFilename, dir, example) {
			var info = {
					name: name,
					Name: this.convertEntityName(name),
					naMe: this.convertCallableName(name),
					NAME: this.convertConstantName(name),
				},
				typeName = this.convertEntityName(type),
				filename = dir + '/' + info.Name + typeName + '.js';

			if (name.toLowerCase() !== name) {
				throw new Error(
					'Expected lower-case name like "' + example + '" that is converted to "' +
					info.Name + typeName + '"'
				);
			}

			if (name.indexOf(type) !== -1) {
				throw new Error(
					'The name should not include "' + type + '", this is added automatically. ' +
					'Expected name like "' + example + '" that is converted to "' +
					info.Name + typeName + '"'
				);
			}

			this.copyTemplate(
				templateFilename,
				filename,
				info
			);

			console.log('Created ' + type + ' called "' + name + '" in "' + filename + '"');
		}
	};

})(module);