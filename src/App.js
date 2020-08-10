import React from "react";
import "./App.css";
import GECanvas from "./graph-explorer/canvas";
import CanvasContainer from "./graph-explorer/container";

export default class App extends React.Component {

    render() {
        return (
            <div className="App">
                {/*<h1>Hello canvas.js</h1>*/}
                {/*<p>cytoscape.js experiments to visualise GraphSON data.</p>*/}
                <CanvasContainer/>
            </div>
        );
    }
}
