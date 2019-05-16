const IMAGES = ["number1.png", "number2.png", "number3.png",
                "number4.png", "number5.png", "number6.png"];

const LOCATIONS = ["a0", "a1", "a2", "a3", "a4", "a5",
                   "b0", "b1", "b2", "b3", "b4", "b5",
                   "c0", "c1", "c2", "c3", "c4", "c5",
                   "d0", "d1", "d2", "d3", "d4", "d5"];


// initialize random locations array and images array
var randomLocations;
var randomImages;

// collection of cell-image pairs will go here
var cellNames = {};

// ids of opened cards
var openedCardsId = [];
// number of opened cards
var openedCards = 0;
// content of opened cards for comparison
var nowOpened = [];

function makeRandomLocationsAndImages() {
    // makes copy and randomizes locations array
    randomLocations = shuffle(LOCATIONS.slice(0));
    // make copy of images array
    var tempImg = IMAGES.slice(0);
    // concatenate tempImg 4 times and then randomize
    randomImages = shuffle(tempImg.concat(tempImg).concat(tempImg).concat(tempImg));
    // add to cellNames location-image pairs
    for (var i = 0; i < LOCATIONS.length; i++) {
        cellNames[randomLocations[i]] = randomImages[i];
    }
}


// check click event for every card
function checkClick() {
    var table = document.getElementById("gametable");
    var cells = table.getElementsByTagName("td");
    for (var i = 0; i < cells.length; i++) {
        cells[i].onclick = flipCard;
    }  
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
  
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
  
    return array;
}

// makes back of cards
function makeBackground() {
    var table = document.getElementById("gametable");
    var cells = table.getElementsByTagName("td");
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerHTML = '<img src="background.png">';
    }  
}

// if cards different
function flipCardsBack() {
    for (var i = 0; i < 2; i++) {
        var cell = document.getElementById(openedCardsId[i]);
        cell.innerHTML = '<img src="background.png">';
    }
    openedCardsId = [];
    nowOpened = [];
}

// if cards the same
function eliminateCards() {
    for (var i = 0; i < 2; i++) {
        var cell = document.getElementById(openedCardsId[i]);
        cell.innerHTML = "";
    }
    openedCardsId = [];
    nowOpened = [];
}

// general response to click event
function flipCard(event) {
    var cell = event.currentTarget;
    // temporary store cell id
    openedCardsId.push(cell.id);
    var cellContent = '<img src=' + cellNames[cell.id] + '>'
    cell.innerHTML = cellContent;
    // temporary store cell content
    nowOpened.push(cellContent);
    // if no cards opened
    if (openedCards === 0) {
        openedCards += 1;
    } else {
        openedCards = 0;
        // if cards content is different
        if (nowOpened[0] !== nowOpened[1]) {
            setTimeout(flipCardsBack, 750);
        // if cards content is the same
        } else if (openedCardsId[0] !== openedCardsId[1]) {
            setTimeout(eliminateCards, 750);
        // if the same card clicked twice
        } else {
            openedCards = 1;
            nowOpened.pop(cellContent);
            openedCardsId.pop(cell.id);
        }
    }
}

window.onload = function() {
    makeRandomLocationsAndImages();
    makeBackground();
    checkClick();
}

