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

		this.setView(new UsersComponent({ page: page }));
	};

    return UsersActivity;
});