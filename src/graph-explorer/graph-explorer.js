import React from "react";
import cytoscape from "cytoscape";
import GEHeader from "./header";
import {defaultCytoscapeOptions, defaultLayoutOptions} from "./dev/defaults";
import "./graph-explorer.scss";
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

    updateData(nodes, edges) {
        let _this = this;
        this.lockNodes();


        let nodes_cleaned = [];
        // Create new parent
        nodes.forEach(data => {
            nodes_cleaned.push({
                group: "nodes",
                data: data
            });
        });

        let edges_cleaned = [];
        edges.forEach(data => {
            edges_cleaned.push({
                group: "edges",
                data: data
            });
        });

        console.log("nodes", nodes_cleaned);
        console.log("edges", edges_cleaned);

        if (this.layout) {
            this.layout.stop();
        }
        this.cy.add(nodes_cleaned);
        this.cy.add(edges_cleaned);

        this.layout = this.cy.elements().makeLayout(defaultLayoutOptions);
        this.layout.run();

        this.layout.on("layoutstop", function () {
            _this.unlockNodes();
            //... unload spinner here
        });
    }

    get_cy() {
        return this.cy;
    }

    set_cy(cy){
        this.cy = cy;
    }

    render() {
        return (
            <div className="graph-explorer">
                <GEHeader updateData={this.updateData.bind(this)}
                          get_cy={this.get_cy.bind(this)}
                          set_cy={this.set_cy.bind(this)}
                />
                <div className={"graph-explorer-canvas"} id="graph-canvas"/>
            </div>
        );
    }
}
