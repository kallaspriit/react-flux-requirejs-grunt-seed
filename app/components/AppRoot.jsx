/** @jsx React.DOM */
define([
	'React',
	'logviking/Logger'
], function(React, logger) {
	'use strict';
	
	var log = logger.get('AppRootComponent');

	var AppRoot = React.createClass({
		render: function () {
			log.info('render');
		
			return (
				<h1>React Flux RequireJS Grunt - the seed project</h1>
			);
		}
	});
	
	return AppRoot;
});