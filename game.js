var cardCount = 0
var selectedCount = 0

var canvas = getEl('c');
var ctx = canvas.getContext('2d');
var cubes = [];

var cardInterval = 500
var updateInteval = 10

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 150;

for (var i = 0; i < 1; i++) {
    new Cube();
};
//---
var testcube = new Cube();
testcube.update = function() {
    this.collision();
}
testcube.x = 500;
//---

function makeCube() {
    new Cube();
}

function Cube() {
    this.a = 50;
    this.x = 150;
    this.y = canvas.height - this.a;
    this.draw = function() {
        ctx.fillRect(this.x, this.y, this.a, this.a);
    }
    this.update = function() {
        this.x++;
        this.collision();
    }
    this.collision = function() {
        for (var i = 0; i < cubes.length; i++) {
            if (this.x > cubes[i].x && this.x < cubes[i].x + cubes[i].a) {
                cubes.pop(this);
                cubes.pop(cubes[i]);
            }
        }
    }
    cubes.push(this);
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < cubes.length; i++) {
        cubes[i].update();
        if (cubes.length > 0) {
            cubes[i].draw();
        }
    };

}


function playButton() {
    new Cube();
}

//
function getEl(el) {
    return document.getElementById(el);
}

function setEl(el, what) {
    document.getElementById(el).innerHTML = what
}

// Control panel

function addCard() {
    // alert("A-E")
    var rand = Math.floor(Math.random() * 3)
    console.log(rand)
    var colors = ["red", "green", "blue"]

    $("#cp-list").append($("<li class='card " + colors[rand] + "''></li>"))
    cardCount++
    // Not a nice solution WIP
    $(".card").unbind("click");
    $(".card").click(function() {
        $(this).playCard()
    })
}

function playButton() {
    makeCube()
    $("li").not(".card").removeCard()
    selectedCount = 0

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

$.fn.removeCard = function removeCard() {
    // WIP
    cardCount = cardCount - selectedCount
    $(this).remove();
}

function restart() {
    // score = 0
    // getEl("score").innerHTML = score;
}

setInterval(function() {
    if (cardCount < 8) {
        addCard()
    }

}, cardInterval)

setInterval(update, updateInteval);


restart()
