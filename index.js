document.addEventListener('DOMContentLoaded', () => start());

let field_game;
let choose_difficult;
let image_card;
let player_data;
let playground;

let arrImageBack = ['image/nba.png', 'image/minion.png', 'image/eminem.png'];
let imageChoose = 0;
let difficultChoose = 'low';
let imageChooseShow = true;
let difficultChooseShow = true;
let flagRestartGame = 0;
let records = new Array(10);
records.fill(0);

let readout = '';
let base = 60;
let clocktimer, dateObj, dh, dm, ds;
let h = 1, m = 1, tm = 1, s = 0, ts = 0, ms = 0, init = 0;

function start() {
    const NEW_GAME = document.querySelector('.new-game');
    declarationVariables();
    chooseImage();
    chooseDifficult();
    showChooseDifficult();
    showImageCard();
    NEW_GAME.addEventListener('click', () => {
        removeSecondChildField();
        imageChooseShow = false;
        difficultChooseShow = false;
        insertCards(difficultChoose);
        game();
        flagRestartGame++;
        startStop();
    });
}

function declarationVariables() {
    field_game = document.querySelector('.field-game');
    choose_difficult = document.querySelector('.choose-difficult');
    image_card = document.querySelector('.image-card');
    player_data = document.querySelector('.player-data');
}

/**/
function chooseCountLevelAndCard() {
    let countCardsInLevel = 0;
    let countLevel = 0;
    if (difficultChoose === 'low') {
        countCardsInLevel = 5;
        countLevel = 2;
    } else if (difficultChoose === 'medium') {
        countCardsInLevel = 6;
        countLevel = 3;
    } else if (difficultChoose === 'hard') {
        countCardsInLevel = 8;
        countLevel = 3;
    }
    return [countLevel, countCardsInLevel];
}

/**/
function insertCards(difficult) {
    player_data.style.opacity = 0;
    image_card.style.opacity = 0;
    choose_difficult.style.opacity = 0;
    let arrLevelAndCard = chooseCountLevelAndCard();
    let countId = 0;
    playground = document.createElement('div');
    playground.className = difficult + "-game";
    for (let i = 1; i < arrLevelAndCard[0] + 1; i++) {
        let divLevel = document.createElement('div');
        if (i === 1) {
            playground.appendChild(divLevel);
            divLevel.className = "first-level-" + difficult;
        } else if (i === 2) {
            playground.insertBefore(divLevel, playground.children[i - 1]);
            divLevel.className = "second-level-" + difficult;
        } else if (i === 3) {
            playground.insertBefore(divLevel, playground.children[i - 1]);
            divLevel.className = "thrid-level-" + difficult;
        }
        for (let j = 0; j < arrLevelAndCard[1]; j++) {
            let divCards = document.createElement('div');
            divCards.className = "card-" + difficult;
            divCards.id = countId;
            countId++;
            divCards.style.backgroundImage = 'url(' + arrImageBack[imageChoose] + ')';
            divLevel.appendChild(divCards);
        }
    }
    field_game.appendChild(playground);
}

/**/
function chooseImage() {
    image_card.onclick = (event) => {
        let image = event.target.classList;
        arrImageBack.forEach((item, i) => {
            if (item.indexOf(image) !== -1) {
                imageChoose = i;
            }
        });
    };
}

/**/
function chooseDifficult() {
    let arrDifficult = ["low", "medium", "hard"];
    choose_difficult.onclick = (event) => {
        let difficult = event.target.classList;
        arrDifficult.forEach((item) => {
            if (item.indexOf(difficult) !== -1) {
                difficultChoose = item;
            }
        });
    };
}

/**/
function removeSecondChildField() {
    let chileds = field_game.childNodes;
    for (let i = 3; i < chileds.length; i++) {
        field_game.removeChild(chileds[i]);
    }
    if (flagRestartGame !== 0) {
        playground.remove();
    }
}

/**/
function showChooseDifficult() {
    const GAME_DIFFICULT = document.querySelector('.game-difficult');
    GAME_DIFFICULT.addEventListener('click', () => {
        if (difficultChooseShow) {
            choose_difficult.style.opacity = 0;
            player_data.style.opacity = 0;
            difficultChooseShow = false;
        } else if (!difficultChooseShow) {
            choose_difficult.style.opacity = 1;
            player_data.style.opacity = 1;
            difficultChooseShow = true;

        }
    })
}

/**/
function showImageCard() {
    const SKIRT_CARDS = document.querySelector('.skirt-cards');
    SKIRT_CARDS.addEventListener('click', () => {
        if (imageChooseShow) {
            image_card.style.opacity = 0;
            imageChooseShow = false;
        } else if (!imageChooseShow) {
            image_card.style.opacity = 1;
            imageChooseShow = true;
        }
    })
}


