import React from "react";
import GEControl from "./controls";
import "./canvas.scss";


export default class GECanvas extends React.Component {

    defaultProps = {
        getCyInstance: () => console.error("getCyInstance prop not set in GECanvas"),
        setCyInstance: () => console.error("setCyInstance prop not set in GECanvas"),
        getMenu: () => console.error("getMenu prop not set in GECanvas"),
        updateData: () => console.error("updateData prop not set in GECanvas")
    }


    render() {
        return (
            <div className="graph-explorer">
                <GEControl updateData={this.props.updateData.bind(this)}
                           getCyInstance={this.props.getCyInstance.bind(this)}
                           setCyInstance={this.props.setCyInstance.bind(this)}
                           getMenu={this.props.getMenu.bind(this)}
                />
                <div className={"graph-explorer-canvas"} id="graph-canvas"/>
            </div>
        );
    }
}
