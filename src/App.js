import React from "react";
import "./App.css";
import CanvasContainer from "./ui/container";

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
