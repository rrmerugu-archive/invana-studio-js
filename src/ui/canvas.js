import React from "react";
import "../style.scss";


export default class GECanvas extends React.Component {

    static defaultProps = {
        graphElementId: null
    }

    render() {
        return (
            <div className={"graphExplorerCanvas"} id={this.props.graphElementId}/>
        );
    }
}
