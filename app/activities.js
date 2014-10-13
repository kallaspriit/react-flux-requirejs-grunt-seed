define([
	'activities/TodoActivity',
	'activities/UsersActivity'
], function(
	TodoActivity,
	UsersActivity
) {
	'use strict';

	return {
		todo: TodoActivity,
		users: UsersActivity
	};
});