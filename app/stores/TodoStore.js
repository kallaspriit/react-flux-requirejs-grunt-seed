define([
	'logger',
	'intent',
	'models/TodoItemModel'
], function(logger, intent, TodoItemModel) {
	'use strict';
	
	var log = logger.get('TodoStore');

	var TodoStore = function() {
		log.info('create');

		this._items = [];

		// listen for some actions
		intent.listen(
			TodoStore.Action.TODO_ADD_ITEM, this.addTodoItem.bind(this),
			TodoStore.Action.TODO_REMOVE_ITEM, this.removeTodoItem.bind(this),
			TodoStore.Action.TODO_TOGGLE_ITEM, this.toggleTodoItem.bind(this)
		);

		// notify that this store emits some actions
		intent.emits(TodoStore.Action.TODO_LIST_CHANGED);
	};

	// all stores have their own prefix TODO_ etc
	TodoStore.Action = {
		TODO_ADD_ITEM: 'TODO_ADD_ITEM',
		TODO_REMOVE_ITEM: 'TODO_REMOVE_ITEM',
		TODO_TOGGLE_ITEM: 'TODO_TOGGLE_ITEM',
		TODO_LIST_CHANGED: 'TODO_LIST_CHANGED'
	};
	
	TodoStore.prototype.addTodoItem = function(info) {
		log.info('add item: ' + info.text);

		this._items.push(new TodoItemModel(info));

		intent.emit(TodoStore.Action.TODO_LIST_CHANGED);
	};

	TodoStore.prototype.removeTodoItem = function(info) {
		log.info('remove item: ' + info.index);

		this._items.splice(info.index, 1);

		intent.emit(TodoStore.Action.TODO_LIST_CHANGED);
	};

	TodoStore.prototype.toggleTodoItem = function(info) {
		log.info('toggle item: ' + info.index);

		this._items[info.index].toggleIsDone();

		intent.emit(TodoStore.Action.TODO_LIST_CHANGED);
	};

	TodoStore.prototype.getDoneCount = function() {
		return this._items.reduce(function(previousCount, item) {
			return previousCount + (item.isDone ? 1 : 0);
		}, 0);
	};

	TodoStore.prototype.getTodoCount = function() {
		return this._items.reduce(function(previousCount, item) {
			return previousCount + (item.isDone ? 0 : 1);
		}, 0);
	};

	TodoStore.prototype.getItems = function() {
		return this._items;
	};

    return TodoStore;
});