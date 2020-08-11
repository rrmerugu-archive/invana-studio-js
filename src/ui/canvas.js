import React from "react";
import GEControl from "./controls";
import "../graph-explorer.scss";


export default class GECanvas extends React.Component {

    static defaultProps = {
        getCyInstance: () => console.error("getCyInstance prop not set in GECanvas"),
        setCyInstance: () => console.error("setCyInstance prop not set in GECanvas"),
        getMenu: () => console.error("getMenu prop not set in GECanvas"),
        updateData: () => console.error("updateData prop not set in GECanvas")
    }


    render() {
        return (
            <div className="graphExplorer">
                <GEControl updateData={this.props.updateData.bind(this)}
                           getCyInstance={this.props.getCyInstance.bind(this)}
                           setCyInstance={this.props.setCyInstance.bind(this)}
                           getMenu={this.props.getMenu.bind(this)}
                />
                <div className={"graphExplorerCanvas"} id="graph-canvas"/>
            </div>
        );
    }
}
