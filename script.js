
/* =========================================================
   TEXTOS
   ========================================================= */

const texts = [
    "Hola.",
    "¿Qué tal?",
    "Gracias por abrir la página.",
    "Y gracias tambien por querer seguir haciendo las actividades para ver el texto completo",
    "La verdad es que no sabía como llamar tu atención a algo tan absurdo.",
    "Así que he inventado esto para poder entretenerme y entretenerte.",
    "Es divertido ¿Verdad?",
    "Casi tanto como llevar un hospital de anomalías.",
    "O casi tanto como hacer una casa en un server vacío.",
    "Me he acordado mucho de esas cosas mientras hacía esto...",
    "Espero haberte hecho recordar eso a ti también.",
    "Este es mi primer experimento web.",
    "Y espero que te haya gustado."
];


/* =========================================================
   VARIABLES
   ========================================================= */

let currentScreen = 0;

const screen = document.getElementById("screen");
const content = document.getElementById("content");


/* =========================================================
   COLORES DE FONDO
   Cada pantalla puede tener una combinación ligeramente
   diferente de naranja/rojo.
   ========================================================= */

const backgrounds = [
    ["#ff7b22", "#d84315"],
    ["#ff9f43", "#c62828"],
    ["#f4511e", "#b71c1c"],
    ["#ff8a3d", "#9e1b1b"],
    ["#ff7043", "#8e1b1b"],
    ["#ff9800", "#c62828"],
    ["#ff6f00", "#b71c1c"],
    ["#f4511e", "#7f1d1d"],
    ["#ff8a65", "#a91d1d"],
    ["#ff7b22", "#9b2226"],
    ["#f4511e", "#8e1b1b"],
    ["#ff9800", "#a51c30"],
    ["#ff7043", "#7f1d1d"]
];


/* =========================================================
   CAMBIAR FONDO
   ========================================================= */

