
/* =========================================================
   ELEMENTOS
   ========================================================= */

const introScreen =
    document.getElementById("introScreen");

const gameScreen =
    document.getElementById("gameScreen");

const continueButton =
    document.getElementById("continueButton");

const canvas =
    document.getElementById("gameCanvas");

const ctx =
    canvas.getContext("2d");

const message =
    document.getElementById("message");

const waterFill =
    document.getElementById("waterFill");


/* =========================================================
   CANVAS PIXEL ART
   ========================================================= */

const pixelCanvas =
    document.createElement("canvas");

const pixelCtx =
    pixelCanvas.getContext("2d");

const PIXEL_WIDTH = 320;
const PIXEL_HEIGHT = 180;

pixelCanvas.width = PIXEL_WIDTH;
pixelCanvas.height = PIXEL_HEIGHT;


/*
 * Evitar suavizado.
 */

pixelCtx.imageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;


/* =========================================================
   ESTADO
   ========================================================= */

let width = 0;
let height = 0;

let gameStarted = false;

let flowersPlanted = false;

let watering = false;

let pointerX = 0;
let pointerY = 0;


/* =========================================================
   FLORES
   ========================================================= */

const flowers = [];


/*
 * Colores naturales.
 */

const flowerColors = [
    "#e53935",
    "#ef5350",
    "#f06292",
    "#ec407a",
    "#ff7043",
    "#ff8a65",
    "#ffd54f",
    "#fff3c4",
    "#f5f5dc",
    "#ce93d8",
    "#ab47bc",
    "#ba68c8"
];


/* =========================================================
   RESIZE
   ========================================================= */

function resizeCanvas() {

    const ratio =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );

    width =
        window.innerWidth;

    height =
        window.innerHeight;

    canvas.width =
        width * ratio;

    canvas.height =
        height * ratio;

    canvas.style.width =
        width + "px";

    canvas.style.height =
        height + "px";

    ctx.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
    );

    ctx.imageSmoothingEnabled = false;
}

window.addEventListener(
    "resize",
    resizeCanvas
);


/* =========================================================
   UTILIDADES
   ========================================================= */

function random(min, max) {

    return Math.random() *
        (max - min) +
        min;
}


function randomInt(min, max) {

    return Math.floor(
        random(min, max + 1)
    );
}


function clamp(value, min, max) {

    return Math.max(
        min,
        Math.min(max, value)
    );
}


/* =========================================================
   INICIO
   ========================================================= */

continueButton.addEventListener(
    "click",
    startGame
);


function startGame() {

    introScreen.style.display =
        "none";

    gameScreen.classList.remove(
        "hidden"
    );

    gameStarted = true;

    resizeCanvas();

    requestAnimationFrame(gameLoop);
}


/* =========================================================
   CREAR MUCHAS FLORES
   ========================================================= */

function plantFlowers() {

    flowers.length = 0;

    /*
     * Entre 20 y 26 flores.
     */

    const amount =
        randomInt(20, 26);

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        flowers.push({

            /*
             * Posición horizontal.
             *
             * Se concentra en la zona de
             * la maceta pero tiene pequeñas
             * variaciones.
             */

            x:
                random(
                    0.20,
                    0.80
                ),

            /*
             * Cada planta tiene una altura
             * ligeramente distinta.
             */

            maxHeight:
                random(
                    0.70,
                    1.12
                ),

            /*
             * Crecimiento inicial.
             */

            growth: 0,

            /*
             * Tamaño de la flor.
             */

            size:
                random(
                    0.75,
                    1.15
                ),

            /*
             * Color.
             */

            color:
                flowerColors[
                    randomInt(
                        0,
                        flowerColors.length - 1
                    )
                ],

            /*
             * Cada flor se mueve ligeramente
             * diferente a las demás.
             */

            windOffset:
                random(
                    0,
                    Math.PI * 2
                ),

            windSpeed:
                random(
                    0.8,
                    1.2
                ),

            /*
             * Inclinación natural.
             */

            lean:
                random(
                    -0.12,
                    0.12
                )
        });
    }

    flowersPlanted = true;

    message.textContent =
        "¡Eso son muchas flores! Mantén pulsado sobre la tierra para regarlas.";
}


/* =========================================================
   LOOP
   ========================================================= */

function gameLoop(time) {

    if (!gameStarted) {
        return;
    }

    updatePlants();

    drawScene(time);

    requestAnimationFrame(gameLoop);
}


/* =========================================================
   CRECIMIENTO
   ========================================================= */

