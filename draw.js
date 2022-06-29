'use strict';

import calc from './calc.js';

const draw = {

    c: false,
    ctx: false,
    path: [],
    pressed: false,
    iterations: 16,
    deviation: 10,
    lineWidth: 1,
    delayMeasurement: 30,

    render2() {
        let ctx = draw.ctx;
        ctx.lineWidth = draw.lineWidth;
        ctx.clearRect(0, 0, draw.c.width, draw.c.height);

        ctx.beginPath();

        for (let j = 0; j < draw.iterations; j++) {
            let [x, y] = draw.path[0].map(val => val + calc.createNumber(-(draw.deviation * 10) / 10, (draw.deviation * 10) / 10));

            ctx.moveTo(x, y)

            for (let i = 1; i < draw.path.length; i++) {
                let dev = draw.deviation;
                let [x0, y0] = draw.path[i - 1];
                let [x1, y1] = draw.path[i];

                let abstand = Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2);

                dev = dev / 30 * abstand;


                [x, y] = draw.path[i].map(val =>
                    val + calc.createNumber(-(dev * 10) / 10, (dev * 10) / 10)
                );
                ctx.lineTo(x, y);

                [x, y] = draw.path[i].map(val =>
                    val + calc.createNumber(-(dev * 10) / 10, (dev * 10) / 10)
                );
                ctx.moveTo(x, y);
            }
        }
        ctx.stroke();

        /* Debugging-Punkte
        for (let i = 0; i < draw.path.length; i++) {
            ctx.fillRect(...draw.path[i], 3, 3);
        }
        */
    },

    render() {
        let ctx = draw.ctx;
        ctx.lineWidth = draw.lineWidth;
        ctx.clearRect(0, 0, draw.c.width, draw.c.height);


        for (let j = 0; j < draw.iterations; j++) {
            ctx.beginPath();
            let [x, y] = draw.path[0].map(val => val + calc.createNumber(-(draw.deviation * 10) / 10, (draw.deviation * 10) / 10));

            ctx.moveTo(x, y)

            for (let i = 1; i < draw.path.length; i++) {
                let dev = draw.deviation;
                let [x0, y0] = draw.path[i - 1];
                let [x1, y1] = draw.path[i];

                let abstand = Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2);

                dev = dev / 30 * abstand;


                [x, y] = draw.path[i].map(val =>
                    val + calc.createNumber(-(dev * 10) / 10, (dev * 10) / 10)
                );

                ctx.lineTo(x, y)
            }

            ctx.strokeStyle = calc.createColor({
                minSat: 10,
                maxSat: 30,
                minLight: 30,
                maxLight: 50,
                minHue: 300,
                maxHue: 360
            })

            ctx.stroke();
        }

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