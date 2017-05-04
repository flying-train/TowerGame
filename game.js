var cardCount = 0
var selectedCount = 0

var cardInterval = 500
var updateInteval = 10

var canvas = getEl('c');
var ctx = canvas.getContext('2d');
var cubes = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 150;

function main() {

}

function makeCube(value, color) {
    new Cube(value, color);
}

function Cube(a, color) {
    this.a = a;
    this.x = 150;
    this.y = canvas.height - this.a;
    this.draw = function() {
        ctx.fillStyle = color;
        // console.log(color)

        ctx.fillRect(this.x, this.y, this.a, this.a);
    }
    this.update = function() {
        this.x++;
    };
    cubes.push(this);
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < cubes.length; i++) {
        cubes[i].update();
        cubes[i].draw();
    };
}

// Tools
function getEl(el) {
    return document.getElementById(el);
}

function setEl(el, what) {
    document.getElementById(el).innerHTML = what
}

// Control panel

function addCard() {
    // alert("A-E")
    var rand = Math.floor(Math.random() * 5)
        // console.log(rand)
    var colors = ["red", "green", "blue", "black", "yellow"]

    $("#cp-list").append($("<li class='card " + colors[rand] + "''></li>"))
    cardCount++
    // Not a great solution WIP
    $(".card").unbind("click");
    $(".card").click(function() {
        $(this).playCard()
    })
}

function playButton() {
    makeCube(selectedCount * (selectedCount) * 10, detectColor())
    $("li").not(".card").removeCard()
    selectedCount = 0

}

function detectColor() {
    colors = [];
    $(".selected").each(function(index, el) {
        $(this).removeClass("selected");
        $(this).removeClass("card");
        colors.push($(this).attr("class"));
    })
    colors.sort()
    var max = 0,
        result, freq = 0;
    for (var i = 0; i < colors.length; i++) {
        if (colors[i] === colors[i + 1]) {
            freq++;
        } else {
            freq = 0;
        }
        if (freq > max) {
            result = colors[i];
            max = freq;
        } else {
            result = colors[Math.floor(Math.random() * colors.length)]
        }
    }
    return (result)
}


$.fn.playCard = function playCard() {
    if ($(this).hasClass("selected")) {
        $(this).removeClass("selected")
        selectedCount--
    } else if (selectedCount < 5) {
        $(this).addClass("selected")
        selectedCount++
    }
}

$.fn.removeCard = function removeCard() {
    // Pozor na to
    cardCount = cardCount - selectedCount
    $(this).remove();
}


// Intervals

setInterval(function() {
    //Adding new cards
    if (cardCount < 8) {
        addCard()
    }

    // setEl("cards", cardCount)
    // setEl("selected-cards", selectedCount)

}, cardInterval)

setInterval(function() {
    //Updating cube location (also will be collision detection)
    update()
}, updateInteval)
