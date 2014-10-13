/** @jsx React.DOM */
define([
	'components/TodoComponent',
	'React'
], function (
	TodoComponent,
	React
) {
	'use strict';

	describe('TodoComponent', function () {
		it('works', function () {
			var util = React.addons.TestUtils,
				component = util.renderIntoDocument(
					TodoComponent(null)
				);

			expect(true).toEqual(true);
		});
	});
});