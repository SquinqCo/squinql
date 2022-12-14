"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSquinq = void 0;
// let values
let attributeValues = { 'a': { spikey: 1, isSmooth: true }, 'b': { spikey: 2, isSmooth: true }, 'c': { spikey: 0, isSmooth: true }, 'd': { spikey: 1, isSmooth: true }, 'e': { spikey: 1, isSmooth: true }, 'f': { spikey: 3, isSmooth: false }, 'g': { spikey: 2, isSmooth: true }, 'h': { spikey: 4, isSmooth: false }, 'i': { spikey: 5, isSmooth: false }, 'j': { spikey: 4, isSmooth: false }, 'k': { spikey: 5, isSmooth: false }, 'l': { spikey: 5, isSmooth: false }, 'm': { spikey: 2, isSmooth: true }, 'n': { spikey: 2, isSmooth: true }, 'o': { spikey: 0, isSmooth: true }, 'p': { spikey: 2, isSmooth: true }, 'q': { spikey: 3, isSmooth: true }, 'r': { spikey: 5, isSmooth: true }, 's': { spikey: 1, isSmooth: true }, 't': { spikey: 4, isSmooth: false }, 'u': { spikey: 3, isSmooth: true }, 'v': { spikey: 1, isSmooth: false }, 'w': { spikey: 4, isSmooth: false }, 'x': { spikey: 6, isSmooth: false }, 'y': { spikey: 4, isSmooth: false }, 'z': { spikey: 2, isSmooth: false } };
// Generate a squing using (the letters)
function generateSquinq(sequence, startingDirection) {
    // Start with straight vector
    let vector = [[0, 50], [1, 50], [2, 50], [3, 50], [4, 50]];
    // now factor in sharpness depending on the point score of the values
    vector[1][1] = vector[1][1] + ((Math.floor(Math.random() * 3) - 2)) * (attributeValues[sequence.charAt(0)].spikey * 5) / 3;
    vector[2][1] = vector[2][1] + ((Math.floor(Math.random() * 3) - 2)) * (attributeValues[sequence.charAt(0)].spikey * 5);
    vector[3][1] = vector[3][1] + ((Math.floor(Math.random() * 3) - 2)) * (attributeValues[sequence.charAt(0)].spikey * 5) / 3;
    // vector[3][1] = vector[3][1] + ((Math.floor(Math.random()*3) - 2)) * (attributeValues[sequence.charAt(1)].spikey * 50)
    // Now take those values, generate line and smooth out depending on the smooth values
    // jk
    // Now we draw our shape
    var svgLine = `<svg height="500" width="500">
    <path d="M${vector[0][0] * 50} ${vector[0][1]} L${vector[1][0] * 50} ${vector[1][1]} L${vector[2][0] * 50} ${vector[2][1]} L${vector[3][0] * 50} ${vector[3][1]} L${vector[4][0] * 50} ${vector[4][1]}" stroke="red" fill="none"/>
    </svg>
    `;
    // var svgLine = '<svg><path d="M0 0 l100 0 l150 100" fill-opacity="0" stroke="red"/></svg>'
    // <line x1="-2" y1="0" x2="-1" y2="${vector[1][1]}" x3="0" y3="0" x4="1" y4="${vector[3][1]}" x5="1" y5="200" style="stroke:rgb(255,0,0);stroke-width:2" />
    return svgLine;
}
exports.generateSquinq = generateSquinq;
