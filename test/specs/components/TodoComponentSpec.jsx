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

			app.init();

			expect(true).toEqual(true);

			var component = util.renderIntoDocument(
					<TodoComponent/>
				),
				inputs = util.scryRenderedDOMComponentsWithTag(component, 'input');

			expect(inputs.length).toEqual(4);

			debugger;
		});
	});
});