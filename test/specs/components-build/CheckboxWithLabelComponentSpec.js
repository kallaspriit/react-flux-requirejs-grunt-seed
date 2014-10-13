/** @jsx React.DOM */
define([
	'components/CheckboxWithLabelComponent',
	'React'
], function (
	CheckboxWithLabelComponent,
	React
) {
	'use strict';

	describe('CheckboxWithLabelComponent', function () {
		it('changes the text after click', function () {
			var util = React.addons.TestUtils,
				component = util.renderIntoDocument(
					CheckboxWithLabelComponent({labelOn: "On", labelOff: "Off"})
				),
				label = util.findRenderedDOMComponentWithTag(component, 'label'),
				input = util.findRenderedDOMComponentWithTag(component, 'input');

			expect(label.getDOMNode().textContent).toEqual('Off');

			util.Simulate.change(input);

			expect(label.getDOMNode().textContent).toEqual('On');
		});
	});
});