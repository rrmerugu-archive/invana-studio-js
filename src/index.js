import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import cxtmenu from "cytoscape-cxtmenu";
import cola from "cytoscape-cola";
import cytoscape from "cytoscape";


cytoscape.use(cxtmenu);
cytoscape.use(cola);
ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);
