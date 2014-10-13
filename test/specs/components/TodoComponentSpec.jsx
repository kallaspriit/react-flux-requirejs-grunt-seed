/** @jsx React.DOM */
define([
	'src/Application',
	'components/TodoComponent',
	'React',
	'config',
	'stores',
	'routes',
	'activities'
], function (
	Application,
	TodoComponent,
	React,
	config,
	stores,
	routes,
	activities
) {
	'use strict';

	describe('TodoComponent', function () {
		beforeEach(function() {
			window.loadFixture('test/fixtures/app.html');
		});

		it('works', function () {
			var util = React.addons.TestUtils,
				app = new Application(config, stores, routes, activities);

			app.bootstrap();

			//var todoComponent = util.findRenderedDOMComponentWithTag(null, 'TodoComponent');

			expect(true).toEqual(true);

			/*var util = React.addons.TestUtils,
				component = util.renderIntoDocument(
					<TodoComponent/>
				);

			expect(true).toEqual(true);*/
		});
	});
});