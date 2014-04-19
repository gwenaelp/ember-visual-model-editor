var getTableDump = function (editorDiv, currentEditedItem, newValue) {
	var arrayValues = [];

	var arrayItems = editorDiv.find(".editable");

	editorDiv.find(".editable").each(function(arrayItem) {
		if(currentEditedItem !== undefined && currentEditedItem == this)
			arrayValues.push(newValue);
		else
			arrayValues.push(this.innerHTML);
	});

	return arrayValues;
}