document.addEventListener('DOMContentLoaded', () => start());

import Timer from 'timer.js';

let NEW_GAME;
let FIELD_GAME;
let CHOOSE_DIFFICULT;
let PLAYER_CHOOSE;
let IMAGE_CARD;
let GAME_DIFFICULT;
let PLAYER_DATA;
let SKIRT_CARDS;
let DIV;
let WIN;

let arrImageBack = ['image/nba.png', 'image/minion.png', 'image/eminem.png'];
let arrDifficult = ["low", "medium", "hard"];
let arrImageFront = ['image/bryant.png', 'image/curry.png', 'image/durant.png', 'image/lavin.png', 'image/Lebron.jpg', 'image/leonard.png', 'image/melo.png', 'image/pol.png', 'image/wade.jpg', 'image/Ronaldo.png', 'image/ozil.png', 'image/ibra.png'];
let imageChoose = 0;
let difficultChoose = '';
let imageChooseShow = true;
let difficultChooseShow = true;
let arrForPlayWithCards;
let flagRestartGame = 0;
let sec = 0;
let name = "";
let lastName = "";
let email = "";
let timePassed = 0;
let records = new Array(10);
records.fill(0);
let timer = new Timer();

function start() {
    declarationVariables();
    chooseImage();
    chooseDifficult();
    showChooseDifficult();
    showImageCard();
    NEW_GAME.addEventListener('click', () => {
        removeSecondChildField();
        PLAYER_DATA.style.opacity = 0;
        IMAGE_CARD.style.opacity = 0;
        CHOOSE_DIFFICULT.style.opacity = 0;
        imageChooseShow = false;
        difficultChooseShow = false;
        insertCards(difficultChoose);
        game();
        flagRestartGame++;
        timer.startStop();
    });


}

function declarationVariables() {
    NEW_GAME = document.querySelector('.new-game');
    FIELD_GAME = document.querySelector('.field-game');
    CHOOSE_DIFFICULT = document.querySelector('.choose-difficult');
    PLAYER_CHOOSE = document.querySelector('.player-choose');
    IMAGE_CARD = document.querySelector('.image-card');
    PLAYER_DATA = document.querySelector('.player-data');
    GAME_DIFFICULT = document.querySelector('.game-difficult');
    SKIRT_CARDS = document.querySelector('.skirt-cards');
}

