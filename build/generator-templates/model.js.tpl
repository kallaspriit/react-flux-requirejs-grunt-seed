define([
	'jquery',
	'logger'
], function(
	$,
	logger
) {
	'use strict';

	var log = logger.get('$(Name)Model');

	var $(Name)Model = function(info) {
		this.prop = '';

		$.extend(this, info);
	};

    return $(Name)Model;
});