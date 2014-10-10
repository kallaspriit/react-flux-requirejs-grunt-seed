define([
	'EventEmitter',
	'logger'
], function(EventEmitter, logger) {
	'use strict';
	
	var log = logger.get('Intent');

	var Intent = function() {
		EventEmitter.call(this);

		this._actionToMethodMap = {};
	};

	Intent.prototype = Object.create(EventEmitter.prototype);

	Intent.prototype.listen = function() {
		var argumentCount = arguments.length,
			actionName,
			actionMethod,
			i;

		// validate argument count
		if (argumentCount < 2) {
			throw new Error('Expected at least two arguments');
		} else if (argumentCount % 2 !== 0) {
			throw new Error('Expected an even number of parameters');
		}

		// extract the actions
		for (i = 0; i < arguments.length; i += 2) {
			actionName = arguments[i];
			actionMethod = arguments[i + 1];

			if (typeof actionName !== 'string') {
				throw new Error(
					'Expected a string as action name for parameter #' + i + ' but got ' + typeof actionName
				);
			} else if (typeof actionMethod !== 'function') {
				throw new Error(
					'Expected a function as action method for parameter #' + i + ' but got ' + typeof actionMethod
				);
			}

			// register the intent action name under intent object
			this[actionName] = actionName;

			// add action method to the mapping
			if (typeof this._actionToMethodMap[actionName] === 'undefined') {
				this._actionToMethodMap[actionName] = [];
			}

			this._actionToMethodMap[actionName].push(actionMethod);

			// listen for the given action and forward to the registered method
			this.on(actionName, actionMethod);
		}
	};

	Intent.prototype.emits = function(actionName) {
		this[actionName] = actionName;
	};

    return new Intent();
});