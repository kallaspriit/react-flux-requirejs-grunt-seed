/** @jsx React.DOM */
define([
	'React',
	'logger',
	'components/CheckboxWithLabelComponent',
	'components/LinkComponent'
], function(
	React,
	logger,
	CheckboxWithLabelComponent,
	Link
) {
	'use strict';
	
	var log = logger.get('UsersComponent');

	var users = [],
		count = 100,
		i;

	for (i = 0; i < count; i++) {
		users.push({
			name: 'User #' + (i + 1)
		});
	}

	return React.createClass({

		render: function () {
			log.info('render page #' + this.props.page);
		
			return (
				React.DOM.div(null, 
					React.DOM.h2(null, "UsersComponent page #", this.props.page), 
					CheckboxWithLabelComponent({labelOn: "Yes", labelOff: "No"}), 
					React.DOM.ul(null, 
						React.DOM.li(null, Link({route: "users", page: "1"}, "Page 1")), 
						React.DOM.li(null, Link({route: "users", page: "2"}, "Page 2")), 
						React.DOM.li(null, Link({route: "users", page: "3"}, "Page 3"))
					)
				)
			);
		}
	});
});