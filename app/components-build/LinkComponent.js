/** @jsx React.DOM */
define([
	'jquery',
	'React',
	'logger',
	'router',
	'navi'
], function($, React, logger, router, navi) {
	'use strict';
	
	var log = logger.get('LinkComponent');

	return React.createClass({

		getInitialState: function() {
			return {
				routePath: this.getRoutePath()
			}
		},

		onClick: function(e) {
			navi.go(this.state.routePath);

			e.preventDefault();
		},

		getRoutePath: function() {
			if (typeof this.props.href === 'string') {
				return this.props.href;
			} else if (typeof this.props.route === 'string') {
				var routeName = this.props.route,
					routeInfo = router.getRouteInfoByName(routeName),
					parameters = {},
					ignoreProps = ['route', 'children'],
					propName;

				if (routeInfo === null) {
					throw new Error('Route called "' + routeName + '" could not be found');
				}

				// TODO throw error if some parameter is missing

				for (propName in this.props) {
					if (ignoreProps.indexOf(propName) !== -1) {
						continue;
					}

					parameters[propName] = this.props[propName];
				}

				if (typeof routeInfo.defaults === 'object') {
					parameters = $.extend({}, routeInfo.defaults, parameters);
				}

				return router.getRoutePath(routeName, parameters);
			}
		},

		render: function () {
			var linkHref = this.state.routePath;

			if (!router.isUsingHtml5Mode()) {
				linkHref = '#' + linkHref;
			}

			log.info('render ' + linkHref);

			return (
				React.DOM.a({href: linkHref, onClick: this.onClick}, this.props.children)
			);
		}
	});
});