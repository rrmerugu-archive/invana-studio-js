import React from "react";
import GECanvasContainer from "./ui/container";
import {GREMLIN_URL} from "./core/constants";

const menuCommands = {
    "inV": (ele) => console.log("inV Command triggered"),
    "outV": (ele) => console.log("outV Command triggered"),
    "close": (ele) => console.log("close Command triggered"),
    "allV": (ele) => console.log("allV Command triggered"),
}


// const menuCommands = [{ // example command
//     fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
//     content: 'inV', // html/text content to be displayed in the menu
//     contentStyle: {}, // css key:value pairs to set the command's css in js if you want
//     select: function (ele) { // a function to execute when the command is selected
//         console.log(ele.id()); // `ele` holds the reference to the active element
//         const nodeId = ele.id();
//         const queryString = "node=g.V(" + nodeId + ").toList(); " +
//             "edges = g.V(" + nodeId + ").outE().dedup().toList(); " +
//             "other_nodes = g.V(" + nodeId + ").outE().otherV().dedup().toList();" +
//             "[other_nodes,edges,node]";
//
//         this.props.connector.makeQuery(queryString, (nodesAndLinks) => {
//             if (nodesAndLinks['nodes'].length > 0) {
//                 _this.layout.on("layoutstop", function () {
//                     centerElement(ele, _this.);
//                 });
//             }
//         })
//
//     },
//     enabled: true // whether the command is selectable
// }, { // example command
//     fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
//     content: 'outV', // html/text content to be displayed in the menu
//     contentStyle: {}, // css key:value pairs to set the command's css in js if you want
//     select: function (ele) { // a function to execute when the command is selected
//         console.log(ele.id()); // `ele` holds the reference to the active element
//         const nodeId = ele.id();
//         let queryString = "node=g.V(" + nodeId + ").toList(); " +
//             "edges = g.V(" + nodeId + ").inE().dedup().toList(); " +
//             "other_nodes = g.V(" + nodeId + ").inE().otherV().dedup().toList();" +
//             "[other_nodes,edges,node]";
//         console.log("nodeId", nodeId);
//
//         _this.connector.makeQuery(queryString, (nodesAndLinks) => {
//             if (nodesAndLinks['nodes'].length > 0) {
//                 _this.layout.on("layoutstop", function () {
//                     centerElement(ele, _this.cy);
//                 });
//             }
//         })
//
//     },
//     enabled: true // whether the command is selectable
// }]

export default class App extends React.Component {

    render() {
        return (
            <div className="App">
                <GECanvasContainer
                    menuCommands={menuCommands}
                    gremlinUrl={GREMLIN_URL}
                    graphElementId={"graph-explorer"}
                />
            </div>
        );
    }
}
