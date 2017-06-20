var cardCount = 0;
var selectedCount = 0;

var canvas = getEl('c');
var ctx = canvas.getContext('2d');
var cubes = [];
var cubesEnemy = [];

var cardInterval = 500;
var updateInteval = 10;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 150;


var cardInterval = 1000;
var updateInteval = 10;

for (var i = 0; i < 1; i++) {
    new Cube();
}
//---
var testcube = new Cube();
// testcube.update = function() {
//     this.collision();
//     this.draw();
// }
testcube.x = 500;
testcube.player = false;
//---

////Lord of the Rings: Two towers
function Tower(player) {
    this.a = 100;
    this.b = 300;
    this.y = canvas.height - this.b;
    if (player === true) {
        this.x = 0;

    } else {
        this.x = canvas.width - 100;
    }

    this.draw = function() {
        if (player === true) {
            ctx.fillStyle = "blue";
        } else {
            ctx.fillStyle = "red";
        }

        ctx.fillRect(this.x, this.y, this.a, this.b);
    };

    this.update = function() {
        this.draw();
    };
}

var towerPlayer = new Tower(true);
towerPlayer.draw();
var towerEnemy = new Tower(false);
towerEnemy.draw();



//// Cube
function makeCube() {
    // Additional Cube constructor
    a = new Cube();
    a.player = true;
    a.x = 150;
    // ctx.fillStyle = "blue"
    // cubes.push(a)
}

function makeEnemyCube() {
    a = new Cube();
    a.player = false;
    a.x = canvas.width - 150;
    // ctx.fillStyle = "red"
    // cubesEnemy.push(a)
}

function Cube() {
    this.a = Math.floor(Math.random() * 50) + 20;
    this.x = 150;
    this.y = canvas.height - this.a;
    this.player = true;
    this.draw = function() {
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.a, this.a);
    };
    this.update = function() {
        this.move();
        this.collision();
        this.draw();
    };
    this.collision = function() {
        for (var i = 0; i < cubes.length; i++) {
            if (this.x > cubes[i].x && this.x < cubes[i].x + cubes[i].a) {
                if (this.a > cubes[i].a) {
                    this.a = this.a - ((cubes[i].a * cubes[i].a) / this.a);
                    this.y = canvas.height - this.a;
                    cubes.splice(i, 1);
                } else if (this.a < cubes[i].a) {
                    cubes[i].a = cubes[i].a - ((this.a * this.a) / cubes[i].a);
                    cubes[i].y = canvas.height - cubes[i].a;
                    cubes.splice(cubes.indexOf(this), 1);
                } else {
                    cubes.splice(cubes.indexOf(this), 1);
                    cubes.splice(i, 1);
                }
            }
        }
        if (this.x > towerPlayer.x && this.x < towerPlayer.x + towerPlayer.a) {
            cubes.splice(cubes.indexOf(this), 1);
            towerPlayer.b = towerPlayer.b - ((this.a * this.a) / towerPlayer.a);
            towerPlayer.y = canvas.height - towerPlayer.b;
        }
        if (this.x > towerEnemy.x && this.x < towerEnemy.x + towerEnemy.a) {
            cubes.splice(cubes.indexOf(this), 1);
            towerEnemy.b = towerEnemy.b - ((this.a * this.a) / towerEnemy.a);
            towerEnemy.y = canvas.height - towerEnemy.b;
        }
    };

    this.move = function() {
        if (this.player === true) {
            this.x++;
        } else {
            this.x--;
        }
    };

    cubes.push(this);
}


////Global functions
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < cubes.length; i++) {
        cubes[i].update();
    }
    towerEnemy.update();
    towerPlayer.update();

    // if (towerPlayer.b <= 0){
    //     alert("You lost")
    // } else if (towerEnemy.b <= 0){
    //     alert("You won")
    // }

}

////Enemy logic
function playEnemy() {
    makeEnemyCube();
}

//// Main

setInterval(function() {
    if (cardCount < 8) {
        addCard();
    }
}, cardInterval);

setInterval(update, updateInteval);
setInterval(playEnemy, cardInterval * 2);