export const defaultsLayoutOptions = {
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
    edgeLength: undefined, // sets edge length directly in simulation
    edgeSymDiffLength: undefined, // symmetric diff edge length in simulation
    edgeJaccardLength: undefined, // jaccard edge length in simulation

    // iterations of cola algorithm; uses default values on undefined
    unconstrIter: undefined, // unconstrained initial layout iterations
    userConstIter: undefined, // initial layout iterations with user-specified constraints
    allConstIter: undefined // initial layout iterations with all constraints including non-overlap
};

function makeid(length) {
    var result = "";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function getNewData() {
    let nodeTemplate = {
        label: "RandomString",
        metaType: "ellipse",
        metaBgColor: "green",
        metaBgImage: null
    };

    let nodeIds = [makeid(6), makeid(6), makeid(6), makeid(6)];
    console.log("nodeIds", nodeIds);
    let nodes = [];
    nodeIds.forEach(function (nodeId) {
        let _temp = JSON.parse(JSON.stringify(nodeTemplate));
        _temp["id"] = nodeId;
        nodes.push(_temp);
    });

    let edges = [
        {
            id: nodeIds[0] + "-" + nodeIds[1],
            label: "Connection",
            source: nodeIds[0],
            target: nodeIds[1],
            metaBgColor: "red",
            metaLabelColor: "black"
        },
        {
            id: nodeIds[2] + "-" + nodeIds[3],
            label: "Connection",
            source: nodeIds[2],
            target: nodeIds[3],
            metaBgColor: "red",
            metaLabelColor: "black"
        }
    ];
    console.log("new nodes", nodes);
    console.log("new edges", edges);
    return [nodes, edges];
}