function updateBackground() {

    const colors = backgrounds[currentScreen];

    document.body.style.background =
        `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
}


/* =========================================================
   MOSTRAR PANTALLA
   ========================================================= */

function renderScreen() {

    screen.classList.add("fade-out");

    setTimeout(() => {

        content.innerHTML = "";

        updateBackground();

        const text = document.createElement("div");

        text.className = "main-text";
        text.textContent = texts[currentScreen];

        content.appendChild(text);


        /*
         * La última pantalla no tiene actividad.
         */

        if (currentScreen === texts.length - 1) {

            const thanks = document.createElement("div");

            thanks.className = "thanks";
            thanks.textContent = "GRACIAS";

            content.appendChild(thanks);

        } else {

            /*
             * Cada pantalla tiene su propia actividad.
             */

            createActivity(currentScreen);

        }

        screen.classList.remove("fade-out");

    }, 350);
}


/* =========================================================
   IR A LA SIGUIENTE PANTALLA
   ========================================================= */

function nextScreen() {

    if (currentScreen >= texts.length - 1) {
        return;
    }

    currentScreen++;

    renderScreen();
}


/* =========================================================
   UTILIDAD PARA CREAR ELEMENTOS
   ========================================================= */

function createElement(tag, className, text = "") {

    const element = document.createElement(tag);

    if (className) {
        element.className = className;
    }

    if (text) {
        element.textContent = text;
    }

    return element;
}


/* =========================================================
   CREAR ACTIVIDAD
   ========================================================= */

function createActivity(index) {

    switch (index) {

        case 0:
            activityOne();
            break;

        case 1:
            activityTwo();
            break;

        case 2:
            activityThree();
            break;

        case 3:
            activityFour();
            break;

        case 4:
            activityFive();
            break;

        case 5:
            activitySix();
            break;

        case 6:
            activitySeven();
            break;

        case 7:
            activityEight();
            break;

        case 8:
            activityNine();
            break;

        case 9:
            activityTen();
            break;

        case 10:
            activityEleven();
            break;

        case 11:
            activityTwelve();
            break;

        case 12:
            activityThirteen();
            break;
    }
}


/* =========================================================
   ACTIVIDAD 1
   BOTÓN DIRECTAMENTE DESBLOQUEADO
   ========================================================= */

function activityOne() {

    const button = createElement(
        "button",
        "",
        "CONTINUAR"
    );

    button.addEventListener("click", nextScreen);

    content.appendChild(button);
}


/* =========================================================
   ACTIVIDAD 2
   ESTADO DE ÁNIMO
   ========================================================= */

function activityTwo() {

    const instructions = createElement(
        "div",
        "instructions",
        "Elige una opción. No hay respuestas correctas."
    );

    content.appendChild(instructions);

    const group = createElement("div", "button-group");

    const options = [
        "Bien",
        "Regular",
        "Mal",
        "???"
    ];

    options.forEach(option => {

        const button = createElement("button", "", option);

        button.addEventListener("click", nextScreen);

        group.appendChild(button);
    });

    content.appendChild(group);
}


/* =========================================================
   ACTIVIDAD 3
   ENCONTRAR EL BOTÓN
   ========================================================= */

function activityThree() {

    const instructions = createElement(
        "div",
        "instructions",
        "Encuentra el único botón que realmente sirve."
    );

    content.appendChild(instructions);

    const area = createElement(
        "div",
        "button-maze"
    );

    const fakeTexts = [
        "No",
        "Tampoco",
        "Ese no",
        "Nope",
        "Aquí no",
        "Prueba otro",
        "Casi",
        "Definitivamente no",
        "¿Este?",
        "NO"
    ];

    fakeTexts.forEach((text, index) => {

        const button = createElement(
            "button",
            "fake-button",
            text
        );

        const x = Math.random() * 80 + 5;
        const y = Math.random() * 70 + 10;

        button.style.left = `${x}%`;
        button.style.top = `${y}%`;

        button.addEventListener("click", () => {

            button.textContent = "Te has equivocado.";

            setTimeout(() => {
                button.textContent = text;
            }, 500);

        });

        area.appendChild(button);
    });


    /*
     * El botón verdadero.
     */

    const correct = createElement(
        "button",
        "fake-button",
        "ESTE"
    );

    correct.style.left = "50%";
    correct.style.top = "45%";

    correct.addEventListener("click", nextScreen);

    area.appendChild(correct);

    content.appendChild(area);
}


/* =========================================================
   ACTIVIDAD 4
   MEMORIA
   ========================================================= */

function activityFour() {

    const instructions = createElement(
        "div",
        "instructions",
        "Memoriza el orden de los símbolos. Después tendrás que repetirlo."
    );

    content.appendChild(instructions);

    const grid = createElement(
        "div",
        "memory-grid"
    );

    const symbols = ["◆", "●", "▲", "■"];

    symbols.forEach(symbol => {

        const button = createElement(
            "button",
            "memory-tile",
            symbol
        );

        button.dataset.symbol = symbol;

        grid.appendChild(button);
    });

    content.appendChild(grid);

    const feedback = createElement(
        "div",
        "feedback"
    );

    content.appendChild(feedback);


    const tiles = [...grid.children];

    const sequence = [];

    for (let i = 0; i < 4; i++) {

        sequence.push(
            Math.floor(Math.random() * 4)
        );
    }


    /*
     * Mostrar secuencia.
     */

    let position = 0;

    setTimeout(() => {

        const interval = setInterval(() => {

            tiles.forEach(tile => {
                tile.classList.remove("active");
            });

            tiles[sequence[position]].classList.add("active");

            setTimeout(() => {
                tiles[sequence[position]].classList.remove("active");
            }, 350);

            position++;

            if (position >= sequence.length) {

                clearInterval(interval);

                setTimeout(() => {

                    let playerPosition = 0;

                    tiles.forEach((tile, index) => {

                        tile.addEventListener("click", () => {

                            if (
                                index === sequence[playerPosition]
                            ) {

                                playerPosition++;

                                tile.classList.add("active");

                                setTimeout(() => {
                                    tile.classList.remove("active");
                                }, 150);

                                if (
                                    playerPosition === sequence.length
                                ) {
                                    nextScreen();
                                }

                            } else {

                                playerPosition = 0;

                                feedback.textContent =
                                    "No era ese orden. Prueba otra vez.";
                            }

                        });

                    });

                }, 500);

            }

        }, 650);

    }, 800);
}


/* =========================================================
   ACTIVIDAD 5
   BOTÓN QUE SE MUEVE
   ========================================================= */

function activityFive() {

    const instructions = createElement(
        "div",
        "instructions",
        "Pulsa el botón que dice <strong>ESTE</strong>. No será tan fácil."
    );

    content.appendChild(instructions);

    const button = createElement(
        "button",
        "",
        "ESTE"
    );

    content.appendChild(button);

    let moving = true;

    function moveButton() {

        if (!moving) {
            return;
        }

        const x = Math.random() * 70 - 35;
        const y = Math.random() * 60 - 30;

        button.style.transform =
            `translate(${x}px, ${y}px)`;
    }

    const interval = setInterval(moveButton, 600);

    button.addEventListener("click", () => {

        moving = false;

        clearInterval(interval);

        nextScreen();
    });
}


/* =========================================================
   ACTIVIDAD 6
   REACCIÓN
   ========================================================= */

function activitySix() {

    const instructions = createElement(
        "div",
        "instructions",
        "Cuando empiece la cuenta atrás, espera. Cuando aparezca el círculo, púlsalo lo más rápido posible."
    );

    content.appendChild(instructions);

    const countdown = createElement(
        "div",
        "countdown",
        "3"
    );

    content.appendChild(countdown);

    const area = createElement(
        "div",
        "reaction-area"
    );

    const target = createElement(
        "button",
        "reaction-target",
        ""
    );

    area.appendChild(target);

    content.appendChild(area);


    let count = 3;

    const timer = setInterval(() => {

        count--;

        if (count > 0) {

            countdown.textContent = count;

        } else {

            clearInterval(timer);

            countdown.classList.add("hidden");

            target.style.left =
                `${Math.random() * 80 + 10}%`;

            target.style.top =
                `${Math.random() * 70 + 15}%`;

            target.style.display = "block";

            target.addEventListener(
                "click",
                nextScreen,
                { once: true }
            );
        }

    }, 1000);
}


/* =========================================================
   ACTIVIDAD 7
   CÓDIGO NUMÉRICO
   ========================================================= */

function activitySeven() {

    const instructions = createElement(
        "div",
        "instructions",
        "Pulsa los números en este orden: <strong>3 → 1 → 4</strong>"
    );

    content.appendChild(instructions);

    const display = createElement(
        "div",
        "number-display",
        ""
    );

    content.appendChild(display);

    const pad = createElement(
        "div",
        "number-pad"
    );

    const code = ["3", "1", "4"];

    let position = 0;

    for (let i = 1; i <= 9; i++) {

        const button = createElement(
            "button",
            "",
            String(i)
        );

        button.addEventListener("click", () => {

            if (String(i) === code[position]) {

                display.textContent += i;

                position++;

                if (position === code.length) {

                    setTimeout(nextScreen, 400);
                }

            } else {

                position = 0;
                display.textContent = "";

            }

        });

        pad.appendChild(button);
    }

    content.appendChild(pad);
}


/* =========================================================
   ACTIVIDAD 8
   HOSPITAL DE ANOMALÍAS
   ========================================================= */

function activityEight() {

    const instructions = createElement(
        "div",
        "instructions",
        "Algo no encaja. Encuentra la anomalía."
    );

    content.appendChild(instructions);

    const grid = createElement(
        "div",
        "anomaly-grid"
    );

    const anomalyPosition =
        Math.floor(Math.random() * 16);

    for (let i = 0; i < 16; i++) {

        const button = createElement(
            "button",
            "anomaly-item",
            "◆"
        );

        if (i === anomalyPosition) {

            button.textContent = "◇";

            button.addEventListener(
                "click",
                nextScreen
            );

        } else {

            button.addEventListener("click", () => {

                button.textContent = "✕";

                setTimeout(() => {
                    button.textContent = "◆";
                }, 300);

            });

        }

        grid.appendChild(button);
    }

    content.appendChild(grid);
}


/* =========================================================
   ACTIVIDAD 9
   CONSTRUIR UNA CASA
   ========================================================= */

function activityNine() {

    const instructions = createElement(
        "div",
        "instructions",
        "Construye una casa colocando <strong>8 bloques</strong> en la cuadrícula."
    );

    content.appendChild(instructions);

    const grid = createElement(
        "div",
        "house-grid"
    );

    let blocks = 0;

    for (let i = 0; i < 35; i++) {

        const cell = createElement(
            "button",
            "house-cell"
        );

        cell.addEventListener("click", () => {

            if (cell.classList.contains("built")) {
                return;
            }

            cell.classList.add("built");

            blocks++;

            if (blocks >= 8) {

                setTimeout(nextScreen, 500);
            }

        });

        grid.appendChild(cell);
    }

    content.appendChild(grid);
}


/* =========================================================
   ACTIVIDAD 10
   RECUERDO
   ========================================================= */

function activityTen() {

    const instructions = createElement(
        "div",
        "instructions",
        "Memoriza la palabra que aparece. Después tendrás que encontrarla."
    );

    content.appendChild(instructions);

    const word = createElement(
        "div",
        "remember-word",
        "NARANJA"
    );

    content.appendChild(word);

    const words = [
        "NARANJA",
        "HOSPITAL",
        "SERVER",
        "CASA"
    ];

    setTimeout(() => {

        word.textContent =
            "¿Cuál era?";

        const group = createElement(
            "div",
            "button-group"
        );

        words.forEach(option => {

            const button = createElement(
                "button",
                "",
                option
            );

            button.addEventListener("click", () => {

                if (option === "NARANJA") {
                    nextScreen();
                } else {
                    button.textContent = "No era esa.";
                }

            });

            group.appendChild(button);
        });

        content.appendChild(group);

    }, 1800);
}


/* =========================================================
   ACTIVIDAD 11
   SÍ / NO
   ========================================================= */

function activityEleven() {

    const instructions = createElement(
        "div",
        "instructions",
        "Después de todo esto... ¿te he hecho recordar esas cosas?"
    );

    content.appendChild(instructions);

    const group = createElement(
        "div",
        "button-group"
    );

    const yes = createElement(
        "button",
        "",
        "Sí"
    );

    const no = createElement(
        "button",
        "",
        "No"
    );

    yes.addEventListener("click", () => {

        instructions.textContent =
            "Me alegro.";

        setTimeout(nextScreen, 700);

    });

    no.addEventListener("click", () => {

        instructions.textContent =
            "Bueno... lo he intentado.";

        setTimeout(nextScreen, 700);

    });

    group.appendChild(yes);
    group.appendChild(no);

    content.appendChild(group);
}


/* =========================================================
   ACTIVIDAD 12
   EL BUG
   ========================================================= */

function activityTwelve() {

    const instructions = createElement(
        "div",
        "instructions",
        "Algo ha salido mal. Encuentra la forma de continuar."
    );

    content.appendChild(instructions);

    const button = createElement(
        "button",
        "",
        "CONTINUAR"
    );

    content.appendChild(button);


    let clicks = 0;

    button.addEventListener("click", () => {

        clicks++;

        if (clicks === 1) {

            button.textContent =
                "ERROR";

            button.classList.add("glitch");

        } else if (clicks === 2) {

            button.textContent =
                "404";

        } else if (clicks === 3) {

            button.textContent =
                "¿CONTINUAR?";

        } else if (clicks === 4) {

            button.classList.remove("glitch");

            nextScreen();
        }

    });
}


/* =========================================================
   ACTIVIDAD 13
   PRUEBA FINAL DE REACCIÓN
   ========================================================= */

function activityThirteen() {

    const instructions = createElement(
        "div",
        "instructions",
        "Última prueba. Espera a que llegue a <strong>0</strong> y pulsa el botón exactamente entonces."
    );

    content.appendChild(instructions);

    const number = createElement(
        "div",
        "precision-number",
        "3"
    );

    content.appendChild(number);

    const button = createElement(
        "button",
        "",
        "ESPERAR..."
    );

    button.disabled = true;

    content.appendChild(button);

    let value = 3;

    const timer = setInterval(() => {

        value--;

        number.textContent = value;

        if (value === 0) {

            clearInterval(timer);

            button.disabled = false;

            button.textContent =
                "¡AHORA!";

            button.addEventListener(
                "click",
                nextScreen,
                { once: true }
            );

        }

    }, 1000);
}


/* =========================================================
   INICIAR
   ========================================================= */

renderScreen();