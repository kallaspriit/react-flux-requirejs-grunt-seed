define([
], function() {
	'use strict';

	/**
	 * Logger interface.
	 *
	 * @class Logger
	 * @constructor
	 * @module Core
	 */
	var Logger = function() {
		this._components = [];
		this._levels = ['log', 'info', 'warn', 'error'];
		this._reporters = [];
		this._loggers = {};
		this._preReportersQueue = [];
	};

	/**
	 * Use this method to get the logger for a specific component.
	 *
	 * The returned logger interface has the log, info, warn and error methods and will include the component name in
	 * all requests.
	 *
	 * @method get
	 * @param {String} component Component name
	 * @returns {Object}
	 */
	Logger.prototype.get = function(component) {
		// return existing logger interface if already created
		if (typeof(this._loggers[component]) !== 'undefined') {
			return this._loggers[component];
		}

		if (this._components.indexOf(component) === -1) {
			this._components.push(component);
		}

		var logInterface = {},
			i;

		for (i = 0; i < this._levels.length; i++) {
			logInterface[this._levels[i]] = function(j) {
				this[this._levels[j]].apply(this, [component].concat(Array.prototype.slice.call(arguments, 1)));
			}.bind(this, i);
		}

		this._loggers[component] = logInterface;

		return logInterface;
	};

	/**
	 * Disables the logger and removes overhead.
	 */
	Logger.prototype.disable = function() {
		// return dummy interface from get()
		this.get = function() {
			var logInterface = {},
				i;

			for (i = 0; i < this._levels.length; i++) {
				logInterface[this._levels[i]] = function () {}; // do nothing
			}

			return logInterface;
		};
	};

	/**
	 * Registers a new log reporter.
	 *
	 * The reporter should be an object with methods called:
	 * - log
	 * - info
	 * - warn
	 * - error
	 *
	 * @method addReporter
	 * @param {Object} reporter Reporter to add
	 */
	Logger.prototype.addReporter = function(reporter) {
		this._reporters.push(reporter);

		this._reportQueuedMessages();
	};

	/**
	 * Registers a list of new log reporter.
	 *
	 * The reporter should be an object with methods called:
	 * - log
	 * - info
	 * - warn
	 * - error
	 *
	 * @method addReporters
	 * @param {Object} reporter1 First reporter to add
	 * @param {Object} [reporter2] Second reporter to add
	 * @param {Object} [reporterN] Any number of reporters can follow
	 */
	Logger.prototype.addReporters = function(/*reporter1, reporter2, reporterN*/) {
		var i;

		for (i = 0; i < arguments.length; i++) {
			this.addReporter(arguments[i]);
		}

		this._reportQueuedMessages();
	};

	/**
	 * Verbose log message.
	 *
	 * @method log
	 * @param {*} ...
	 */
	Logger.prototype.log = function(/*component, arg1, ...*/) {
		this._log.apply(this, ['log'].concat(Array.prototype.slice.call(arguments, 0)));
	};

	/**
	 * Information-level log message.
	 *
	 * @method info
	 * @param {*} ...
	 */
	Logger.prototype.info = function(/*component, arg1, ...*/) {
		this._log.apply(this, ['info'].concat(Array.prototype.slice.call(arguments, 0)));
	};

	/**
	 * Warning log message.
	 *
	 * @method warn
	 * @param {*} ...
	 */
	Logger.prototype.warn = function(/*component, arg1, ...*/) {
		this._log.apply(this, ['warn'].concat(Array.prototype.slice.call(arguments, 0)));
	};

	/**
	 * Error log message.
	 *
	 * @method error
	 * @param {*} ...
	 */
	Logger.prototype.error = function(/*component, arg1, ...*/) {
		this._log.apply(this, ['error'].concat(Array.prototype.slice.call(arguments, 0)));
	};

	/**
	 * Private method used to pass the log messages to reporters.
	 *
	 * @method _log
	 * @param {String} type Message type
	 * @param {String} component Component name
	 * @private
	 */
	Logger.prototype._log = function(type, component/*, arg1, ...*/) {
		var i;

		if (this._components.indexOf(component) === -1) {
			this._components.push(component);
		}

		if (this._reporters.length > 0) {
			for (i = 0; i < this._reporters.length; i++) {
				this._reporters[i][type].apply(
					this._reporters[i],
					Array.prototype.slice.call(arguments, 0).slice(1)
				);
			}
		} else {
			this._preReportersQueue.push(Array.prototype.slice.call(arguments, 0));
		}
	};

	/**
	 * Re-logs the queued messages that were registered when no reporters had beed added.
	 *
	 * @method _reportQueuedMessages
	 * @private
	 */
	Logger.prototype._reportQueuedMessages = function() {
		var message;

		while (this._preReportersQueue.length > 0) {
			message = this._preReportersQueue.shift();

			this._log.apply(this, message);
		}
	};

	return new Logger();
});
