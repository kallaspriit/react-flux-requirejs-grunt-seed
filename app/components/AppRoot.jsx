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
				<div>
					<h1>React Flux RequireJS Grunt - example todo list seed project</h1>
					<AppTodoList/>
					<AppTodoStats/>
					<AppTodoForm/>
				</div>
			);
		}
	});
});