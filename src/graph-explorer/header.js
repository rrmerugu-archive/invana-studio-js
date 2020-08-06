import React from "react";
import {getNewData} from "./dev/utils";
import {defaultLayoutOptions} from "./dev/defaults";


export default class GEHeader extends React.Component {


    static defaultProps = {
        get_cy: () => console.error("get_cy prop not declared in GEHeader "),
        set_cy: () => console.error("set_cy prop not declared in GEHeader "),
        updateData: (nodes, edges) => console.log("updateData prop not declared in GEHeader")
    }

    loadExampleData() {
        const _ = getNewData();
        this.props.updateData(_[0], _[1]);
    }

    clearCanvas() {
        this.props.get_cy().elements().remove();
    }

    changeLayoutToCircle() {
        let layout = this.props.get_cy().elements().makeLayout({"name": "circle"});
        layout.run();
    }

    changeLayoutToCola() {
        let layout = this.props.get_cy().elements().makeLayout({"name": "cola"});
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

    render() {
        return (
            <div className="graph-explorer-header">
                <button onClick={() => this.loadExampleData()}>add new data</button>
                <button onClick={() => this.redrawCanvas()}>re-draw</button>
                <button onClick={() => this.clearCanvas()}>clear</button>
                <button onClick={() => this.lockPositions()}>lock positions</button>
                <button onClick={() => this.unLockPositions()}>unlock positions</button>
                |
                <button onClick={() => this.changeLayoutToCircle()}>ct circle </button>
                <button onClick={() => this.changeLayoutToCola()}>ct cola</button>

            </div>
        );
    }
}
