const ColorHash = require('color-hash');

let colorHash = new ColorHash({hue: [{min: 90, max: 230}, {min: 90, max: 230}, {min: 90, max: 230}]});

export function getColorForString(label) {
    return colorHash.hex(label); // '#8796c5'
}
