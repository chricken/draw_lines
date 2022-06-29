'use strict';

const calc = {
    createNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    },
    createColor({
        minSat = 80,
        maxSat = 100,
        minLight = 40,
        maxLight = 60,
        minHue = 0,
        maxHue = 360
    } = {}) {
        const cn = calc.createNumber;
        return `hsl(${cn(minHue, maxHue)}, ${cn(minSat, maxSat)}%, ${cn(minLight, maxLight)}%)`;
    }
}

export default calc;