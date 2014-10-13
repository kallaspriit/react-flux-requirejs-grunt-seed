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
				React.DOM.div(null, 
					React.DOM.h2(null, "UsersComponent"), 
					CheckboxWithLabelComponent({labelOn: "Yes", labelOff: "No"})
				)
			);
		}
	});
});