function updatePlants() {

    /*
     * Aquí está la regla importante:
     *
     * SOLO crecen mientras watering
     * sea true.
     */

    if (!watering) {
        return;
    }

    flowers.forEach(
        flower => {

            flower.growth +=
                0.0025;

            flower.growth =
                clamp(
                    flower.growth,
                    0,
                    1
                );
        }
    );


    /*
     * Actualizar barra.
     */

    const average =
        flowers.reduce(
            (total, flower) =>
                total + flower.growth,
            0
        ) /
        flowers.length;

    waterFill.style.width =
        `${average * 100}%`;
}


/* =========================================================
   ESCENA
   ========================================================= */

function drawScene(time) {

    /*
     * Dibujamos TODO a 320x180.
     */

    pixelCtx.clearRect(
        0,
        0,
        PIXEL_WIDTH,
        PIXEL_HEIGHT
    );

    drawPixelSky();

    drawPixelSun();

    drawPixelClouds();

    drawPixelMountains();

    drawPixelHills();

    drawPixelGround();

    drawPixelGrass();

    drawPixelPot();

    if (flowersPlanted) {

        drawPixelFlowers(time);

        if (watering) {
            drawWaterDrops();
        }

        drawWateringCan();
    }


    /*
     * Ahora escalamos el pequeño canvas
     * hasta ocupar toda la pantalla.
     */

    ctx.clearRect(
        0,
        0,
        width,
        height
    );

    ctx.imageSmoothingEnabled =
        false;

    ctx.drawImage(
        pixelCanvas,
        0,
        0,
        width,
        height
    );
}


/* =========================================================
   CIELO PIXEL ART
   ========================================================= */

function drawPixelSky() {

    pixelCtx.fillStyle =
        "#73c9ed";

    pixelCtx.fillRect(
        0,
        0,
        320,
        180
    );


    /*
     * Bandas de cielo.
     */

    pixelCtx.fillStyle =
        "#81d0ee";

    pixelCtx.fillRect(
        0,
        35,
        320,
        30
    );

    pixelCtx.fillStyle =
        "#91d7ef";

    pixelCtx.fillRect(
        0,
        65,
        320,
        30
    );
}


/* =========================================================
   SOL
   ========================================================= */

function drawPixelSun() {

    pixelCtx.fillStyle =
        "#ffe68a";

    pixelCtx.fillRect(
        255,
        22,
        22,
        22
    );

    pixelCtx.fillRect(
        251,
        27,
        30,
        12
    );
}


/* =========================================================
   NUBES
   ========================================================= */

function drawPixelClouds() {

    drawCloud(
        45,
        27,
        1
    );

    drawCloud(
        185,
        43,
        0.75
    );
}


function drawCloud(
    x,
    y,
    size
) {

    const s =
        Math.round(8 * size);

    pixelCtx.fillStyle =
        "#ffffff";

    pixelCtx.fillRect(
        x,
        y,
        s * 6,
        s * 2
    );

    pixelCtx.fillRect(
        x + s,
        y - s,
        s * 3,
        s
    );

    pixelCtx.fillRect(
        x + s * 2,
        y - s * 2,
        s * 2,
        s
    );
}


/* =========================================================
   MONTAÑAS
   ========================================================= */

function drawPixelMountains() {

    /*
     * Montañas lejanas.
     */

    pixelCtx.fillStyle =
        "#8dbb62";

    pixelCtx.beginPath();

    pixelCtx.moveTo(0, 100);

    pixelCtx.lineTo(35, 62);
    pixelCtx.lineTo(62, 90);

    pixelCtx.lineTo(100, 53);
    pixelCtx.lineTo(140, 94);

    pixelCtx.lineTo(180, 58);
    pixelCtx.lineTo(220, 95);

    pixelCtx.lineTo(260, 60);
    pixelCtx.lineTo(320, 98);

    pixelCtx.lineTo(320, 180);
    pixelCtx.lineTo(0, 180);

    pixelCtx.closePath();

    pixelCtx.fill();


    /*
     * Montañas cercanas.
     */

    pixelCtx.fillStyle =
        "#589447";

    pixelCtx.beginPath();

    pixelCtx.moveTo(0, 112);

    pixelCtx.lineTo(55, 75);
    pixelCtx.lineTo(95, 105);

    pixelCtx.lineTo(135, 72);
    pixelCtx.lineTo(175, 111);

    pixelCtx.lineTo(225, 76);
    pixelCtx.lineTo(275, 112);

    pixelCtx.lineTo(320, 83);

    pixelCtx.lineTo(320, 180);
    pixelCtx.lineTo(0, 180);

    pixelCtx.closePath();

    pixelCtx.fill();


    /*
     * Zonas de sombra.
     */

    pixelCtx.fillStyle =
        "#477d3e";

    pixelCtx.fillRect(
        48,
        91,
        12,
        20
    );

    pixelCtx.fillRect(
        80,
        100,
        18,
        12
    );

    pixelCtx.fillRect(
        163,
        101,
        15,
        14
    );

    pixelCtx.fillRect(
        255,
        99,
        20,
        13
    );
}


