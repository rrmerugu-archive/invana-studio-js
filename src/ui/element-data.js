import React from "react";


export default class GEElementData extends React.Component {


    static defaultProps = {
        selectedElement: null
    }

    getData() {
        try {
            return this.props.selectedElement.data()
        } catch (e) {
            return null;
        }
    }

    render() {
        return this.getData() ? <div className={"graphExplorerElementOptions"}>
            <h3>Element options</h3>
            {JSON.stringify(this.getData())}
        </div> : <span></span>

    }
}
