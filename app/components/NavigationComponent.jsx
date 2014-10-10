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
					<li><a href="#/todo">ToDo</a></li>
					<li><a href="#/users">Users</a></li>
					<li><a href="#/users/2">User</a></li>
					<li><a href="#/foobar">Foobar</a></li>
					<li>---</li>
					<li><a href="/todo">ToDo</a></li>
					<li><a href="/users">Users</a></li>
					<li><a href="/users/2">User</a></li>
					<li><a href="/foobar">Foobar</a></li>
					<li>---</li>
					<li><Link href="/users/10">User 10</Link></li>
					<li><Link route="todo">ToDo route</Link></li>
					<li><Link route="user" id="5">User 5 route</Link></li>
				</ul>
			);
		}
	});
});