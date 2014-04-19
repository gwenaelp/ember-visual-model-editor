var selectedElementId = undefined;
var startLinkElementId = undefined;

var initializeGraphEvents = function(paper, graph) {
	paper.on('cell:pointerdown', function(evt, x, y) {
		console.log("clicked on :", evt.model);
		if(schema.links.contains($('#cursor_icon').html())) {
			if(startLinkElementId === undefined) {
				startLinkElementId = evt.model.id;
			} else {

				item = new joint.shapes[jointDiagramModel][$('#cursor_icon').html()]({
					source: { id: startLinkElementId },
					target: { id: evt.model.id }
				});

				graph.addCell(item);
				startLinkElementId = undefined;
				$('#cursor_icon').html("");
			}
		} else {
			selectedElementId = evt.model.id;
			var elt = evt.model.attributes;
			if(schema.elements.contains(elt.type.split(".")[1])) {
				console.log("item is element");

				$("#selectedItemName").html(evt.model.attributes.name + "(" + evt.model.attributes.type + ")" );

				refreshPropertyPane(elt);
			} else {
				console.log("selectedElement not in element list: " + elt.type.split(".")[1]);
			}
		}
	});

	paper.on('blank:pointerdown', function(evt, x, y) {
		if(schema.elements.contains($('#cursor_icon').html()))
		{
			item = new joint.shapes[jointDiagramModel][$('#cursor_icon').html()]({
				position: { x:x  , y: y },
				size: { width: 180, height: 50 },
				name: 'New ' + $('#cursor_icon').html()
			});

			graph.addCell(item);
			$('#cursor_icon').html("");
		}

		$("#selectedItemName").html("No item selected");
		selectedElementId = undefined;
		refreshPropertyPane(undefined);
	});
};
