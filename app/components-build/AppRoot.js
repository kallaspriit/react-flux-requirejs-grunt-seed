/** @jsx React.DOM */
define([
	'React',
	'logviking/Logger'
], function(React, logger) {
	'use strict';
	
	var log = logger.get('AppRootComponent');

	var AppRoot = React.createClass({displayName: 'AppRoot',
		render: function () {
			log.info('render');
		
			return (
				React.DOM.h1(null, "React Flux RequireJS Grunt - the seed project")
			);
		}
	});
	
	return AppRoot;
});