function insertCards(difficult) { //Yeah, it's horrible, I know
    DIV = document.createElement('div');
    DIV.className = difficult + "-game";
    if (difficult === "low") {
        DIV.innerHTML = `
        <div class="first-level-low">
            <div class="card-low" id = "0"></div>
            <div class="card-low" id = "1"></div>
            <div class="card-low" id = "2"></div>
            <div class="card-low" id = "3"></div>
            <div class="card-low" id = "4"></div>
        </div>
        <div class="second-level-low">
            <div class="card-low" id = "5"></div>
            <div class="card-low" id = "6"></div>
            <div class="card-low" id = "7"></div>
            <div class="card-low" id = "8"></div>
            <div class="card-low" id = "9"></div>
        </div>`;
        let cards = DIV.getElementsByClassName('card-low');
        for (let i = 0; i < cards.length; i++) {
            cards[i].style.backgroundImage = 'url(' + arrImageBack[imageChoose] + ')';
        }
    } else if (difficult == 'medium') {
        DIV.innerHTML = `<div class="first-level-medium">
            <div class="card-medium" id = "0"></div>
            <div class="card-medium" id = "1"></div>
            <div class="card-medium" id = "2"></div>
            <div class="card-medium" id = "3"></div>
            <div class="card-medium" id = "4"></div>
            <div class="card-medium" id = "5"></div>
        </div>
        <div class="second-level-medium">
            <div class="card-medium" id = "6"></div>
            <div class="card-medium" id = "7"></div>
            <div class="card-medium" id = "8"></div>
            <div class="card-medium" id = "9"></div>
            <div class="card-medium" id = "10"></div>
            <div class="card-medium" id = "11"></div>
        </div>
        <div class="thrid-level-medium">
            <div class="card-medium" id = "12"></div>
            <div class="card-medium" id = "13"></div>
            <div class="card-medium" id = "14"></div>
            <div class="card-medium" id = "15"></div>
            <div class="card-medium" id = "16"></div>
            <div class="card-medium" id = "17"></div>
        </div>`;
        let cards = DIV.getElementsByClassName('card-medium');
        for (let i = 0; i < cards.length; i++) {
            cards[i].style.backgroundImage = 'url(' + arrImageBack[imageChoose] + ')';
        }

    } else if (difficult == 'hard') {
        DIV.innerHTML = `<div class="first-level-hard">
            <div class="card-hard" id = "0"></div>
            <div class="card-hard" id = "1"></div>
            <div class="card-hard" id = "2"></div>
            <div class="card-hard" id = "3"></div>
            <div class="card-hard" id = "4"></div>
            <div class="card-hard" id = "5"></div>
            <div class="card-hard" id = "6"></div>
            <div class="card-hard" id = "7"></div>
        </div>
        <div class="second-level-hard">
            <div class="card-hard" id = "8"></div>
            <div class="card-hard" id = "9"></div>
            <div class="card-hard" id = "10"></div>
            <div class="card-hard" id = "11"></div>
            <div class="card-hard" id = "12"></div>
            <div class="card-hard" id = "13"></div>
            <div class="card-hard" id = "14"></div>
            <div class="card-hard" id = "15"></div>
        </div>
        <div class="thrid-level-hard">
            <div class="card-hard" id = "16"></div>
            <div class="card-hard" id = "17"></div>
            <div class="card-hard" id = "18"></div>
            <div class="card-hard" id = "19"></div>
            <div class="card-hard" id = "20"></div>
            <div class="card-hard" id = "21"></div>
            <div class="card-hard" id = "22"></div>
            <div class="card-hard" id = "23"></div>
        </div>`;
        let cards = DIV.getElementsByClassName('card-hard');
        for (let i = 0; i < cards.length; i++) {
            cards[i].style.backgroundImage = 'url(' + arrImageBack[imageChoose] + ')';
        }
    }
    FIELD_GAME.appendChild(DIV);
}

function chooseImage() {
    IMAGE_CARD.onclick = (event) => {
        let image = event.target.classList;
        arrImageBack.forEach((item, i) => {
            if (item.indexOf(image) !== -1) {
                imageChoose = i;
            }
        });
    };
}

function chooseDifficult() {
    CHOOSE_DIFFICULT.onclick = (event) => {
        let difficult = event.target.classList;
        arrDifficult.forEach((item) => {
            if (item.indexOf(difficult) !== -1) {
                difficultChoose = item;
            }
        });
    };
}

function removeSecondChildField() {
    let chileds = FIELD_GAME.childNodes;
    for (let i = 3; i < chileds.length; i++) {
        FIELD_GAME.removeChild(chileds[i]);
    }
    if (flagRestartGame !== 0) {
        DIV.remove();
    }
}

function showChooseDifficult() {
    GAME_DIFFICULT.addEventListener('click', () => {
        if (difficultChooseShow) {
            CHOOSE_DIFFICULT.style.opacity = 0;
            PLAYER_DATA.style.opacity = 0;
            DIV.style.opacity = 1;
            difficultChooseShow = false;
        } else if (!difficultChooseShow) {
            CHOOSE_DIFFICULT.style.opacity = 1;
            PLAYER_DATA.style.opacity = 1;
            DIV.style.opacity = 0.6;
            difficultChooseShow = true;
        }
    })
}

function showImageCard() {
    SKIRT_CARDS.addEventListener('click', () => {
        if (imageChooseShow) {
            IMAGE_CARD.style.opacity = 0;
            DIV.style.opacity = 1;
            imageChooseShow = false;
        } else if (!imageChooseShow) {
            IMAGE_CARD.style.opacity = 1;
            DIV.style.opacity = 0.6;
            imageChooseShow = true;
        }
    })
}

