
$( document ).ready(function() {
	//addElementMenu
	$("#addItemList").append('<li class="nav-header">Elements</li>');
	for (var i = 0; i < schema.elements.length; i++) {
		var elt = schema.elements[i];
		$("#addItemList").append("<li id=\"addElementBtn\" class=\"diagramMenuItem\" data-type=\"" + elt + "\"><a href=\"#\">" + elt + "</a></li>");
	};

	$("#addItemList").append('<li class="nav-header">Links</li>');
	for (var i = 0; i < schema.links.length; i++) {
		var elt = schema.links[i];
		$("#addItemList").append("<li id=\"addLinkBtn\" class=\"diagramMenuItem\" data-type=\"" + elt + "\"><a href=\"#\">" + elt + "</a></li>");
	};
});

var refreshPropertyPane = function(elt) {
	var panel = $("#propertiesTabContent");
	panel.empty();

	if(elt !== undefined) {
		var eltType = elt.type.split(".")[1];
		var eltProperties = schema.properties[eltType];
		if(eltProperties !== undefined) {
			for(key in elt) {
				// if(schema.properties
				if(eltProperties[key] !== undefined){
					addAttrtoPanel(panel, key, eltProperties[key], elt[key]);
				};
			}
			panel.find(".editable").editable({validate: callbackEditor});
		}
	}
};

var addAttrtoPanel = function(panel, name, type, value) {
	panel.append("<h3>"+ name +"</h3>");
	if(typeof value === "string") {
		panel.append('<a class="editable editable-click" id="editor-'+ name +'" data-type="text" data-role="text" style="display: inline;">'+ value +'</a>');
	} else if(typeof value === "object") {
		var editorHtml = '<div id="editor-'+ name +'"><table>';
		for (var i = 0; i < value.length; i++) {
			var arrayItem = value[i];
			editorHtml += genTableItem(i, arrayItem);
		};
		editorHtml +='</table><input type="text" class="array_addText"></input><button class="array_addButton">Add</button></div>';
		panel.append(editorHtml);
		panel.find("#editor-"+ name).find(".array_addButton").click(function(){
			var newValue = panel.find("#editor-"+ name).find(".array_addText").val();
			panel.find("#editor-"+ name).find(".array_addText").val("");
			panel.find("#editor-"+ name).find("table").append(genTableItem(i, newValue));

			var arrayValues = graph.getCell(selectedElementId).get(name);
			arrayValues.push(newValue);
			console.log(arrayValues, name);
			graph.getCell(selectedElementId).set(name, arrayValues);

			panel.find("#editor-"+ name).find("table").find(".editable").editable({validate: callbackEditor});
		});
	}
};

var genTableItem = function(id, val) {
	return '<tr><td><a class="editable" data-type="text" data-role="object"  id="arrayItem_'+ id +'">'+ val +'</a></td></tr>'
};