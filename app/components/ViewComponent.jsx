/** @jsx React.DOM */
define([
	'React',
	'logger'
], function(
	React,
	logger
) {
	'use strict';
	
	var log = logger.get('ViewComponent');

	return React.createClass({
		render: function () {
			log.info('render');
		
			return (
				<div id="view-wrap"></div>
			);
		}
	});
});