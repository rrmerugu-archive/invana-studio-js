import React from "react";
import cytoscape from "cytoscape";
import {getNewData} from "./dev/utils";
import {defaultCytoscapeOptions, defaultLayoutOptions} from "./dev/defaults";

import cola from "cytoscape-cola";

cytoscape.use(cola);

export default class GraphExplorer extends React.Component {

    componentDidMount() {
        this.cy = this.createCytoscapeInstance();
    }

    createCytoscapeInstance() {
        console.log("render graph triggered");
        const layoutOptions = defaultCytoscapeOptions;
        layoutOptions.container = document.querySelector("#graph-canvas");
        layoutOptions.layout = defaultLayoutOptions;
        return cytoscape(layoutOptions);
    }

    lockNodes() {
        console.log("lockNodes triggered");
        this.cy.nodes().lock();
    }

    unlockNodes() {
        console.log("unlockNodes triggered");
        this.cy.nodes().unlock();
    }

    updateData() {
        let _this = this;
        this.lockNodes();
        const _ = getNewData();
        const newNodesData = _[0];
        const newEdgesData = _[1];

        let nodes = [];
        // Create new parent
        newNodesData.forEach(data => {
            nodes.push({
                group: "nodes",
                data: data
            });
        });

        let edges = [];
        newEdgesData.forEach(data => {
            edges.push({
                group: "edges",
                data: data
            });
        });

        console.log("nodes", nodes);
        console.log("edges", edges);

        if (this.layout) {
            this.layout.stop();
        }
        this.cy.add(nodes);
        this.cy.add(edges);

        this.layout = this.cy.elements().makeLayout(defaultLayoutOptions);
        this.layout.run();

        this.layout.on("layoutstop", function () {
            _this.unlockNodes();
            //... unload spinner here
        });
    }

    render() {
        return (
            <div className="graph-explorer">
                <button onClick={() => this.updateData()}>update</button>
                <div id="graph-canvas"/>
            </div>
        );
    }
}
