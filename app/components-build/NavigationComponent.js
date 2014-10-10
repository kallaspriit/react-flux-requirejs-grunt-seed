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
					React.DOM.li(null, React.DOM.a({href: "#/todo"}, "ToDo")), 
					React.DOM.li(null, React.DOM.a({href: "#/users"}, "Users")), 
					React.DOM.li(null, React.DOM.a({href: "#/users/2"}, "User")), 
					React.DOM.li(null, React.DOM.a({href: "#/foobar"}, "Foobar")), 
					React.DOM.li(null, "---"), 
					React.DOM.li(null, React.DOM.a({href: "/todo"}, "ToDo")), 
					React.DOM.li(null, React.DOM.a({href: "/users"}, "Users")), 
					React.DOM.li(null, React.DOM.a({href: "/users/2"}, "User")), 
					React.DOM.li(null, React.DOM.a({href: "/foobar"}, "Foobar")), 
					React.DOM.li(null, "---"), 
					React.DOM.li(null, Link({href: "/users/10"}, "User 10")), 
					React.DOM.li(null, Link({route: "todo"}, "ToDo route")), 
					React.DOM.li(null, Link({route: "user", id: "5"}, "User 5 route"))
				)
			);
		}
	});
});