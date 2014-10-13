/** @jsx React.DOM */
define([
	'React',
	'logger'
], function(
	React,
	logger
) {
	'use strict';
	
	var log = logger.get('UsersComponent');

	return React.createClass({
		render: function () {
			log.info('render');
		
			return (
				<div>UsersComponent</div>
			);
		}
	});
});