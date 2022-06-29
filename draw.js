'use strict';

import calc from './calc.js';

const draw = {
    c: false,
    ctx: false,
    path: [],
    pressed: false,
    iterations: 8,
    deviation: 10,
    lineWidth: .5,
    delayMeasurement: 50,
    render() {
        let ctx = draw.ctx;
        ctx.lineWidth = draw.lineWidth;
        ctx.clearRect(0, 0, draw.c.width, draw.c.height);

        ctx.beginPath();

        for (let j = 0; j < draw.iterations; j++) {
            let [x, y] = draw.path[0].map(val => val + calc.createNumber(-(draw.deviation * 10) / 10, (draw.deviation * 10) / 10));
            ctx.moveTo(x, y)
            for (let i = 1; i < draw.path.length; i++) {
                [x, y] = draw.path[i].map(val => val + calc.createNumber(-(draw.deviation * 10) / 10, (draw.deviation * 10) / 10));
                ctx.lineTo(x, y)
            }
        }
        ctx.stroke();

        /* Debugging-Punkte
        for (let i = 0; i < draw.path.length; i++) {
            ctx.fillRect(...draw.path[i], 3, 3);
        }
        */
    },
    debounceMouseMove() {
        let enabled = true;
        return evt => {
            if (enabled && draw.pressed) {
                enabled = false;
                setTimeout(() => enabled = true, draw.delayMeasurement);
                draw.path.push([evt.layerX, evt.layerY]);
                draw.render();
            }
        }
    },
    handleMouseDown(evt) {
        draw.pressed = true;
        draw.path.length = 0;
    },
    handleMouseUp(evt) {
        draw.pressed = false;
    },
    domMapping() {
        draw.c = document.querySelector('#fg');
        draw.ctx = draw.c.getContext('2d');

        draw.c.addEventListener('mousedown', draw.handleMouseDown);
        draw.c.addEventListener('mouseup', draw.handleMouseUp);
        draw.c.addEventListener('mouseleave', draw.handleMouseUp);
        draw.c.addEventListener('mousemove', draw.debounceMouseMove());

    },
    init() {
        draw.domMapping();
    }
}

export default draw;