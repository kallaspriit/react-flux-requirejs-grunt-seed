define([
	'logger'
], function(
	logger
) {
	'use strict';

	var log = logger.get('$(Name)');

	var $(Name) = function() {

	};

	$(Name).prototype.init = function() {
		log.info('init');
	};

    return $(Name);
});