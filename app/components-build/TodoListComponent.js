/** @jsx React.DOM */
define([
	'React',
	'logviking/Logger',
	'src/Intent',
	'stores'
], function(React, logger, intent, stores) {
	'use strict';
	
	var log = logger.get('TodoListComponent');

	return React.createClass({

		getInitialState: function() {
			return {
				items: stores.todo.getItems()
			}
		},

		componentDidMount: function() {
			intent.on(intent.TODO_LIST_CHANGED, this.onTodoListChanged);
		},

		onTodoListChanged: function() {
			this.setState({
				items: stores.todo.getItems()
			});
		},

		render: function () {
			log.info('render');

			var itemList = this.state.items.map(function(item, index) {
				var removeTodoItem = function(e) {
					intent.emit(intent.TODO_REMOVE_ITEM, {
						index: index
					});

					e.preventDefault();
				},
				toggleTodoItem = function() {
					intent.emit(intent.TODO_TOGGLE_ITEM, {
						index: index
					});
				};

				return (
					React.DOM.div({key: index}, 
						React.DOM.input({type: "checkbox", value: "1", checked: item.isDone, onChange: toggleTodoItem}), item.text, " ", React.DOM.a({href: "#", onClick: removeTodoItem}, "[x]")
					)
				);
			});
		
			return (
				React.DOM.div(null, 
					React.DOM.h2(null, "Items"), 
					itemList
				)
			);
		}
	});
});