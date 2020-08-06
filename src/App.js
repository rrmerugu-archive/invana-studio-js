import React from "react";
import "./App.css";
import GraphExplorer from "./graph-explorer/graph-explorer";

export default class App extends React.Component {

    render() {
        return (
            <div className="App">
                {/*<h1>Hello graph-explorer.js</h1>*/}
                {/*<p>cytoscape.js experiments to visualise GraphSON data.</p>*/}
                <GraphExplorer/>
            </div>
        );
    }
}
