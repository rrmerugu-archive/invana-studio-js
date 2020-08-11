import React from "react";
import GECanvasContainer from "./ui/container";
import {GREMLIN_URL} from "./core/constants";

export default class App extends React.Component {

    render() {
        return (
            <div className="App">
                <GECanvasContainer gremlinUrl={GREMLIN_URL}/>
            </div>
        );
    }
}
