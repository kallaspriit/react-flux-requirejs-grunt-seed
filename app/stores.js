define([
	'stores/TodoStore'
], function(
	TodoStore
) {
	'use strict';

	return {
		todo: new TodoStore()
	};
});