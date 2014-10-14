define([
	'EventEmitter',
	'logger'
], function(
	EventEmitter,
	logger
) {
	'use strict';
	
	var log = logger.get('Intent');

	var Intent = function() {
		EventEmitter.call(this);

		this._actionToMethodMap = {};
		this._intents = [];
		this._intentCount = {};
	};

	Intent.prototype = Object.create(EventEmitter.prototype);

	Intent.prototype.listen = function() {
		var argumentCount = arguments.length,
			intentName,
			callbackFunction,
			i;

		// validate argument count
		if (argumentCount < 2) {
			throw new Error('Expected at least two arguments');
		} else if (argumentCount % 2 !== 0) {
			throw new Error('Expected an even number of parameters');
		}

		// extract the actions
		for (i = 0; i < arguments.length; i += 2) {
			intentName = arguments[i];
			callbackFunction = arguments[i + 1];

			if (typeof intentName !== 'string') {
				throw new Error(
					'Expected a string as action name for parameter #' + i + ' but got ' + typeof intentName
				);
			} else if (typeof callbackFunction !== 'function') {
				throw new Error(
					'Expected a function as action method for parameter #' + i + ' but got ' + typeof callbackFunction
				);
			}

			// register the intent action name under intent object
			this._registerIntent(intentName);

			// add action method to the mapping
			if (typeof this._actionToMethodMap[intentName] === 'undefined') {
				this._actionToMethodMap[intentName] = [];
			}

			this._actionToMethodMap[intentName].push(callbackFunction);

			// listen for the given action and forward to the registered method
			this.on(intentName, callbackFunction);

			log.info('added listener for ' + intentName + ' (' + this._intentCount[intentName] + ' total)');
		}
	};

	Intent.prototype.emits = function(intentName) {
		this._registerIntent(intentName);

		log.info('added emitter called ' + intentName + ' (' + this._intentCount[intentName] + ' total)');
	};

	Intent.prototype.emit = function(intent) {
		log.info('emit intent', intent);

		return EventEmitter.prototype.emit.apply(this, arguments);
	};

	Intent.prototype._registerIntent = function(intentName) {
		if (this._intents.indexOf(intentName) !== -1) {
			this._intentCount[intentName]++;

			return;
		}

		this[intentName] = intentName;
		this._intents.push(intentName);
		this._intentCount[intentName] = 1;
	};

    return new Intent();
});