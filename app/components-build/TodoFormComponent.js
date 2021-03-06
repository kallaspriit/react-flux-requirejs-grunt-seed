/** @jsx React.DOM */
define([
	'React',
	'logger',
	'intent'
], function(React, logger, intent) {
	'use strict';
	
	var log = logger.get('TodoFormComponent');

	return React.createClass({

		getInitialState: function() {
			return {
				todoText: ''
			}
		},

		onTodoTextChange: function(e) {
			this.setState({
				todoText: e.target.value
			});
		},

		onAddItem: function(e) {
			log.info('add: ' + this.state.todoText);

			intent.emit(intent.TODO_ADD_ITEM, {
				text: this.state.todoText
			});

			this.setState({
				todoText: ''
			});

			e.preventDefault();
		},

		render: function () {
			log.info('render');
		
			return (
				React.DOM.form(null, 
					React.DOM.h2(null, "Add item"), 
					React.DOM.input({type: "text", placeholder: "Todo..", value: this.state.todoText, onChange: this.onTodoTextChange}), " ", React.DOM.button({onClick: this.onAddItem}, "Add")
				)
			);
		}
	});
});