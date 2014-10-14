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
				React.DOM.ul(null, 
					React.DOM.li(null, Link({route: "users"}, "Users")), 
					React.DOM.li(null, Link({href: "/user/10"}, "User 10")), 
					React.DOM.li(null, Link({route: "todo"}, "ToDo route")), 
					React.DOM.li(null, Link({route: "user", id: "5"}, "User 5 route")), 
					React.DOM.li(null, Link({href: "/foobar"}, "Invalid route path"))
				)
			);
		}
	});
});