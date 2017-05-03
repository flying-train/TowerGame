function main () {
	var canvas = $('c');
	var ctx = canvas.getContext('2d');
	var cubes = []; 

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight - 150;

	for (var i = 0; i < 1; i++) {
		new Cube();
	};

	function Cube () {
		this.a = 50;
		this.x = 150;
		this.y = canvas.height - this.a;
		this.draw = function(){
			ctx.fillRect(this.x, this.y, this.a, this.a);
		}
		this.update = function() {
			this.x++;
		};
		cubes.push(this);
	}

	function update () {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (var i = 0; i < cubes.length; i++) {
			cubes[i].update();
			cubes[i].draw();
		};
	}
	setInterval(update, 20)
}
function $ (el) {
	return document.getElementById(el);
}