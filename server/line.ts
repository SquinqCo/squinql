interface AttributeValues {
    spikey: number,
    isSmooth: boolean
}

// let values
let attributeValues: Record<string, AttributeValues> = {'a': {spikey: 1, isSmooth: true}, 'b': {spikey: 2, isSmooth: true}, 'c': {spikey: 0, isSmooth: true}, 'd': {spikey: 1, isSmooth: true}, 'e': {spikey: 1, isSmooth: true}, 'f': {spikey: 3, isSmooth: false}, 'g': {spikey: 2, isSmooth: true}, 'h': {spikey: 4, isSmooth: false}, 'i': {spikey: 5, isSmooth: false}, 'j': {spikey: 4, isSmooth: false}, 'k': {spikey: 5, isSmooth: false}, 'l': {spikey: 5, isSmooth: false}, 'm': {spikey: 2, isSmooth: true}, 'n': {spikey: 2, isSmooth: true}, 'o': {spikey: 0, isSmooth: true}, 'p': {spikey: 2, isSmooth: true}, 'q': {spikey: 3, isSmooth: true}, 'r': {spikey: 5, isSmooth: true}, 's': {spikey: 1, isSmooth: true}, 't': {spikey: 4, isSmooth: false}, 'u': {spikey: 3, isSmooth: true}, 'v': {spikey: 1, isSmooth: false}, 'w': {spikey: 4, isSmooth: false}, 'x': {spikey: 6, isSmooth: false}, 'y': {spikey: 4, isSmooth: false}, 'z': {spikey: 2, isSmooth: false}}

// Generate a squing using (the letters)
export function generateSquinq(sequence: string, startingDirection: number, startingPoint: number) {
    // Start with straight vector
    let vector: Array<Array<number>> = [[0, 0], [50, 0], [100, 0], [150, 0], [200, 0]]

    // now factor in sharpness depending on the point score of the values
    let vector1 = ((1 - 2 * Math.round(Math.random())) * (attributeValues[sequence.charAt(0)].spikey + Math.random()*8-4))*5
    let vector2 = ((1 - 2 * Math.round(Math.random())) * (attributeValues[sequence.charAt(0)].spikey + Math.random()*8-4))*10
    let vector3 = ((1 - 2 * Math.round(Math.random())) * (attributeValues[sequence.charAt(0)].spikey + Math.random()*8-4))*5

    console.log(vector1, vector2, vector3)

    vector[1][1] = vector1
    vector[2][1] = vector2
    vector[3][1] = vector3

    // Now take those values, generate line and smooth out depending on the smooth values
    // jk
    let isSmooth = attributeValues[sequence.charAt(0)].isSmooth

    // Now we draw our shape
    // var svgLine = `<path d="M${vector[0][0]*50} ${vector[0][1]+100} ${isSmooth ? "T" : "L"}${vector[1][0]*50} ${vector[1][1]+100} ${isSmooth ? "T" : "L"}${vector[2][0]*50} ${vector[2][1]+100} ${isSmooth ? "T" : "L"}${vector[3][0]*50} ${vector[3][1]+100} ${isSmooth ? "T" : "L"}${vector[4][0]*50} ${vector[4][1]+100}" stroke-width="3" stroke="red" fill="none"/>`    
    var svgLine = `M${vector[0][0]+startingPoint} ${vector[0][1]+100} ${isSmooth ? "T" : "L"}${vector[1][0]+startingPoint} ${vector[1][1]+100} ${isSmooth ? "T" : "L"}${vector[2][0]+startingPoint} ${vector[2][1]+100} ${isSmooth ? "T" : "L"}${vector[3][0]+startingPoint} ${vector[3][1]+100} ${isSmooth ? "T" : "L"}${vector[4][0]+startingPoint} ${vector[4][1]+100}`    

    return svgLine
}