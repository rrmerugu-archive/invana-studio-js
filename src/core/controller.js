import cytoscape from "cytoscape";
import {defaultLayoutOptions} from "./constants";


export default class GEController {
    /*
    Log all the controller.
     */

    constructor(props) {
        this.props = props;
    }

    static defaultProps = {
        cy: {},
        connector: null
    }

    getConnector() {
        if (this.props.connector) {
            return this.props.connector;
        } else {
            console.error("connector not set in GE Controller");
            return null;
        }
    }

    getElement(event) {
        return event.target;
    }

    getCy() {
        return this.props.cy;
    }

    setCy(cy) {
        this.props.cy = cy;
    }


    createCyInstance(cyOptions) {
        return cytoscape(cyOptions);
    }


    unLockNeighbors(node) {
        console.log("unLockNeighbors fired", node);
        const neighbors = this.getNeighbourNodes(node);
        neighbors.unlock();
    }

    lockNeighbors(node) {
        console.log("lockNeighbors fired", node);
        const neighbors = this.getNeighbourNodes(node);
        neighbors.lock();
    }

    getNeighbourNodes(node) {
        return node.neighborhood()
    }

    highLightNeighbourNodes(node) {
        console.log("highLightNeighbourNodes fired", node.id());
        this.getCy().edges("[source='" + node.id() + "']").addClass('highlighted');
        this.getCy().edges("[target='" + node.id() + "']").addClass('highlighted');
    }

    unHighLightNeighbourNodes(node) {
        console.log("unHighLightNeighbourNodes fired", node.id());
        this.getCy().edges("[source='" + node.id() + "']").removeClass('highlighted');
        this.getCy().edges("[target='" + node.id() + "']").removeClass('highlighted');
    }

    saveImage(imageType) {

        let image64 = null;
        if (imageType === 'png') {
            image64 = this.getCy().png();
        } else {
            image64 = this.getCy().jpg();
        }

        let imageElement = document.createElement("a"); //Create <a>
        imageElement.href = "data:image/png;base64," + image64; //Image Base64 Goes here
        imageElement.download = "Image.png"; //File name Here
        imageElement.click(); //Downloaded file

    }

    lockNodes() {
        console.log("lockNodes triggered");
        this.getCy().nodes().lock();
    }

    unlockNodes() {
        console.log("unlockNodes triggered");
        this.getCy().nodes().unlock();
    }

    addElements(elements) {
        this.getCy().add(elements);
    }

    getLayout() {
        return this.getCy().elements().makeLayout(defaultLayoutOptions);
    }

    convertNodes2CyNodes(nodes) {
        let nodesCleaned = [];
        // Create new parent
        nodes.forEach(data => {
            nodesCleaned.push({
                group: "nodes",
                data: data
            });
        });
        return nodesCleaned;
    }

    convertEdges2CyEdges(edges) {
        let edgesCleaned = [];
        edges.forEach(data => {
            edgesCleaned.push({
                group: "edges",
                data: data
            });
        });
        return edgesCleaned;
    }

    clearCanvas() {
        this.getCy().elements().remove();
        // this.props.getMenu().destroy();
    }

    centerCanvas() {
        this.getCy().centre(this.getCy().elements());
    }

    changeLayoutToCircle() {
        const layoutOptions = defaultLayoutOptions;
        layoutOptions.name = "circle"
        let layout = this.getCy().elements().makeLayout(layoutOptions);
        layout.run();
    }

    changeLayoutToCola() {
        const layoutOptions = defaultLayoutOptions;
        layoutOptions.name = "cola"
        let layout = this.getCy().elements().makeLayout(layoutOptions);
        layout.run();
    }

    redrawCanvas() {
        this.centerCanvas();
        const layout = this.getCy().elements().layout(defaultLayoutOptions);
        layout.run();
    }

    lockPositions() {
        this.getCy().nodes().lock();
    }

    unLockPositions() {
        this.getCy().nodes().unlock();
    }

    centerElement(element) {
        this.getCy().center(element);
    }

    extendInV(nodeId) {

    }

    extendOutV(nodeId) {

    }

    extendAllV(nodeId) {

    }


}
