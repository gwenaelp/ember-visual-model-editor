
var DeleteAction = function(id) {
	this.deletedAction = undefined;
	this.id = id;

	this.do = function() {
		//FIXME keep links
		console.log("doAction");
		this.deletedAction = graph.getCell(this.id);
		graph.getCell(this.id).remove();
		console.log(this.deletedAction);
	};
	this.undo = function(){
		graph.addCell(this.deletedAction);
	};
	this.redo = function(){
		this.do();
	};
};

DeleteAction.prototype = new Action();

DC.ActionManager.actions["delete"] = DeleteAction;