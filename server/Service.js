(function(context) {
	'use strict';

	var restify = require('restify'),
		extend = require('xtend');

	function Service() {
		this._server = null;
		this._config = {
			host: 'localhost',
			port: 8080
		};
	}

	Service.prototype.addApi = function(api) {
		var argumentNames,
			functionName,
			handlerSignature;

		for (functionName in api) {
			if (typeof api[functionName] !== 'function' || functionName.substr(0, 1) === '_') {
				continue;
			}

			argumentNames = this._getFunctionArgumentNames(api[functionName]);
			handlerSignature = this._getHandlerSignature(functionName);

			this.addHandler(
				handlerSignature.name,
				handlerSignature.method,
				argumentNames,
				api[functionName],
				api
			);
		}
	};

	Service.prototype.addHandler = function(name, method, args, handler, context) {
		var route = '/' + name;

		if (args.length > 0) {
			route += '/:' + args.join('/:');
		}

		console.log('add handler for route "' + route + '"');

		this._server[method](route, function(req, res, next) {
			var args = [],
				response,
				paramName;

			for (paramName in req.params) {
				args.push(req.params[paramName]);
			}

			response = handler.apply(context || {}, args.concat([req, res]));

			console.log('handle', req.path(), req.params, response);

			res.send(response);

			// TODO add support for deferred
  			next();
		});
	};

	Service.prototype.init = function(config) {
		this._config = extend(this._config, config || {});

		this._server = restify.createServer();
		this._server.use(restify.bodyParser());

		this._server.on('uncaughtException', function (req, res, route, err) {
			console.error(err.stack);
			//process.exit(1);
		});
	};

	Service.prototype.start = function() {
		console.log('starting service server at ' + this._config.host + ':' + this._config.port);

		this._server.listen(this._config.port, this._config.host, function() {
			console.log('%s listening at %s', this._server.name, this._server.url);
		}.bind(this));
	};

	Service.prototype.getAddMessages = function (message) {
		this.messages.push(message);
	};

	Service.prototype._getFunctionArgumentNames = function(fn) {
		if (typeof fn !== 'function') {
			throw new Error('Expected a function');
		}

		var stripCommentsRegexp = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,
			argumentNamesRegexp = /([^\s,]+)/g,
			functionName = fn.toString().replace(stripCommentsRegexp, ''),
			argumentNames = functionName
				.slice(functionName.indexOf('(') + 1, functionName.indexOf(')'))
				.match(argumentNamesRegexp);

		if (argumentNames === null) {
			return [];
		}

		return argumentNames;
	};

	Service.prototype._getHandlerSignature = function(functionName) {
		var methods = ['get', 'post'],
			method = null,
			callName = null,
			i;

		for (i = 0; i < methods.length; i++) {
			if (functionName.substr(0, methods[i].length) === methods[i]) {
				method = methods[i];
				callName = functionName.substr(methods[i].length);
			}
		}

		if (method === null) {
			throw new Error(
				'Failed to extract method from "' + functionName + '", expected one of: ' + methods.join(', ')
			);
		}

		return {
			name: this._convertCallToUrlName(callName),
			method: method
		};
	};

	Service.prototype._convertCallToUrlName = function(name) {
		var urlName = '',
			sourceChar,
			lowerChar,
			i;

		for (i = 0; i < name.length; i++) {
			sourceChar = name[i];
			lowerChar = name[i].toLowerCase();

			if (lowerChar === sourceChar) {
				urlName += sourceChar;
			} else {
				if (i > 0) {
					urlName += '-';
				}

				urlName += lowerChar;
			}
		}

		return urlName;
	};

	context.exports = Service;
})(module);