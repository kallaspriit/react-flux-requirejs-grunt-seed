(function(context) {
	'use strict';

	function Api() {
		this.messages = ['first', 'second'];
	}

	Api.prototype.getGetMessages = function () {
		return this.messages;
	};

	Api.prototype.getAddMessage = function (message) {
		this.messages.push(message);
	};

	context.exports = Api;
})(module);