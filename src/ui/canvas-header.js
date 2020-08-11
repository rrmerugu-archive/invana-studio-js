import React from "react";


export default class GECanvasHeader extends React.Component {

    static defaultProps = {
        getController: () => console.error("getController() not set for GECanvasHeader")
    }

    constructor(props) {
        super(props);
        this.state = {
            queryText: "g.V().limit(5).toList()"
        }
        console.log("==========this.props", this.props);
    }


    handleSubmit(event) {
        console.log('A name was submitted: ' + this.state.queryText);
        event.preventDefault();
        this.props.getController().getConnector().makeQuery(this.state.queryText)

    }

    handleChange(event) {
        this.setState({queryText: event.target.value});
    }

    render() {
        return (
            <div className="graphExplorerHeader">
                <button onClick={() => this.props.getController().redrawCanvas()}>re-draw</button>
                <button onClick={() => this.props.getController().centerCanvas()}>center</button>
                <button onClick={() => this.props.getController().clearCanvas()}>clear</button>
                <button onClick={() => this.props.getController().lockPositions()}>lock positions</button>
                <button onClick={() => this.props.getController().unLockPositions()}>unlock positions</button>
                <form onSubmit={this.handleSubmit.bind(this)} style={{"display": "inline"}}>
                    <input value={this.state.queryText} onChange={this.handleChange.bind(this)} type="text"/>
                    <button type={"submit"}>query</button>
                </form>
                |
                <button onClick={() => this.props.getController().changeLayoutToCircle()}>ct circle </button>
                <button onClick={() => this.props.getController().changeLayoutToCola()}>ct cola</button>
                |
                <button onClick={() => this.props.getController().saveImage("png")}>save png</button>
                <button onClick={() => this.props.getController().saveImage("jpg")}>save jpg</button>

            </div>
        );
    }
}
