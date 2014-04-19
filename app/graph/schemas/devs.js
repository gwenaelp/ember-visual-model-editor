var schema = {};

jointDiagramModel = "devs";

schema.links = [];

schema.elements = [
	"Atomic"
];

schema.properties = {
	Atomic: {
		name: "string",
		inPorts: "array",
		outPorts: "array"
	}
}