/** @jsx React.DOM */
define([
	'React',
	'logger',
	'intent',
	'stores'
], function(React, logger, intent, stores) {
	'use strict';
	
	var log = logger.get('TodoStatsComponent');

	return React.createClass({

		getInitialState: function() {
			return {
				done: stores.todo.getDoneCount(),
				todo: stores.todo.getTodoCount()
			}
		},

		componentDidMount: function() {
			intent.on(intent.TODO_LIST_CHANGED, this.onTodoListChanged);
		},

		onTodoListChanged: function() {
			this.setState({
				done: stores.todo.getDoneCount(),
				todo: stores.todo.getTodoCount()
			});
		},

		render: function () {
			log.info('render');
		
			return (
				<div>Done: {this.state.done}, Todo: {this.state.todo}</div>
			);
		}
	});
});