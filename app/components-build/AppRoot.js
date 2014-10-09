/** @jsx React.DOM */
define([
	'React',
	'logviking/Logger',
	'components/AppTodoList',
	'components/AppTodoForm',
	'components/AppTodoStats'
], function(React, logger, AppTodoList, AppTodoForm, AppTodoStats) {
	'use strict';
	
	var log = logger.get('AppRootComponent');

	return React.createClass({
		render: function () {
			log.info('render');
		
			return (
				React.DOM.div(null, 
					React.DOM.h1(null, "React Flux RequireJS Grunt - example todo list seed project"), 
					AppTodoList(null), 
					AppTodoStats(null), 
					AppTodoForm(null)
				)
			);
		}
	});
});