
var callbackEditor = function(value) {
	console.log("callbackEditor type",$(this).attr("data-role"), arguments, this);
	var datatype = $(this).attr("data-role");
	if(datatype === "text") {
		var attrName = this.id.split("-")[1];
		graph.getCell(selectedElementId).set(attrName, value);
	} else if (datatype === "object") {
		var editorDiv = $(this).parent().parent().parent().parent().parent();
		var attrName = editorDiv.attr('id').split("-")[1];
		var arrayValues = getTableDump(editorDiv, this, value);

		graph.getCell(selectedElementId).set(attrName, arrayValues);
	}
	else {
		console.error("bad datatype: ", datatype);
	}
};

$(document).on('mousemove', function(e){
	$('#cursor_icon').css({
		left:  e.pageX + 10,
		top:   e.pageY + 10
	});
});

$( document ).ready(function() {
	function toggleToolsPalette() {
		if($("#mmenu").hasClass("mm-opened"))
			$("#mmenu").trigger("close");
		else
			$("#mmenu").trigger("open");
	};

	//keybindings
	Mousetrap.bind("tab", toggleToolsPalette);

	//undo redo
	$("#undoActionButton").click(function () {
		DC.ActionManager.undo();
	});
	$("#redoActionButton").click(function () {
		DC.ActionManager.redo();
	});

	//menus
	$("#loadMenu").click(function() {
		//loading diagram from LS if available
		var retrievedObject = localStorage.getItem('diagram');

		graph.fromJSON(JSON.parse(retrievedObject))
	});

	$("#saveMenu").click(function() {
		console.log("save");
		localStorage.setItem('diagram', JSON.stringify(graph.toJSON()));
	});

	//zoom
	var scaleFactor = 1.0;
	$("#zoomInButton").click(function () {
		scaleFactor += 0.1;
		paper.scale(scaleFactor, scaleFactor);
	});

	$("#zoomOutButton").click(function () {
		scaleFactor -= 0.1;
		paper.scale(scaleFactor, scaleFactor);
	});

	$("#duplicateButton").click(function () {
		if(selectedElementId !== undefined) {
			var newCell = graph.getCell(selectedElementId).clone();
			newCell.translate(10, 10);
			graph.addCell(newCell);
		}
	});

	$("#toFrontButton").click(function () {
		if(selectedElementId !== undefined)
			graph.getCell(selectedElementId).toFront();
	});

	$("#toBackButton").click(function () {
		if(selectedElementId !== undefined)
			graph.getCell(selectedElementId).toBack();
	});

	$("#deleteButton").click(function () {
		if(selectedElementId !== undefined)
			DC.ActionManager.newAction("delete", selectedElementId);
	});

	$("#exportMenu").click(function(e) {
		console.log(graph.toJSON());
	});


	$("#toggleToolsPalette").click(function() {
		toggleToolsPalette();
	});

	$("#hideToolsPalette").click(function() {
		$("#mmenu").trigger("close");
	});

	//sidebarItems
	$(".diagramMenuItem").click(function(e) {
		$(".diagramMenuItem").removeClass("active");
		$(e.target).parent().addClass("active");
		$("#cursor_icon").html($(e.target).parent().attr("data-type"));
	});

	$("#menuTabs li").click(function(e) {
		$("#menuTabs li").removeClass("active");
		$(e.target).parent().addClass("active");
		$(".sideBarTabContent").css({display: "none"});
		$("#" + $(e.target).parent().attr("data-type")).css({display: "block"});
	});

	//context menu
	context.init({preventDoubleContext: false});
	context.attach('.element', [{
		text: 'Delete',
		action: function(e){
			e.preventDefault();
			console.log('Do Something');
			console.log(arguments);
		}
	}]);

	$.fn.editable.defaults.mode = 'inline';
});