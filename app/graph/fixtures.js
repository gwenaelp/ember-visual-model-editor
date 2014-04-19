var graph = new joint.dia.Graph;
var paper;

$( document ).ready(function() {
	var options = {
		classes : 'mm-light',
		modal : true,
		isMenu: false
	};
	options.position = 'left';
	options.zposition = 'next';
	$('#mmenu').mmenu( options );

	paper = new joint.dia.Paper({
		el: $('#diagram'),
		width: "100%",
		height: 600,
		gridSize: 1,
		model: graph
	});

	initializeGraphEvents(paper, graph);
});