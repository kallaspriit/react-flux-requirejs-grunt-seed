define([
	'logger'
], function(logger) {
	'use strict';
	
	var log = logger.get('routes');

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
	}
});