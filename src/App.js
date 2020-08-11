import React from "react";
import GECanvasContainer from "./ui/container";
import {GREMLIN_URL} from "./core/constants";

const menuCommands = {
    "close": (ele, controller) => console.log("close Command triggered"),
    "outV": (ele, controller) => {
        const nodeId = ele.id();
        console.log("inV Command triggered " + nodeId);
        // TODO - optimise the query
        const queryString = "node=g.V(" + nodeId + ").toList(); " +
            "edges = g.V(" + nodeId + ").outE().dedup().toList(); " +
            "other_nodes = g.V(" + nodeId + ").outE().otherV().dedup().toList();" +
            "[other_nodes,edges,node]";
        controller.getConnector().makeQuery(queryString, (nodesAndLinks) => {
            if (nodesAndLinks['nodes'].length > 0) {
                controller.getLayout().on("layoutstop", function () {
                    controller.centerElement(ele);
                });
            }
        })
    },
    "allV": (ele, controller) => {
        const nodeId = ele.id();
        console.log("allV Command triggered " + nodeId);
        // TODO - optimise the query
        let queryString = "node=g.V(" + nodeId + ").toList(); " +
            "edges = g.V(" + nodeId + ").bothE().dedup().toList(); " +
            "other_nodes = g.V(" + nodeId + ").bothE().otherV().dedup().toList();" +
            "[other_nodes,edges,node]";
        controller.getConnector().makeQuery(queryString, (nodesAndLinks) => {
            if (nodesAndLinks['nodes'].length > 0) {
                controller.getLayout().on("layoutstop", function () {
                    controller.centerElement(ele);
                });
            }
        })
    },
    "inV": (ele, controller) => {
        const nodeId = ele.id();
        console.log("outV Command triggered " + nodeId);
        // TODO - optimise the query
        let queryString = "node=g.V(" + nodeId + ").toList(); " +
            "edges = g.V(" + nodeId + ").inE().dedup().toList(); " +
            "other_nodes = g.V(" + nodeId + ").inE().otherV().dedup().toList();" +
            "[other_nodes,edges,node]";
        controller.getConnector().makeQuery(queryString, (nodesAndLinks) => {
            if (nodesAndLinks['nodes'].length > 0) {
                controller.getLayout().on("layoutstop", function () {
                    controller.centerElement(ele);
                });
            }
        })
    },
    "options": (ele, controller) => console.log("options Command triggered"),
}


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
