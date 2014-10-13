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
				React.DOM.div(null, 
					React.DOM.h1(null, "React Flux RequireJS Grunt - example todo list seed project"), 
					NavigationComponent(null), 
					TodoListComponent(null), 
					TodoStatsComponent(null), 
					TodoFormComponent(null)
				)
			);
		}
	});
});