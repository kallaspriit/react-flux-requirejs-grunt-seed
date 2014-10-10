/** @jsx React.DOM */
define([
	'React',
	'logger',
	'components/NavigationComponent',
	'components/TodoListComponent',
	'components/TodoFormComponent',
	'components/TodoStatsComponent'
], function(React, logger, NavigationComponent, TodoListComponent, TodoFormComponent, TodoStatsComponent) {
	'use strict';
	
	var log = logger.get('RootComponent');

	return React.createClass({
		render: function () {
			log.info('render');
		
			return (
				<div>
					<h1>React Flux RequireJS Grunt - example todo list seed project</h1>
					<NavigationComponent/>
					<TodoListComponent/>
					<TodoStatsComponent/>
					<TodoFormComponent/>
				</div>
			);
		}
	});
});