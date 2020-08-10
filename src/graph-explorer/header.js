import React from "react";
import {defaultLayoutOptions} from "./defaults";
import {makeQuery} from "./connector";
import GremlinResponseSerializers from "./serializer";
import {GREMLIN_URL} from "./constants";
import GEActions from "./actions";

const gremlinSerializer = new GremlinResponseSerializers();
const actions = new GEActions();

export default class GEHeader extends React.Component {

    static defaultProps = {
        get_menu: () => console.error("get_menu prop not declared in GEHeader "),
        get_cy: () => console.error("get_cy prop not declared in GEHeader "),
        set_cy: () => console.error("set_cy prop not declared in GEHeader "),
        updateData: (nodes, edges) => console.log("updateData prop not declared in GEHeader")
    }

    constructor(props) {
        super(props);
        this.state = {
            queryText: "g.V().limit(5).toList()"
        }
    }


    clearCanvas() {
        this.props.get_cy().elements().remove();
        // this.props.get_menu().destroy();
    }

    changeLayoutToCircle() {
        const layoutOptions = defaultLayoutOptions;
        layoutOptions.name = "circle"
        let layout = this.props.get_cy().elements().makeLayout(layoutOptions);
        layout.run();
    }

    changeLayoutToCola() {
        const layoutOptions = defaultLayoutOptions;
        layoutOptions.name = "cola"
        let layout = this.props.get_cy().elements().makeLayout(layoutOptions);
        layout.run();
    }

    redrawCanvas() {
        const layout = this.props.get_cy().elements().layout(defaultLayoutOptions);
        layout.run();
    }

    lockPositions() {
        this.props.get_cy().nodes().lock();
    }

    unLockPositions() {
        this.props.get_cy().nodes().unlock();
    }

    handleSubmit(event) {
        console.log('A name was submitted: ' + this.state.queryText);
        const _this = this;
        makeQuery(GREMLIN_URL, this.state.queryText,
            (response) => {
                const result = gremlinSerializer.process(response)
                const nodesAndLinks = gremlinSerializer.separateVerticesAndEdges(result, false);
                _this.props.updateData(nodesAndLinks['nodes'], nodesAndLinks['links']);
            }
        )
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({queryText: event.target.value});
    }

    render() {
        return (
            <div className="graph-explorer-header">
                <button onClick={() => this.redrawCanvas()}>re-draw</button>
                <button onClick={() => this.clearCanvas()}>clear</button>
                <button onClick={() => this.lockPositions()}>lock positions</button>
                <button onClick={() => this.unLockPositions()}>unlock positions</button>
                <form onSubmit={this.handleSubmit.bind(this)} style={{"display": "inline"}}>
                    <input value={this.state.queryText} onChange={this.handleChange.bind(this)} type="text"/>
                    <button type={"submit"}>query</button>
                </form>
                |
                <button onClick={() => this.changeLayoutToCircle()}>ct circle </button>
                <button onClick={() => this.changeLayoutToCola()}>ct cola</button>
                |
                <button onClick={() => actions.saveImage("png", this.props.get_cy())}>save png</button>
                <button onClick={() => actions.saveImage("jpg", this.props.get_cy())}>save jpg</button>

            </div>
        );
    }
}
