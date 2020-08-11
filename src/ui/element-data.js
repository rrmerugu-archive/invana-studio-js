import React from "react";
import {getElementNameOrId} from "../core/utils";
import {defaultMenuItemConfig} from "../core/constants";

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


    getCleanedData() {
        // removes position attributes etc.
        let data = Object.assign({}, this.getData());

        if (data) {
            let properties = data.properties;
            let cleanedData = {};
            cleanedData.label = data.label;
            cleanedData.type = data.type;//.replace("g:", "");
            cleanedData.id = data.id;
            cleanedData.properties = properties;
            return cleanedData;
        } else {
            return {"properties": {}};
        }
    }


    render() {
        const cleanedData = this.getCleanedData();
        console.log("cleanedData", cleanedData)
        console.log("getData", this.getData())
        return this.getData() ? <div className={"graphExplorerElementOptions"}>
            <div className="card">
                <div className={"card-header"}>
                    <h3>{cleanedData.label}:{getElementNameOrId(this.getData())}</h3>
                    <p>{cleanedData.type}:{cleanedData.id}</p>
                </div>
                <div className="card-body">
                    {
                        Object.keys(cleanedData.properties).map((propKey) => {
                            return (
                                <div className={'singleProperty'} key={cleanedData.id + "-" + propKey}>
                                    <strong>{propKey}:</strong> {cleanedData.properties[propKey]}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div> : <span></span>

    }
}
