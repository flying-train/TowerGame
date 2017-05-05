var cardCount = 0
var selectedCount = 0

var canvas = getEl('c');
var ctx = canvas.getContext('2d');
var cubes = [];
var cubesEnemy = [];

var cardInterval = 500
var updateInteval = 10

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 150;


var cardInterval = 1000
var updateInteval = 10

for (var i = 0; i < 1; i++) {
    new Cube();
};
//---
var testcube = new Cube();
// testcube.update = function() {
//     this.collision();
//     this.draw();
// }
testcube.x = 500;
testcube.player = false
    //---


//// Cube
function makeCube() {
    // Additional Cube constructor
    new Cube();
}

function Cube() {
    this.a = Math.floor(Math.random() * 50) + 20;
    this.x = 150;
    this.y = canvas.height - this.a;
    this.player = true
    this.draw = function() {
        ctx.fillRect(this.x, this.y, this.a, this.a);
    }
    this.update = function() {
        this.move()
        this.collision();
        this.draw()
    }
    this.collision = function() {
        for (var i = 0; i < cubes.length; i++) {
            if (this.x > cubes[i].x && this.x < cubes[i].x + cubes[i].a) {
                if (this.a > cubes[i].a) {
                    this.a = this.a - cubes[i].a
                    this.y = canvas.height - this.a;
                    cubes.splice(i, 1)
                } else if (this.a < cubes[i].a) {
                    cubes[i].a = cubes[i].a - this.a
                    cubes[i].y = canvas.height - cubes[i].a;
                    cubes.splice(cubes.indexOf(this), 1)
                } else {
                    cubes.splice(cubes.indexOf(this), 1)
                    cubes.splice(i, 1)
                }
            }
        }
    }
    this.move = function() {
        if (this.player == true) {
            this.x++;
        } else {
            this.x--;
        }
    }

    cubes.push(this);
}


////Global functions
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // console.log(cubes.length)
    if (cubes.length > 0) {
        for (var i = 0; i < cubes.length; i++) {
            cubes[i].update();
        }
    }
}

////Tools
function getEl(el) {
    return document.getElementById(el);
}

function setEl(el, what) {
    document.getElementById(el).innerHTML = what
}

//// Control panel functions
function addCard() {
    var rand = Math.floor(Math.random() * 3)
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
    if (selectedCount > 0) {
        makeCube()
        $(".selected").removeCard()
        selectedCount = 0
    }
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
    // WIP
    cardCount = cardCount - selectedCount
    $(this).remove();
}

//// Element logic
// function detectColor() {
//     colors = [];
//     $(".selected").each(function(index, el) {
//         $(this).removeClass("selected");
//         $(this).removeClass("card");      
//         colors.push($(this).attr("class"));
//         $(this).addClass("card");
//         $(this).addClass("selected");
//     })
//     colors.sort()
//     var max = 0,
//         result, freq = 0;
//     for (var i = 0; i < colors.length; i++) {
//         if (colors[i] === colors[i + 1]) {
//             freq++;
//         } else {
//             freq = 0;
//         }
//         if (freq > max) {
//             result = colors[i];
//             max = freq;
//         } else {
//             result = colors[Math.floor(Math.random() * colors.length)]
//         }
//     }
//     return (result)
// }

//// Main

setInterval(function() {if (cardCount < 8) {addCard();}}, cardInterval);

setInterval(update, updateInteval);
