/** @jsx React.DOM */
define([
	'React',
	'logger'
], function(
	React,
	logger
) {
	'use strict';

	var log = logger.get('$(Name)Component');

	return React.createClass({
		render: function () {
			log.info('render');

			return (
				<div>$(Name)Component</div>
			);
		}
	});
});