import {getColorForString, getElementNameOrId} from "./utils";

export const GREMLIN_URL = "http://localhost:9600/gremlin";


/*
Over rider the keys: content, select
 */
export const defaultMenuItemConfig = {
    fillColor: 'rgba(52,52,52,0.75)', // optional: custom background color for item
    content: null, // html/text content to be displayed in the menu
    contentStyle: {"color": "#cdcdcd", "font-size": "12px"}, // css key:value pairs to set the command's css in js if you want
    select: (ele) => console.log("command triggered, but action not set"),
    enabled: true // whether the command is selectable
}

// the default values of each option are outlined below:
export const defaultContextMenuOptions = {
    menuRadius: 70, // the radius of the circular menu in pixels
    selector: 'node', // elements matching this Cytoscape.js selector will trigger cxtmenus
    commands: [ // an array of commands to list in the menu or a function that returns the array
        /*
        { // example command
          fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
          content: 'a command name', // html/text content to be displayed in the menu
          contentStyle: {}, // css key:value pairs to set the command's css in js if you want
          select: function(ele){ // a function to execute when the command is selected
            console.log( ele.id() ) // `ele` holds the reference to the active element
          },
          enabled: true // whether the command is selectable
        }
        */

    ], // function( ele ){ return [ /*...*/ ] }, // a function that returns commands or a promise of commands
    fillColor: 'rgba(0, 0, 0, 0.75)', // the background colour of the menu
    activeFillColor: 'rgba(6,163,76,0.75)', // the colour used to indicate the selected command
    activePadding: 5, // additional size in pixels for the active command
    indicatorSize: 14, // the size in pixels of the pointer to the active command
    separatorWidth: 0, // the empty spacing in pixels between successive commands
    spotlightPadding: 4, // extra spacing in pixels between the element and the spotlight
    minSpotlightRadius: 18, // the minimum radius in pixels of the spotlight
    maxSpotlightRadius: 38, // the maximum radius in pixels of the spotlight
    openMenuEvents: 'cxttapstart tap', // space-separated cytoscape events that will open the menu; only `cxttapstart` and/or `taphold` work here
    itemColor: 'white', // the colour of text in the command's content
    itemTextShadowColor: 'transparent', // the text shadow colour of the command's content
    zIndex: 9999, // the z-index of the ui div
    atMouse: false // draw menu at mouse position
};

export const defaultLayoutOptions = {
    name: "cola",
    animate: true, // whether to show the layout as it's running
    refresh: 1, // number of ticks per frame; higher is faster but more jerky
    maxSimulationTime: 1500, // max length in ms to run the layout
    ungrabifyWhileSimulating: false, // so you can't drag nodes during layout
    fit: false, // on every layout reposition of nodes, fit the viewport
    padding: 30, // padding around the simulation
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    nodeDimensionsIncludeLabels: true, // whether labels should be included in determining the space used by a node

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
    edgeLength: 250, // sets edge length directly in simulation
    edgeSymDiffLength: undefined, // symmetric diff edge length in simulation
    edgeJaccardLength: undefined, // jaccard edge length in simulation

    // iterations of cola algorithm; uses default values on undefined
    unconstrIter: undefined, // unconstrained initial layout iterations
    userConstIter: undefined, // initial layout iterations with user-specified constraints
    allConstIter: undefined // initial layout iterations with all constraints including non-overlap
};


/*

selector: 'node[type="human"]',

 */
export const defaultCytoscapeStyleOptions = {
    boxSelectionEnabled: false,
    autounselectify: true,
    avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
    avoidOverlapPadding: 10, // extra spacing around nodes when avoidOverlap: true
    nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
    style: [
        {
            selector: "node",
            style: {
                label: (ele) => getElementNameOrId(ele.data()),
                shape: (ele) => "ellipse", // https://js.cytoscape.org/#style/node-body
                "background-fit": "cover",
                "border-color": (ele) => getColorForString(ele.data()['label']),
                "border-width": 5,
                "border-opacity": 0.5,
                "background-color": (ele) => getColorForString(ele.data()['label']),
                "background-image": (ele) => {
                    return null;
                }
            },

        }
        , {
            selector: "edge",
            style: {
                label: (ele) => getElementNameOrId(ele.data()),
                color: (ele) => getColorForString(ele.data()['label']),
                "line-color": (ele) => getColorForString(ele.data()['label']),
                "target-arrow-color": (ele) => getColorForString(ele.data()['label']),
                "curve-style": "bezier",
                "target-arrow-shape": "triangle",
                width: 3,
                "text-background-opacity": 0.8,
                "text-background-color": "#efefef",
                "text-background-shape": "roundrectangle",
                "text-border-color": "#efefef",
                "text-border-width": 1,
                "text-border-opacity": 1,
                "edge-text-rotation": "autorotate"
            }
        },
        {
            selector: ".highlighted",
            style: {
                "background-color": "#61bffc",
                "line-color": "#61bffc",
                "target-arrow-color": "#61bffc",
                "transition-property": "background-color, line-color, target-arrow-color",
                "transition-duration": "0.5s"
            }
        }

    ],
    elements: {
        nodes: [],
        edges: []
    },
}
