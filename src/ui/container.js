import React from "react";
import GECanvas from "./canvas";
import GEElementData from "./element-data";
import {defaultContextMenuOptions, defaultCytoscapeStyleOptions, defaultLayoutOptions} from "../core/constants";
import GremlinResponseSerializers from "../gremlin/serializer";
import GEEvents from "../core/events";
import GEController from "../core/controller";
import {createCyInstance, generateMenuItems} from "../core/utils";
import {HTTPConnector} from "../gremlin/connector";
import GECanvasHeader from "./canvas-header";


const gremlinSerializer = new GremlinResponseSerializers();


export default class GECanvasContainer extends React.Component {

    static defaultProps = {
        gremlinUrl: null,
        menuCommands: [],
        graphElementId: null
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedElement: null
        }


    }

    processResponse(response, extraCallback) {
        /*
        This method will get response from gremlin server and
        separates them into nodes and links.

        extraCallback is triggered after the updateData func.

        returns {"nodes": [], "links": []}
         */
        const result = gremlinSerializer.process(response)
        const nodesAndLinks = gremlinSerializer.separateVerticesAndEdges(result, false);
        this.updateData(nodesAndLinks['nodes'], nodesAndLinks['links']);
        if (extraCallback) {
            extraCallback(nodesAndLinks);
        }

    }

    updateState(data) {
        this.setState(data);
    }

    setupMenuOptions() {
        let menuOptions = defaultContextMenuOptions;
        menuOptions.commands = generateMenuItems(this.props.menuCommands);
        return this.controller.getCy().cxtmenu(defaultContextMenuOptions);
    }

    componentDidMount() {

        const cyOptions = defaultCytoscapeStyleOptions;
        cyOptions.container = document.querySelector("#" + this.props.graphElementId);
        cyOptions.layout = defaultLayoutOptions;
        let cy = createCyInstance(cyOptions);
        this.connector = new HTTPConnector({
            gremlinUrl: this.props.gremlinUrl,
            extraHeaders: {},
            callback: this.processResponse.bind(this)
        })

        this.controller = new GEController({cy: cy, connector: this.connector})
        this.events = new GEEvents({
            updateState: this.updateState.bind(this),
            controller: this.controller
        });
        this.menu = this.setupMenuOptions();
        this.setupDefaultEvents(); //
    }


    setupDefaultEvents() {
        /*
        this will set events for what happens when node is
        hovered, clicked, dragged, drag stopped etc.

         */

        this.controller.getCy().on('tap', (event) => this.events.OnTap(event));

        this.controller.getCy().on('tapdrag', (event) => this.events.onTagDrag(event));
        this.controller.getCy().on('tapdragout', (event) => this.events.onTapDragOut(event));

        this.controller.getCy().on('tapstart', (event) => this.events.onTapStart(event));
        this.controller.getCy().on('tapend', (event) => this.events.onTapEnded(event));

        this.controller.getCy().on('layoutstart', function (e) {
            // Notice the layoutstart event with the layout name.
            console.log('layoutstart', e.target.options.name);
        });

        this.controller.getCy().on('layoutstop', function (e) {
            // Notice the layoutstop event with the layout name.
            console.log('layoutstop', e.target.options.name);
        });
    }


    updateData(nodes, edges) {
        let _this = this;
        this.controller.lockNodes();
        const nodesCleaned = this.controller.convertNodes2CyNodes(nodes);
        const edgesCleaned = this.controller.convertEdges2CyEdges(edges);

        if (this.layout) {
            this.layout.stop();
        }
        this.controller.addElements(nodesCleaned);
        this.controller.addElements(edgesCleaned);

        this.layout = this.controller.getLayout();
        this.layout.run();
        this.layout.on("layoutstop", function () {
            _this.controller.unlockNodes();
            //... unload spinner here
        });
    }

    getController(){
        console.log("getController", this.controller);
        return this.controller;
    }


    render() {
        return (
            <div className="graphExplorer">
                <GECanvasHeader getController={this.getController.bind(this)}/>
                <GECanvas graphElementId={this.props.graphElementId}/>
                <GEElementData selectedElement={this.state.selectedElement}/>
            </div>
        );
    }
}
