import cytoscape from "cytoscape";
import ColorHash from "color-hash";
import {defaultMenuItemConfig} from "./constants";
// const ColorHash = require('color-hash');

let colorHash = new ColorHash({hue: [{min: 90, max: 230}, {min: 90, max: 230}, {min: 90, max: 230}]});

export function getColorForString(label) {
    return colorHash.hex(label); // '#8796c5'
}

export function createCyInstance(cyOptions) {
    return cytoscape(cyOptions);
}


export function getElementNameOrId(element) {
    if (element && element['properties'] && element['properties']['name']) {
        return element['properties']['name'];
    } else {
        return element['id'];
    }
}


export function generateMenuItems(items, controller) {

    let menuItems = [];
    Object.keys(items).forEach(function (key) {
        let itemData = JSON.parse(JSON.stringify(defaultMenuItemConfig));
        itemData.content = key;
        itemData.select = (elem) => items[key](elem, controller);
        menuItems.push(itemData)
    });

    return menuItems;
}
