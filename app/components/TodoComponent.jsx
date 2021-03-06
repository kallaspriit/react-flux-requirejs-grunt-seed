/** @jsx React.DOM */
define([
	'React',
	'logger',
	'components/TodoListComponent',
	'components/TodoFormComponent',
	'components/TodoStatsComponent'
], function(
	React,
	logger,
	TodoListComponent,
	TodoFormComponent,
	TodoStatsComponent
) {
	'use strict';
	
	var log = logger.get('TodoComponent');

	return React.createClass({
		render: function () {
			log.info('render');
		
			return (
				<div>
					<h1>React Flux RequireJS Grunt - example todo list seed project</h1>

					<TodoListComponent/>
					<TodoStatsComponent/>
					<TodoFormComponent/>
				</div>
			);
		}
	});
});