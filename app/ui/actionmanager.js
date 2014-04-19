//TODO in main
var DC = {};

DC.ActionManager = {
	actions: {},
	actionsToUndo: [],
	actionsToRedo: [],

	newAction: function (name) {
		if(this.actions[name] !== undefined) {
			var actionArgs = [];

			for (var i = 1; i < arguments.length; i++) {
				actionArgs.push(arguments[i]);
			};

			var action = new DeleteAction(actionArgs);
			action.do();
			this.actionsToUndo.push(action);
			this.actionsToRedo = [];
		}
	},

	undo: function() {
		console.log("undo, list:", this.actionsToUndo);
		if(this.actionsToUndo.length >= 1) {
			var action = this.actionsToUndo[this.actionsToUndo.length - 1];
			action.undo();
			this.actionsToRedo.push(this.actionsToUndo.pop());
		}
	},

	redo: function() {
		console.log("redo, list:", this.actionsToRedo);
		if(this.actionsToRedo.length <= 1) {
			var action = this.actionsToRedo[this.actionsToRedo.length - 1];
			action.redo();
			this.actionsToUndo.push(this.actionsToRedo.pop());
		}
	}
};

var Action = function() {
    this.undo = function() {};
    this.redo = function() {};
    this.do = function() {};
};
