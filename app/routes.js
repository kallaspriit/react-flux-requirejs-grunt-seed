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
			path: '/users/:page',
			activity: 'users',
			defaults: {
				page: 1
			}
		},
		user: {
			path: '/user/:id',
			activity: 'userInfo'
		}
	};
});