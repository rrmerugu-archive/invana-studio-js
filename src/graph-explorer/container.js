import React from "react";
import GECanvas from "./canvas";
import GEElementOptions from "./options";
import {defaultContextMenuOptions, defaultCytoscapeOptions, defaultLayoutOptions} from "./defaults";
import {makeQuery} from "./connector";
import {GREMLIN_URL} from "./constants";
import cytoscape from "cytoscape";
import cxtmenu from "cytoscape-cxtmenu";
import cola from "cytoscape-cola";
import GremlinResponseSerializers from "./serializer";
import GEEvents from "./events";
import GEActions from "./actions";

const actions = new GEActions();
cytoscape.use(cxtmenu);
cytoscape.use(cola);
const gremlinSerializer = new GremlinResponseSerializers();


export default class CanvasContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedElement: null
        }
    }

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
        let _this = this;
        const events = new GEEvents();

        this.cy.on('tap', (event) => {
            const element = events.OnTap(event, this.cy)
            if (element) {
                actions.highLightNeighbourNodes(element, _this.cy);
                _this.setState({selectedElement: element});
            }
        });

        this.cy.on('tapdrag', (event) => events.onTagDrag(event, this.cy));
        this.cy.on('tapdragout', (event) => events.onTapDragOut(event, this.cy));

        this.cy.on('tapstart', (event) => events.onTapStart(event, this.cy));
        this.cy.on('tapend', (event) => events.onTapEnded(event, this.cy));

        // this.cy.on('select', (event) => {
        //     console.log("select triggered");
        //     _this.setState({selectedElement: events.onSelect(event, _this.cy)});
        // });

        this.cy.on('layoutstart', function (e) {
            // Notice the layoutstart event with the layout name.
            console.log('layoutstart', e.target.options.name);
        });

        this.cy.on('layoutstop', function (e) {
            // Notice the layoutstop event with the layout name.
            console.log('layoutstop', e.target.options.name);
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


    getMenu() {
        return this.menu;
    }

    getCyInstance() {
        return this.cy;
    }

    setCyInstance(cy) {
        this.cy = cy;
    }

    render() {
        return (
            <div className="App">
                <GECanvas
                    getCyInstance={this.getCyInstance.bind(this)}
                    setCyInstance={this.setCyInstance.bind(this)}
                    getMenu={this.getMenu.bind(this)}
                    updateData={this.updateData.bind(this)}
                />
                <GEElementOptions selectedElement={this.state.selectedElement}/>
            </div>
        );
    }
}
