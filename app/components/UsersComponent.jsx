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

	return React.createClass({

		componentWillMount: function() {
			log.info('componentWillMount');
		},

		componentDidMount: function() {
			log.info('componentDidMount');
		},

		componentWillUnmount: function() {
			log.info('componentWillUnmount');
		},

		componentWillReceiveProps: function() {
			log.info('componentWillReceiveProps');
		},

		componentWillUpdate: function() {
			log.info('componentWillUpdate');
		},

		componentDidUpdate: function() {
			log.info('componentDidUpdate');
		},

		render: function () {
			log.info('render page #' + this.props.page);

			var page = this.props.page,
				itemsPerPage = 10,
				users = this.props.users.slice((page - 1) * itemsPerPage, page * itemsPerPage),
				pageCount = Math.ceil(this.props.users.length / itemsPerPage),
				pages = [],
				i;

			for (i = 1; i <= pageCount; i++) {
				pages.push(i);
			}
		
			return (
				<div>
					<h2>UsersComponent page {page}</h2>
					<CheckboxWithLabelComponent labelOn="Yes" labelOff="No"/>
					<ul>
						{users.map(function(user, index) {
							return (
								<li>{user.name}</li>
							)
						})}
					</ul>
					<ul>
						{pages.map(function(pageNumber, index) {
							return (
								<li><Link route="users" page={pageNumber}>Page {pageNumber}</Link></li>
							)
						})}
						<li><Link route="todo">ToDo</Link></li>
					</ul>
				</div>
			);
		}
	});
});