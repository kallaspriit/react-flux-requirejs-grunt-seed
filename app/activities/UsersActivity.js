define([
	'AbstractActivity',
	'components/UsersComponent',
	'logger'
], function(
	AbstractActivity,
	UsersComponent,
	logger
) {
	'use strict';
	
	var log = logger.get('UsersActivity');

	var UsersActivity = function() {
		AbstractActivity.call(this);
	};

	UsersActivity.prototype = Object.create(AbstractActivity.prototype);
	
	UsersActivity.prototype.onCreate = function(page) {
		log.info('onCreate');

		var users = [],
			count = 25,
			i;

		for (i = 0; i < count; i++) {
			users.push({
				name: 'User #' + (i + 1)
			});
		}

		this.setView(new UsersComponent({ users: users, page: page }));
	};

	/*UsersActivity.prototype.onUpdate = function(page) {
		log.info('onUpdate');

		this.setView(new UsersComponent({ page: page }));
	};*/

	UsersActivity.prototype.onDestroy = function(page) {
		log.info('onDestroy');
	};

    return UsersActivity;
});