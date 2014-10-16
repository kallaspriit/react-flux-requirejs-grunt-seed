define([
	'AbstractActivity',
	'components/$(Name)Component',
	'logger'
], function(
	AbstractActivity,
	$(Name)Component,
	logger
) {
	'use strict';

	var log = logger.get('$(Name)Activity');

	var $(Name)Activity = function() {
		AbstractActivity.call(this);
	};

	$(Name)Activity.prototype = Object.create(AbstractActivity.prototype);

	$(Name)Activity.prototype.onCreate = function() {
		log.info('onCreate');

		this.setView(new $(Name)Component(null));
	};

    return $(Name)Activity;
});