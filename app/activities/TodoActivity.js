define([
	'AbstractActivity',
	'components/TodoComponent',
	'logger'
], function(
	AbstractActivity,
	TodoComponent,
	logger
) {
	'use strict';
	
	var log = logger.get('TodoActivity');

	var TodoActivity = function() {
		AbstractActivity.call(this);
	};

	TodoActivity.prototype = Object.create(AbstractActivity.prototype);
	
	TodoActivity.prototype.onCreate = function() {
		log.info('onCreate');

		this.setView(new TodoComponent(null));
	};

	TodoActivity.prototype.onDestroy = function(page) {
		log.info('onDestroy');
	};

    return TodoActivity;
});