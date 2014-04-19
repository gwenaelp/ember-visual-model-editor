var schema = {};

jointDiagramModel = "uml";

schema.links = [
	"Generalization",
	"Implementation",
	"Aggregation",
	"Composition"
];

schema.elements = [
	"Class",
	"Interface",
	"Package",
	"Abstract"
];

schema.properties = {
	Class: {
		name: "string",
		methods: "array",
		attributes: "array"
	},
	Abstract: {
		name: "string",
		methods: "array",
		attributes: "array"
	},
	Interface: {
		name: "string",
		methods: "array",
		attributes: "array"
	}
}