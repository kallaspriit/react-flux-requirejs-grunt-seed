/** @jsx React.DOM */
define([
	'React',
	'logger',
	'components/LinkComponent'
], function(React, logger, Link) {
	'use strict';
	
	var log = logger.get('NavigationComponent');

	return React.createClass({
		render: function () {
			log.info('render');
		
			return (
				<ul>
					<li><Link href="/users/10">User 10</Link></li>
					<li><Link route="todo">ToDo route</Link></li>
					<li><Link route="user" id="5">User 5 route</Link></li>
					<li><Link href="/foobar">Invalid route path</Link></li>
				</ul>
			);
		}
	});
});