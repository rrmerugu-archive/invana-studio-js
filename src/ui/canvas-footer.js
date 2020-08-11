import React from "react";


export default class GECanvasFooter extends React.Component {

    static defaultProps = {
        getController: () => console.error("getController() not set for GECanvasHeader"),
        // canvasData: null
    }


    getNodesCount() {
        return this.props.getController() ? this.props.getController().getCy().nodes().length : 0;
    }

    getEdgesCount() {
        return this.props.getController() ? this.props.getController().getCy().edges().length : 0;
    }

    getZoomLevel() {
        return this.props.getController() ? this.props.getController().getCy().zoom().toFixed(2) : 1;
    }

    render() {
        return (
            <div className="graphExplorerFooter">
                <ul>
                    <li>
                        <a href="javascript:void(0)">Nodes Locked</a>
                    </li>
                    <li>
                        {this.getNodesCount()} Nodes; {this.getEdgesCount()} edges;
                    </li>
                    <li>
                        zoom level {this.getZoomLevel()}
                    </li>
                </ul>
            </div>
        );
    }
}
