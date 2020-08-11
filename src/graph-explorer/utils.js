const ColorHash = require('color-hash');

let colorHash = new ColorHash({hue: [{min: 90, max: 230}, {min: 90, max: 230}, {min: 90, max: 230}]});

export function getColorForString(label) {
    return colorHash.hex(label); // '#8796c5'
}


export function getElementNameOrId(element) {
    if (element && element['properties'] && element['properties']['name']) {
        return element['properties']['name'];
    } else {
        return element['id'];
    }
}

export function centerElement(element, cy) {
    cy.center(element);

}
