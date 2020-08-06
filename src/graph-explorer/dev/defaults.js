import cytoscape from "cytoscape";

export const defaultLayoutOptions = {
    name: "cola",
    animate: true, // whether to show the layout as it's running
    refresh: 1, // number of ticks per frame; higher is faster but more jerky
    maxSimulationTime: 4000, // max length in ms to run the layout
    ungrabifyWhileSimulating: false, // so you can't drag nodes during layout
    // fit: true, // on every layout reposition of nodes, fit the viewport
    padding: 30, // padding around the simulation
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    nodeDimensionsIncludeLabels: false, // whether labels should be included in determining the space used by a node

    // layout event callbacks
    ready: function () {
    }, // on layoutready
    stop: function () {
    }, // on layoutstop

    // positioning options
    randomize: false, // use random node positions at beginning of layout
    avoidOverlap: true, // if true, prevents overlap of node bounding boxes
    handleDisconnected: true, // if true, avoids disconnected components from overlapping
    convergenceThreshold: 0.01, // when the alpha value (system energy) falls below this value, the layout stops
    nodeSpacing: function (node) {
        return 10;
    }, // extra spacing around nodes
    flow: undefined, // use DAG/tree flow layout if specified, e.g. { axis: 'y', minSeparation: 30 }
    alignment: undefined, // relative alignment constraints on nodes, e.g. {vertical: [[{node: node1, offset: 0}, {node: node2, offset: 5}]], horizontal: [[{node: node3}, {node: node4}], [{node: node5}, {node: node6}]]}
    gapInequalities: undefined, // list of inequality constraints for the gap between the nodes, e.g. [{"axis":"y", "left":node1, "right":node2, "gap":25}]

    // different methods of specifying edge length
    // each can be a constant numerical value or a function like `function( edge ){ return 2; }`
    edgeLength: 200, // sets edge length directly in simulation
    edgeSymDiffLength: undefined, // symmetric diff edge length in simulation
    edgeJaccardLength: undefined, // jaccard edge length in simulation

    // iterations of cola algorithm; uses default values on undefined
    unconstrIter: undefined, // unconstrained initial layout iterations
    userConstIter: undefined, // initial layout iterations with user-specified constraints
    allConstIter: undefined // initial layout iterations with all constraints including non-overlap
};


export const defaultCytoscapeOptions = {
    boxSelectionEnabled: false,
    autounselectify: true,
    avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
    avoidOverlapPadding: 10, // extra spacing around nodes when avoidOverlap: true
    nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
    style: cytoscape
        .stylesheet()
        .selector("node")
        .style({
            label: "data(id)",
            "background-fit": "cover",
            "border-color": "#333",
            "border-width": 5,
            "border-opacity": 0.5,
            "background-color": "data(metaBgColor)",
            shape: "data(metaType)"
            // "background-image": "data(metaBgImage)"
        })
        .selector("edge")
        .style({
            "curve-style": "bezier",
            "target-arrow-shape": "triangle",
            width: 3,
            label: "data(id)",
            "line-color": "data(metaBgColor)",
            "target-arrow-color": "data(metaBgColor)",
            "text-background-opacity": 1,
            color: "#444",
            "text-background-color": "#efefef",
            "text-background-shape": "roundrectangle",
            "text-border-color": "#efefef",
            "text-border-width": 1,
            "text-border-opacity": 1,
            "edge-text-rotation": "autorotate"
        })
        .selector(".highlighted")
        .style({
            "background-color": "#61bffc",
            "line-color": "#61bffc",
            "target-arrow-color": "#61bffc",
            "transition-property":
                "background-color, line-color, target-arrow-color",
            "transition-duration": "0.5s"
        }),
    elements: {
        nodes: [],
        edges: []
    },
}
