/*

*/

export class ColorManagement {


    getStyles() {
        return {
            "nodeConfig": {
                "Drug": {
                    "bgColor": "#555555",
                    "textColor": "#efefef",
                    "shape": "ellipse"
                }
            },
            "edgesConfig": {}
        }
    }

    getSingleStyle(style, cy) {
        return cy.style().json();
    }

    updateStyle(nodeName, style) {
        /*
        https://github.com/cytoscape/cytoscape.js/issues/2637#issue-570429250

        var json = cy.style().json();
        // update the "json" object
        cy.style().clear().fromJson(json).update();
         */

    }

}
