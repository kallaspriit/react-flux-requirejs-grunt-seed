define([
	'jquery',
	'environment'
], function(
	$,
	environment
) {
	'use strict';
	
	return $.extend(true, {
		debug: false,

		rootComponentWrap: '#application-wrap',
		viewComponentWrap: '#view-wrap',

		router: {
			defaultRoutePath: '/',
			useHtml5Mode: false
		}
	}, environment);
});