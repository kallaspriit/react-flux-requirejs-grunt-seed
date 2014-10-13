/** @jsx React.DOM */
define([
	'React',
	'logger'
], function(
	React,
	logger
) {
	'use strict';
	
	var log = logger.get('Users');

	return React.createClass({
		render: function () {
			log.info('render');
		
			return (
				React.DOM.div(null, "Users")
			);
		}
	});
});