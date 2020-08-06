export default class GEActions {
    /*
    Log all the actions.
     */


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

    highLightNeighbourNodes(node, cy) {
        console.log("highLightNeighbourNodes fired", node.id());
        cy.edges("[source='" + node.id() + "']").addClass('highlighted');
        cy.edges("[target='" + node.id() + "']").addClass('highlighted');
    }

    unHighLightNeighbourNodes(node, cy) {
        console.log("unHighLightNeighbourNodes fired", node.id());
        cy.edges("[source='" + node.id() + "']").removeClass('highlighted');
        cy.edges("[target='" + node.id() + "']").removeClass('highlighted');
    }

}
