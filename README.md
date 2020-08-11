# graph-explorer-js

Javascript library to build data graph using GraphSON data.

This component would be used in building the [graph-explorer](https://github.com/invanalabs/graph-explorer)
 project for creating graph data visualisations.


## Install 
```shell script
npm install invanalabs/graph-explorer-js#master  --save 
```

## Usage
```javascript
import React from "react";
import GECanvasContainer from "./src/ui/container";

const GREMLIN_URL = "http://localhost:8182/gremlin"

export default class App extends React.Component {

    render() {
        return (
            <div className="App">
                <GECanvasContainer gremlinUrl={GREMLIN_URL}/>
            </div>
        );
    }
}
```

This project is open sourced under the terms of [Apache Licence 2.0](./LICENSE). 
