/** @jsx React.DOM */
define([
	'React',
	'logger',
	'components/CheckboxWithLabelComponent'
], function(
	React,
	logger,
	CheckboxWithLabelComponent
) {
	'use strict';
	
	var log = logger.get('UsersComponent');

	return React.createClass({
		render: function () {
			log.info('render');
		
			return (
				<div>
					<h2>UsersComponent</h2>
					<CheckboxWithLabelComponent labelOn="Yes" labelOff="No"/>
				</div>
			);
		}
	});
});