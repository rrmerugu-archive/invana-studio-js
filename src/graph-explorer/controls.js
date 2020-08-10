import React from "react";
import {defaultLayoutOptions} from "./defaults";
import {makeQuery} from "./connector";
import GremlinResponseSerializers from "./serializer";
import {GREMLIN_URL} from "./constants";
import GEActions from "./actions";

const gremlinSerializer = new GremlinResponseSerializers();
const actions = new GEActions();

export default class GEControl extends React.Component {

    static defaultProps = {
        getMenu: () => console.error("getMenu prop not declared in GEControl "),
        getCyInstance: () => console.error("getCyInstance prop not declared in GEControl "),
        setCyInstance: () => console.error("setCyInstance prop not declared in GEControl "),
        updateData: (nodes, edges) => console.log("updateData prop not declared in GEControl")
    }

    constructor(props) {
        super(props);
        this.state = {
            queryText: "g.V().limit(5).toList()"
        }
    }


    clearCanvas() {
        this.props.getCyInstance().elements().remove();
        this.props.getMenu().destroy();
    }
    centerCanvas(){
        this.props.getCyInstance().centre();
    }

    changeLayoutToCircle() {
        const layoutOptions = defaultLayoutOptions;
        layoutOptions.name = "circle"
        let layout = this.props.getCyInstance().elements().makeLayout(layoutOptions);
        layout.run();
    }

    changeLayoutToCola() {
        const layoutOptions = defaultLayoutOptions;
        layoutOptions.name = "cola"
        let layout = this.props.getCyInstance().elements().makeLayout(layoutOptions);
        layout.run();
    }

    redrawCanvas() {
        const layout = this.props.getCyInstance().elements().layout(defaultLayoutOptions);
        layout.run();
    }

    lockPositions() {
        this.props.getCyInstance().nodes().lock();
    }

    unLockPositions() {
        this.props.getCyInstance().nodes().unlock();
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
            <div className="graphExplorerControls">
                <button onClick={() => this.redrawCanvas()}>re-draw</button>
                <button onClick={() => this.centerCanvas()}>center</button>
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
                <button onClick={() => actions.saveImage("png", this.props.getCyInstance())}>save png</button>
                <button onClick={() => actions.saveImage("jpg", this.props.getCyInstance())}>save jpg</button>

            </div>
        );
    }
}