/* =========================================================
   COLINAS
   ========================================================= */

function drawPixelHills() {

    pixelCtx.fillStyle =
        "#65a849";

    pixelCtx.beginPath();

    pixelCtx.moveTo(
        0,
        115
    );

    pixelCtx.quadraticCurveTo(
        50,
        91,
        105,
        119
    );

    pixelCtx.quadraticCurveTo(
        165,
        91,
        220,
        120
    );

    pixelCtx.quadraticCurveTo(
        270,
        94,
        320,
        119
    );

    pixelCtx.lineTo(
        320,
        180
    );

    pixelCtx.lineTo(
        0,
        180
    );

    pixelCtx.closePath();

    pixelCtx.fill();
}


/* =========================================================
   SUELO
   ========================================================= */

function drawPixelGround() {

    pixelCtx.fillStyle =
        "#69a94a";

    pixelCtx.fillRect(
        0,
        120,
        320,
        60
    );


    /*
     * Franja de tierra.
     */

    pixelCtx.fillStyle =
        "#5c913e";

    pixelCtx.fillRect(
        0,
        120,
        320,
        5
    );
}


/* =========================================================
   HIERBA
   ========================================================= */

function drawPixelGrass() {

    /*
     * SIN RUIDO ALEATORIO.
     *
     * Los detalles están colocados
     * manualmente para mantener
     * el aspecto limpio.
     */

    pixelCtx.fillStyle =
        "#4e8d3b";

    const grass = [
        [12,130],
        [27,143],
        [43,127],
        [62,151],
        [79,136],
        [97,157],
        [117,131],
        [140,145],
        [160,128],
        [179,153],
        [198,137],
        [218,158],
        [239,130],
        [260,148],
        [280,133],
        [300,151]
    ];

    grass.forEach(
        ([x, y]) => {

            pixelCtx.fillRect(
                x,
                y,
                2,
                7
            );

            pixelCtx.fillRect(
                x + 3,
                y + 3,
                2,
                4
            );
        }
    );
}


/* =========================================================
   MACETA
   ========================================================= */

function getPot() {

    return {

        x: 112,

        y: 122,

        width: 96,

        height: 46
    };
}


function drawPixelPot() {

    const pot =
        getPot();

    /*
     * Sombra.
     */

    pixelCtx.fillStyle =
        "#477735";

    pixelCtx.fillRect(
        pot.x + 10,
        pot.y + pot.height,
        pot.width - 20,
        5
    );


    /*
     * Cuerpo.
     */

    pixelCtx.fillStyle =
        "#bd5932";

    pixelCtx.fillRect(
        pot.x + 8,
        pot.y + 10,
        pot.width - 16,
        35
    );


    /*
     * Parte iluminada.
     */

    pixelCtx.fillStyle =
        "#d87342";

    pixelCtx.fillRect(
        pot.x + 15,
        pot.y + 13,
        10,
        28
    );


    /*
     * Borde.
     */

    pixelCtx.fillStyle =
        "#9f4529";

    pixelCtx.fillRect(
        pot.x,
        pot.y,
        pot.width,
        14
    );


    /*
     * Tierra.
     */

    pixelCtx.fillStyle =
        "#54331f";

    pixelCtx.fillRect(
        pot.x + 5,
        pot.y + 4,
        pot.width - 10,
        10
    );


    /*
     * Detalles de tierra limpios.
     */

    pixelCtx.fillStyle =
        "#75462b";

    pixelCtx.fillRect(
        pot.x + 15,
        pot.y + 6,
        8,
        3
    );

    pixelCtx.fillRect(
        pot.x + 42,
        pot.y + 8,
        7,
        2
    );

    pixelCtx.fillRect(
        pot.x + 67,
        pot.y + 5,
        10,
        3
    );
}


/* =========================================================
   FLORES
   ========================================================= */

