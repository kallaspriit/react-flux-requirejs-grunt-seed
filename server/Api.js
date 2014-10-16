(function(context) {
	'use strict';

	var extend = require('xtend'),
		mysql = require('mysql'),
		Q = require('q'),
		Deferred = Q.defer;

	function Api() {
		this._config = {
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'api'
		};
		this._conn = null;

		this.messages = ['first', 'second'];
	}

	Api.prototype.init = function (config) {
		this._config = extend(this._config, config || {});

		this._conn = mysql.createConnection(this._config);
		this._conn.connect();

		//this._conn.end();
	};

	Api.prototype.getGetUsers = function () {
		return this._fetch('SELECT * FROM users');
	};

	Api.prototype._fetch = function(query) {
		var deferred = new Deferred();

		this._conn.query(query, function (error, rows, fields) {
			if (error) {
				throw new Error(error);
			}

			deferred.resolve(rows);
		});

		return deferred.promise;
	};

	context.exports = Api;
})(module);