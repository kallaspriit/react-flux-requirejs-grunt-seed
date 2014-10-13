/** @jsx React.DOM */
define([
	'React',
	'logger'
], function(
	React,
	logger
) {
	'use strict';
	
	var log = logger.get('CheckboxWithLabelComponent');

	return React.createClass({
		getInitialState: function () {
			return {
				isChecked: false
			};
		},
		onChange: function () {
			this.setState({isChecked: !this.state.isChecked});
		},
		render: function () {
			return (
				React.DOM.label(null, 
					React.DOM.input({
						type: "checkbox", 
						checked: this.state.isChecked, 
						onChange: this.onChange}
					), 
        			this.state.isChecked ? this.props.labelOn : this.props.labelOff
				)
			);
		}
	});
});