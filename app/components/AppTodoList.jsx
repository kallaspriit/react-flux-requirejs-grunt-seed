/** @jsx React.DOM */
define([
	'React',
	'logviking/Logger',
	'src/Intent',
	'stores'
], function(React, logger, intent, stores) {
	'use strict';
	
	var log = logger.get('AppTodoListComponent');

	var AppTodoList = React.createClass({

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
					<div key={index}>
						<input type="checkbox" value="1" checked={item.isDone} onChange={toggleTodoItem}/>{item.text} <a href="#" onClick={removeTodoItem}>[x]</a>
					</div>
				);
			});
		
			return (
				<div>
					<h2>Items</h2>
					{itemList}
				</div>
			);
		}
	});
	
	return AppTodoList;
});