function drawPixelFlowers(time) {

    const pot =
        getPot();

    flowers.forEach(
        flower => {

            /*
             * Posición X.
             */

            const x =
                pot.x +
                pot.width *
                flower.x;


            /*
             * Altura.
             */

            const maxHeight =
                55 *
                flower.maxHeight;

            const stemHeight =
                maxHeight *
                flower.growth;


            /*
             * Viento.
             */

            const wind =
                Math.sin(
                    time *
                    0.002 *
                    flower.windSpeed +
                    flower.windOffset
                ) *
                (1 +
                stemHeight * 0.045);


            /*
             * Pequeña inclinación
             * individual.
             */

            const lean =
                flower.lean *
                stemHeight;


            const topX =
                x +
                wind +
                lean;

            const topY =
                pot.y -
                stemHeight;


            /*
             * TALLO
             */

            pixelCtx.strokeStyle =
                "#34783c";

            pixelCtx.lineWidth =
                2;

            pixelCtx.beginPath();

            pixelCtx.moveTo(
                x,
                pot.y + 5
            );

            pixelCtx.lineTo(
                topX,
                topY
            );

            pixelCtx.stroke();


            /*
             * HOJAS.
             */

            if (
                flower.growth >
                0.25
            ) {

                drawPixelLeaf(
                    x +
                    (topX - x) * 0.45,

                    pot.y -
                    stemHeight * 0.45,

                    -1
                );
            }

            if (
                flower.growth >
                0.4
            ) {

                drawPixelLeaf(
                    x +
                    (topX - x) * 0.65,

                    pot.y -
                    stemHeight * 0.65,

                    1
                );
            }


            /*
             * FLOR.
             */

            if (
                flower.growth >
                0.65
            ) {

                const size =
                    3.5 *
                    flower.size;

                drawPixelFlower(
                    topX,
                    topY,
                    size,
                    flower.color
                );
            }
        }
    );
}


/* =========================================================
   HOJA
   ========================================================= */

function drawPixelLeaf(
    x,
    y,
    direction
) {

    pixelCtx.fillStyle =
        "#3d8243";

    pixelCtx.fillRect(
        x,
        y,
        7 * direction,
        3
    );

    pixelCtx.fillRect(
        x +
        5 * direction,
        y - 2,
        5 * direction,
        3
    );
}


/* =========================================================
   FLOR PIXEL ART
   ========================================================= */

function drawPixelFlower(
    x,
    y,
    size,
    color
) {

    /*
     * Pétalos cuadrados,
     * pero con una silueta irregular
     * para que parezca pixel art.
     */

    pixelCtx.fillStyle =
        color;

    /*
     * Pétalo superior.
     */

    pixelCtx.fillRect(
        x - size,
        y - size * 2,
        size * 2,
        size
    );

    /*
     * Pétalo izquierdo.
     */

    pixelCtx.fillRect(
        x - size * 2,
        y - size,
        size,
        size * 2
    );

    /*
     * Pétalo derecho.
     */

    pixelCtx.fillRect(
        x + size,
        y - size,
        size,
        size * 2
    );

    /*
     * Pétalo inferior.
     */

    pixelCtx.fillRect(
        x - size,
        y + size,
        size * 2,
        size
    );


    /*
     * Píxeles adicionales.
     */

    pixelCtx.fillRect(
        x - size * 2,
        y - size * 0.5,
        size,
        size
    );

    pixelCtx.fillRect(
        x + size,
        y - size * 0.5,
        size,
        size
    );


    /*
     * Centro amarillo.
     */

    pixelCtx.fillStyle =
        "#e5b83b";

    pixelCtx.fillRect(
        x - size * 0.6,
        y - size * 0.6,
        size * 1.2,
        size * 1.2
    );
}


/* =========================================================
   REGADERA
   ========================================================= */

function drawWateringCan() {

    let x =
        pointerX / width *
        PIXEL_WIDTH;

    let y =
        pointerY / height *
        PIXEL_HEIGHT;


    /*
     * Si el cursor está fuera,
     * colocarla abajo a la derecha.
     */

    if (
        pointerX === 0 &&
        pointerY === 0
    ) {

        x = 275;
        y = 145;
    }


    /*
     * La regadera se mantiene
     * cerca del dedo/cursor.
     */

    pixelCtx.fillStyle =
        "#0b6f73";

    /*
     * Asa.
     */

    pixelCtx.strokeStyle =
        "#07575b";

    pixelCtx.lineWidth =
        3;

    pixelCtx.beginPath();

    pixelCtx.arc(
        x - 3,
        y - 3,
        9,
        Math.PI,
        Math.PI * 1.8
    );

    pixelCtx.stroke();


    /*
     * Cuerpo.
     */

    pixelCtx.fillStyle =
        "#16848a";

    pixelCtx.fillRect(
        x - 10,
        y,
        18,
        12
    );


    /*
     * Pico.
     */

    pixelCtx.fillStyle =
        "#07575b";

    pixelCtx.fillRect(
        x + 7,
        y + 2,
        15,
        3
    );

    pixelCtx.fillRect(
        x + 18,
        y,
        5,
        5
    );


    /*
     * Agua cayendo.
     */

    if (watering) {

        pixelCtx.fillStyle =
            "#66d7eb";

        pixelCtx.fillRect(
            x + 19,
            y + 6,
            2,
            8
        );

        pixelCtx.fillRect(
            x + 22,
            y + 8,
            2,
            8
        );
    }
}


