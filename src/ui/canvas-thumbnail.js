import React from "react";


export default class GECanvasThumbnail extends React.Component {

    static defaultProps = {
        getController: () => console.error("getController() not set for GECanvasHeader"),
    }

    updateThumbnail() {
        // put the png data in an img tag
        if (this.props.getController()) {
            document.querySelector(".ge-thumbnail").src = this.props.getController().getCy().png();
            // alert("updateThumbnail");
        }
    }


    render() {
        this.updateThumbnail();
        return (
            <img className={"ge-thumbnail"}/>
        );
    }
}
