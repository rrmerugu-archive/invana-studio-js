import React from "react";
import "./App.css";
import cytoscape from "cytoscape";
import {defaultsLayoutOptions, getNewData} from "./utils";
import cola from "cytoscape-cola";

cytoscape.use(cola);

export default class App extends React.Component {
    componentDidMount() {
        this.cy = this.createCytoscapeInstance();
    }

    createCytoscapeInstance() {
        console.log("render graph triggered");

        // let data = getNewData();
        return cytoscape({
            container: document.querySelector("#graph-canvas"),
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
            layout: defaultsLayoutOptions
        });
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
        // nodes.push({
        //   group: "nodes",
        //   data: { id: "n0" },
        //   position: { x: 0, y: 0 }
        // });

        // let list = this.cy.filter(function(i, ele) {
        //   console.log("ele--------->", ele);
        //   return parseInt(ele.id().slice(1), 10) % 2 === 0;
        // });

        // console.log("existing nodes", list);

        // Create copies of old nodes
        // for (var i = list.size() - 1; i >= 0; i--) {
        //   nodes.push({
        //     group: "nodes",
        //     data: { id: "c1" + i, parent: "n0" },
        //     position: { x: list[i].position("x"), y: list[i].position("y") }
        //   });
        // }

        // Remove old nodes
        // list.remove();

        // Add new nodes
        if (this.layout) {
            this.layout.stop();
        }
        this.cy.add(nodes);
        this.cy.add(edges);

        this.layout = this.cy.elements().makeLayout(defaultsLayoutOptions);
        this.layout.run();

        this.layout.on("layoutstop", function () {
            _this.unlockNodes();
            //... unload spinner here
        });

        // this.layout.onready(() => _this.unlockNodes());
        // setTimeout(() => , 5000);
    }

    render() {
        return (
            <div className="App">
                <h1>Hello graph-explorer.js</h1>
                <p>cytoscape.js experiments </p>
                <button onClick={() => this.updateData()}>update</button>
                <div id="graph-canvas"/>
            </div>
        );
    }
}
