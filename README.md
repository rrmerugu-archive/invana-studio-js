# graph-explorer-js

Javascript library to build data graph using GraphSON data.

This component would be used in building the [graph-explorer](https://github.com/invanalabs/graph-explorer)
 project for creating graph data visualisations.


## Install 
```shell script
npm install invanalabs/graph-explorer-js#master  --save 
```

## Usage
```ecmascript 6
import React from "react";
import GECanvasContainer from "./ui/container";
import {GREMLIN_URL} from "./core/constants";

const menuCommands = {
    "close": (ele, controller) => console.log("close Command triggered"),
    "outV": (ele, controller) => {
        const nodeId = ele.id();
        console.log("inV Command triggered" + nodeId);
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
    "allV": (ele, controller) => console.log("allV Command triggered"),
    "inV": (ele, controller) => {
        console.log("outV Command triggered");
        const nodeId = ele.id();
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
```

This project is open sourced under the terms of [Apache Licence 2.0](./LICENSE). 
