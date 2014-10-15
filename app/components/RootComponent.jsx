/** @jsx React.DOM */
define([
	'React',
	'logger',
	'components/NavigationComponent',
	'components/ViewComponent'
], function(
	React,
	logger,
	NavigationComponent,
	ViewComponent
) {
	'use strict';
	
	var log = logger.get('RootComponent');

	return React.createClass({
		render: function () {
			log.info('render');
		
			return (
				<div>
					<NavigationComponent/>
					<ViewComponent/>
				</div>
			);
		}
	});
});