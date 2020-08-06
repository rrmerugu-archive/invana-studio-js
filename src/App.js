import React from "react";
import "./App.css";
import GECanvas from "./graph-explorer/canvas";

export default class App extends React.Component {

    render() {
        return (
            <div className="App">
                {/*<h1>Hello canvas.js</h1>*/}
                {/*<p>cytoscape.js experiments to visualise GraphSON data.</p>*/}
                <GECanvas/>
            </div>
        );
    }
}