/* =========================================================
   GOTAS DE AGUA
   ========================================================= */

function drawWaterDrops() {

    /*
     * Varias gotas cayendo sobre
     * diferentes zonas de la maceta.
     */

    pixelCtx.fillStyle =
        "#63d8ec";

    const pot =
        getPot();

    const drops = [
        [pot.x + 22, pot.y - 8],
        [pot.x + 39, pot.y - 14],
        [pot.x + 57, pot.y - 7],
        [pot.x + 75, pot.y - 12]
    ];

    drops.forEach(
        ([x, y]) => {

            pixelCtx.fillRect(
                x,
                y,
                2,
                6
            );
        }
    );
}


/* =========================================================
   PLANTAR AL TOCAR LA MACETA
   ========================================================= */

function tryPlant(
    x,
    y
) {

    if (flowersPlanted) {
        return;
    }

    const pot =
        getPot();

    /*
     * Área algo mayor que la maceta
     * para que sea fácil tocarla en móvil.
     */

    const inside =
        x >= pot.x - 12 &&
        x <= pot.x + pot.width + 12 &&
        y >= pot.y - 15 &&
        y <= pot.y + pot.height + 15;

    if (!inside) {
        return;
    }

    plantFlowers();
}


/* =========================================================
   ¿ESTÁ SOBRE LA TIERRA?
   ========================================================= */

function isOverSoil(
    x,
    y
) {

    const pot =
        getPot();

    return (
        x >= pot.x &&
        x <= pot.x + pot.width &&
        y >= pot.y &&
        y <= pot.y + 20
    );
}


/* =========================================================
   CONVERTIR COORDENADAS
   ========================================================= */

function getPointerPosition(
    clientX,
    clientY
) {

    const rect =
        canvas.getBoundingClientRect();

    pointerX =
        clientX -
        rect.left;

    pointerY =
        clientY -
        rect.top;

    return {

        x:
            pointerX /
            width *
            PIXEL_WIDTH,

        y:
            pointerY /
            height *
            PIXEL_HEIGHT
    };
}


/* =========================================================
   RATÓN
   ========================================================= */

canvas.addEventListener(
    "mousedown",
    event => {

        const position =
            getPointerPosition(
                event.clientX,
                event.clientY
            );


        /*
         * Primero plantar.
         */

        if (!flowersPlanted) {

            tryPlant(
                position.x,
                position.y
            );

            return;
        }


        /*
         * Después regar.
         */

        if (
            isOverSoil(
                position.x,
                position.y
            )
        ) {

            watering = true;
        }
    }
);


canvas.addEventListener(
    "mousemove",
    event => {

        const position =
            getPointerPosition(
                event.clientX,
                event.clientY
            );

        if (
            flowersPlanted &&
            event.buttons > 0
        ) {

            watering =
                isOverSoil(
                    position.x,
                    position.y
                );
        }
    }
);


canvas.addEventListener(
    "mouseup",
    () => {

        watering = false;

    }
);


canvas.addEventListener(
    "mouseleave",
    () => {

        watering = false;

    }
);


/* =========================================================
   MÓVIL
   ========================================================= */

canvas.addEventListener(
    "touchstart",
    event => {

        event.preventDefault();

        const touch =
            event.touches[0];

        const position =
            getPointerPosition(
                touch.clientX,
                touch.clientY
            );


        /*
         * Plantar.
         */

        if (!flowersPlanted) {

            tryPlant(
                position.x,
                position.y
            );

            return;
        }


        /*
         * Regar.
         */

        if (
            isOverSoil(
                position.x,
                position.y
            )
        ) {

            watering = true;
        }

    },
    {
        passive: false
    }
);


canvas.addEventListener(
    "touchmove",
    event => {

        event.preventDefault();

        const touch =
            event.touches[0];

        const position =
            getPointerPosition(
                touch.clientX,
                touch.clientY
            );


        if (flowersPlanted) {

            watering =
                isOverSoil(
                    position.x,
                    position.y
                );
        }

    },
    {
        passive: false
    }
);


canvas.addEventListener(
    "touchend",
    event => {

        event.preventDefault();

        watering = false;

    },
    {
        passive: false
    }
);


/* =========================================================
   INICIAR CANVAS
   ========================================================= */

resizeCanvas();