function game() {
    let arrForPlayWithCards = fillArray();
    let predCard;
    let count = 0;
    let countWin = 0;
    field_game.onclick = (event) => {
        if (event.target.classList == "card-" + difficultChoose) {
            if (count === 0) {
                predCard = event.target.id;
            }
            count++;
            if (count < 3) {
                animate(function (timePassed) {
                    event.target.style.height = 190 - timePassed / 2 + 'px';
                }, 380);
                setTimeout(() => {
                    event.target.style.backgroundImage = 'url(' + arrForPlayWithCards[event.target.id] + ')';
                    animate(function (timePassed) {
                        event.target.style.height = timePassed / 2 + 'px';
                    }, 380);
                }, 380);
            }
            if (count === 2 && arrForPlayWithCards[event.target.id] === arrForPlayWithCards[predCard] && predCard !== event.target.id) {
                setTimeout(() => {
                    animate(function (timePassed) {
                        event.target.style.opacity = 1 - timePassed / 380;
                        document.getElementById(predCard).style.opacity = 1 - timePassed / 380;
                    }, 380);
                    setTimeout(() => {
                        event.target.style.visibility = 'hidden';
                        document.getElementById(predCard).style.visibility = 'hidden';
                        count = 0;
                    }, 380);

                }, 950);
                countWin += 2;

            } else if (count === 2 && arrForPlayWithCards[event.target.id] !== arrForPlayWithCards[predCard]) {
                setTimeout(() => {
                    event.target.style.backgroundImage = 'url(' + arrImageBack[imageChoose] + ')';
                    document.getElementById(predCard).style.backgroundImage = 'url(' + arrImageBack[imageChoose] + ')';
                    count = 0;
                }, 950);
            } else if (count === 2 && predCard === event.target.id) {
                count = 0;
                document.getElementById(predCard).style.backgroundImage = 'url(' + arrImageBack[imageChoose] + ')';
            }
        }
        if (countWin === arrForPlayWithCards.length) {
            addToLocalStorage();
            countWin = 0;
            count = 0;
            win();
        }
    };
}

/**/
function fillArray() {
    let arrImageFront = ['image/bryant.png', 'image/curry.png', 'image/durant.png', 'image/lavin.png',
        'image/Lebron.jpg', 'image/leonard.png', 'image/melo.png', 'image/pol.png', 'image/wade.jpg',
        'image/Ronaldo.png', 'image/ozil.png', 'image/ibra.png'];
    let arrForPlay = [];
    if (difficultChoose == "low") {
        arrForPlay = [...arrImageFront.slice(0, 5), ...arrImageFront.slice(0, 5)];
    } else if (difficultChoose == "medium") {
        arrForPlay = [...arrImageFront.slice(0, 9), ...arrImageFront.slice(0, 9)];
    } else if (difficultChoose == "hard") {
        arrForPlay = [...arrImageFront.slice(0, 12), ...arrImageFront.slice(0, 12)];
    }
    return arrForPlay.sort(compareRandom);
}

/**/
function compareRandom() {
    return Math.random() - 0.5;
}

/**/
function addToLocalStorage() {
    for (let i = 0; i < 10; i++) {
        if (records[i] === 0) {
            records[i] = readout;
            break;
        } else if (+readout.split(':').join('') < +records[i].split(':').join('')) {
            records[i] = readout;
            break;
        }
    }
    localStorage.setItem("records", JSON.stringify(records));
    let text_0 = document.getElementsByTagName("input")[0];
    let text_1 = document.getElementsByTagName("input")[1];
    let text_2 = document.getElementsByTagName("input")[2];
    let name = text_0.value;
    let lastName = text_1.value;
    let email = text_2.value;
    localStorage.setItem(name + " " + lastName + " " + email, readout);
}

/**/
function animate(draw, duration) {
    let timePassed = 0;
    let start = performance.now();
    requestAnimationFrame(function animate(time) {
        timePassed = time - start;
        if (timePassed > duration) timePassed = duration;
        draw(timePassed);
        if (timePassed < duration) {
            requestAnimationFrame(animate);
        }

    });
}

/**/
function win() {
    const WIN = document.createElement('div');
    WIN.className = "win";
    WIN.innerText = "YOU WIN";
    setTimeout(() => {
        startStop();
        removeSecondChildField();
        field_game.appendChild(WIN);
        setTimeout(() => {
            removeSecondChildField();
            insertCards(difficultChoose);
        }, 2000);
    }, 800);
}


function clearClock() {
    clearTimeout(clocktimer);
    h = 1;
    m = 1;
    tm = 1;
    s = 0;
    ts = 0;
    ms = 0;
    init = 0;
    readout = '00:00:00.00';
}

function StartTIME() {
    let cdateObj = new Date();
    let t = (cdateObj.getTime() - dateObj.getTime()) - (s * 1000);
    if (t > 999) {
        s++;
    }
    if (s >= (m * base)) {
        ts = 0;
        m++;
    } else {
        ts = parseInt((ms / 100) + s);
        if (ts >= base) {
            ts = ts - ((m - 1) * base);
        }
    }
    if (m > (h * base)) {
        tm = 1;
        h++;
    } else {
        tm = parseInt((ms / 100) + m);
        if (tm >= base) {
            tm = tm - ((h - 1) * base);
        }
    }
    ms = Math.round(t / 10);
    if (ms > 99) {
        ms = 0;
    }
    if (ms == 0) {
        ms = '00';
    }
    if (ms > 0 && ms <= 9) {
        ms = '0' + ms;
    }
    if (ts > 0) {
        ds = ts;
        if (ts < 10) {
            ds = '0' + ts;
        }
    } else {
        ds = '00';
    }
    dm = tm - 1;
    if (dm > 0) {
        if (dm < 10) {
            dm = '0' + dm;
        }
    } else {
        dm = '00';
    }
    dh = h - 1;
    if (dh > 0) {
        if (dh < 10) {
            dh = '0' + dh;
        }
    } else {
        dh = '00';
    }
    readout = dh + ':' + dm + ':' + ds + '.' + ms;
    clocktimer = setTimeout("StartTIME()", 1);
}

function startStop() {
    if (init == 0) {
        clearClock();
        dateObj = new Date();
        StartTIME();
        init = 1;
    } else {
        clearTimeout(clocktimer);
        init = 0;
    }
}