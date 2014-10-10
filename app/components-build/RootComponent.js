/** @jsx React.DOM */
define([
	'React',
	'logviking/Logger',
	'components/TodoListComponent',
	'components/TodoFormComponent',
	'components/TodoStatsComponent'
], function(React, logger, TodoListComponent, TodoFormComponent, TodoStatsComponent) {
	'use strict';
	
	var log = logger.get('RootComponent');

	return React.createClass({
		render: function () {
			log.info('render');
		
			return (
				React.DOM.div(null, 
					React.DOM.h1(null, "React Flux RequireJS Grunt - example todo list seed project"), 
					TodoListComponent(null), 
					TodoStatsComponent(null), 
					TodoFormComponent(null)
				)
			);
		}
	});
});