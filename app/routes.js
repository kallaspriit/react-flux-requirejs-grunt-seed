define([
], function(
) {
	'use strict';

	return {
		index: {
			path: '/',
			activity: 'todo'
		},
		todo: {
			path: '/todo',
			activity: 'todo'
		},
		users: {
			path: '/users',
			activity: 'users'
		},
		user: {
			path: '/users/:id',
			activity: 'userInfo'
		}
	};
});