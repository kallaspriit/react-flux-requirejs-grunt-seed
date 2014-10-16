define([
	'logger',
	'intent'
], function(
	logger,
	intent
) {
	'use strict';

	var log = logger.get('$(Name)Store');

	var $(Name)Store = function() {
		log.info('create');

		// listen for some actions
		intent.listen(
			$(Name)Store.Action.$(NAME)_ADD_ITEM, this.add$(Name)Item.bind(this)
		);

		// notify that this store emits some actions
		intent.emits($(Name)Store.Action.$(NAME)_UPDATED);
	};

	// all stores have their own prefix TODO_ etc
	$(Name)Store.Action = $(Name)Store.prototype.Action = {
		$(NAME)_ADD_ITEM: '$(NAME)_ADD_ITEM',
		$(NAME)_UPDATED: '$(NAME)_UPDATED'
	};

	$(Name)Store.prototype.add$(Name)Item = function(info) {
		log.info('add item', info);
	};

    return $(Name)Store;
});