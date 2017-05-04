var cardCount = 0
var selectedCount = 0

function main() {
    var canvas = getEl('c');
    var ctx = canvas.getContext('2d');
    var cubes = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 150;

    for (var i = 0; i < 1; i++) {
        new Cube();
    };

    function Cube() {
        this.a = 50;
        this.x = 150;
        this.y = canvas.height - this.a;
        this.draw = function() {
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
    setInterval(update, 20)



}


//
function getEl(el) {
    return document.getElementById(el);
}

function setEl(el, what){
    document.getElementById(el).innerHTML = what
}

// Control panel

function addCard() {
    // alert("A-E")
    var rand = Math.floor(Math.random() * 3)
    // console.log(rand)
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
    $(".selected").removeCard()
    selectedCount = 0
}


$.fn.playCard = function playCard() {
    if ($(this).hasClass("selected")){
        $(this).removeClass("selected")
        selectedCount--
    }
    else if (selectedCount < 5){
        $(this).addClass("selected")
        selectedCount++
    }
}

$.fn.removeCard = function removeCard() {
    cardCount = cardCount - selectedCount
    $(this).remove();
}

// function restart() {
// }

setInterval(function() {
    if (cardCount < 8) {
        addCard()
    }

    // setEl("cards", cardCount)
    // setEl("selected-cards", selectedCount)

}, 1000)

// restart()