function game() {
    fillArray();
    let predCard;
    let count = 0;
    let countWin = 0;
    FIELD_GAME.onclick = (event) => {
        if (event.target.classList == "card-" + difficultChoose) {
            if (count === 0) {
                predCard = event.target.id;
            }
            count++;


            if (count < 3) {
                animate(function (timePassed) {
                    event.target.style.width = 180 - timePassed / 2 + 'px';
                }, 360);
                setTimeout(() => {
                    event.target.style.backgroundImage = 'url(' + arrForPlayWithCards[event.target.id] + ')';
                    animate(function (timePassed) {
                        event.target.style.width = timePassed / 2 + 'px';
                    }, 360);
                }, 360);
            }


            if (count === 2 && arrForPlayWithCards[event.target.id] === arrForPlayWithCards[predCard] && predCard !== event.target.id) {
                setTimeout(() => {
                    animate(function (timePassed) {
                        event.target.style.opacity = 1 - timePassed / 360;
                        document.getElementById(predCard).style.opacity = 1 - timePassed / 360;
                    }, 360);
                    setTimeout(() => {
                        event.target.style.visibility = 'hidden';
                        document.getElementById(predCard).style.visibility = 'hidden';
                        count = 0;
                    }, 360);

                }, 900);
                countWin += 2;

            } else if (count === 2 && arrForPlayWithCards[event.target.id] !== arrForPlayWithCards[predCard]) {
                setTimeout(() => {
                    event.target.style.backgroundImage = 'url(' + arrImageBack[imageChoose] + ')';
                    document.getElementById(predCard).style.backgroundImage = 'url(' + arrImageBack[imageChoose] + ')';
                    count = 0;
                }, 900);
            } else if (count === 2 && predCard === event.target.id) {
                count = 0;
                document.getElementById(predCard).style.backgroundImage = 'url(' + arrImageBack[imageChoose] + ')';
            }
        }
        if (countWin === arrForPlayWithCards.length) {
            countWin = 0;
            count = 0;
            win();
            addToLocalStorage();
        }
    };
}

function fillArray() {
    arrForPlayWithCards = [];
    if (difficultChoose == "low") {
        arrForPlayWithCards = arrImageFront.slice(0, 5);
        arrForPlayWithCards = [...arrForPlayWithCards, ...arrForPlayWithCards];
    } else if (difficultChoose == "medium") {
        arrForPlayWithCards = arrImageFront.slice(0, 9);
        arrForPlayWithCards = [...arrForPlayWithCards, ...arrForPlayWithCards];
    } else if (difficultChoose == "hard") {
        arrForPlayWithCards = arrImageFront.slice(0, 12);
        arrForPlayWithCards = [...arrForPlayWithCards, ...arrForPlayWithCards];
    }
    return arrForPlayWithCards.sort(compareRandom);
}

function compareRandom() {
    return Math.random() - 0.5;
}

function addToLocalStorage() {
    for (let i = 0; i < 10; i++) {
        if (records[i] === 0) {
            records[i] = timer.readOut;
            break;
        } else if (+readout.split(':').join('') < +records[i].split(':').join('')) {
            records[i] = timer.readOut;
            break;
        }
    }
    localStorage.setItem("records", JSON.stringify(records));
    let text_0 = document.getElementsByTagName("input")[0];
    let text_1 = document.getElementsByTagName("input")[1];
    let text_2 = document.getElementsByTagName("input")[2];
    name = text_0.value;
    lastName = text_1.value;
    email = text_2.value;
    localStorage.setItem(name + " " + lastName, timer.readOut);
}

function animate(draw, duration) {
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

function win() {
    WIN = document.createElement('div');
    WIN.className = "win";
    WIN.innerText = "YOU WIN";
    setTimeout(() => {
        timer.startStop();
        removeSecondChildField();
        FIELD_GAME.appendChild(WIN);
        setTimeout(() => {
            removeSecondChildField();
            insertCards(difficultChoose);
        }, 2000);
    }, 800);
}

