import React from "react";
import cytoscape from "cytoscape";
import GEHeader from "./header";
import {defaultCytoscapeOptions, defaultLayoutOptions, defaultContextMenuOptions} from "./defaults";
import "./canvas.scss";
import cola from "cytoscape-cola";
import cxtmenu from 'cytoscape-cxtmenu';
import {GREMLIN_URL} from "./constants";


import GEEvents from "./events";
import {makeQuery} from "./connector";
import GremlinResponseSerializers from "./serializer";

cytoscape.use(cxtmenu);
cytoscape.use(cola);
const gremlinSerializer = new GremlinResponseSerializers();

export default class GECanvas extends React.Component {


    setupMenuOptions() {

        let _this = this;
        let menuOptions = defaultContextMenuOptions;
        menuOptions.commands = [{ // example command
            fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
            content: 'inV', // html/text content to be displayed in the menu
            contentStyle: {}, // css key:value pairs to set the command's css in js if you want
            select: function (ele) { // a function to execute when the command is selected
                console.log(ele.id()); // `ele` holds the reference to the active element
                const nodeId = ele.id();
                const query_string = "node=g.V(" + nodeId + ").toList(); " +
                    "edges = g.V(" + nodeId + ").outE().dedup().toList(); " +
                    "other_nodes = g.V(" + nodeId + ").outE().otherV().dedup().toList();" +
                    "[other_nodes,edges,node]";
                makeQuery(GREMLIN_URL, query_string,
                    (response) => {
                        const result = gremlinSerializer.process(response)
                        const nodesAndLinks = gremlinSerializer.separateVerticesAndEdges(result, false);
                        _this.updateData(nodesAndLinks['nodes'], nodesAndLinks['links']);
                    }
                )
            },
            enabled: true // whether the command is selectable
        }, { // example command
            fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
            content: 'outV', // html/text content to be displayed in the menu
            contentStyle: {}, // css key:value pairs to set the command's css in js if you want
            select: function (ele) { // a function to execute when the command is selected

                console.log(ele.id()); // `ele` holds the reference to the active element
                               const nodeId = ele.id();

                let query_string = "node=g.V(" + nodeId + ").toList(); " +
                    "edges = g.V(" + nodeId + ").inE().dedup().toList(); " +
                    "other_nodes = g.V(" + nodeId + ").inE().otherV().dedup().toList();" +
                    "[other_nodes,edges,node]";
                   makeQuery(GREMLIN_URL, query_string,
                    (response) => {
                        const result = gremlinSerializer.process(response)
                        const nodesAndLinks = gremlinSerializer.separateVerticesAndEdges(result, false);
                        _this.updateData(nodesAndLinks['nodes'], nodesAndLinks['links']);
                    }
                )

            },
            enabled: true // whether the command is selectable
        }];
        this.menu = this.cy.cxtmenu(defaultContextMenuOptions);


    }

    componentDidMount() {
        this.cy = this.createCytoscapeInstance();
        this.setupNodeEvents(); //

        this.setupMenuOptions();
    }

    createCytoscapeInstance() {
        console.log("render graph triggered");
        const layoutOptions = defaultCytoscapeOptions;
        layoutOptions.container = document.querySelector("#graph-canvas");
        layoutOptions.layout = defaultLayoutOptions;
        return cytoscape(layoutOptions);
    }

    setupNodeEvents() {
        /*
        this will set events for what happens when node is
        hovered, clicked, dragged, drag stopped etc.

         */
        const events = new GEEvents();

        this.cy.on('tap', (event) => events.OnTap(event, this.cy));

        this.cy.on('tapdrag', (event) => events.onTagDrag(event, this.cy));
        this.cy.on('tapdragout', (event) => events.onTapDragOut(event, this.cy));

        this.cy.on('tapstart', (event) => events.onTapStart(event, this.cy));
        this.cy.on('tapend', (event) => events.onTapEnded(event, this.cy));
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
        // _this.unlockNodes();

    }

    get_menu() {
        return this.menu;
    }

    get_cy() {
        return this.cy;
    }

    set_cy(cy) {
        this.cy = cy;
    }


    render() {
        return (
            <div className="graph-explorer">
                <GEHeader updateData={this.updateData.bind(this)}
                          get_cy={this.get_cy.bind(this)}
                          set_cy={this.set_cy.bind(this)}
                          get_menu={this.get_menu.bind(this)}
                />
                <div className={"graph-explorer-canvas"} id="graph-canvas"/>
            </div>
        );
    }
}
