/*
get enemy to move and have it shoot when player is in range
and deal damage
*/
let ship;
let upKey, downKey, rightKey, leftKey;
let bullets;

let replyOptions;
let points;
let canShoot;

let items;
function loadItems(){
	items = [];
	for (let i = 0; i  < 8; i++){
		let randomX = random(50, width-50)
		let randomY = random(50, height-50);
		items.push(new Item(randomX, randomY));
	}
}

function preload(){
	loadImages();
}

function setup() {
	createCanvas(1024, 576);
	BG.resize(1024, 576);
	playerLeftPic.resize(48, 48);	

	player = new Player();
	bullets = []; // javasript array/ arraylist equivalent combined
	
	//------------reply item options----------

	replyOptions = [];
	replyOptions.push(new ReplyItem(100, 200, "yes"));
	let noOption = new ReplyItem(100, 300, "no");
	noOption.type = ReplyItem.SHIELDTYPE;
	replyOptions.push(noOption);
	
	
	
	upKey = false;
	downKey = false;
	rightKey = false;
	leftKey = false;

	//------------ setting up items------------
	loadItems();

	points = 8;

	//----------------
	canShoot = false;


}

function draw() {
	
	
	if (points >= 8){
		canShoot = true;
	}
	image(BG, 0, 0);
	
	updateItems();
	controls();
	player.move();
	player.display();

	//-----------------for loop for moving and displaying bullets------------
	for (let i = 0; i < bullets.length; i++) {
		

		bullets[i].move();
		bullets[i].display();

		if (!bullets[i].alive) {
			bullets.splice(i, 1);
		}

	}
	
	updateReplyItems();

	//debug();
	//-------------------DISPLATYING THE UI--------------------
	UI();

}

function keyPressed() {
	if (key == 'w') {

		upKey = true;
	}
	if (key == 's') {

		downKey = true;
	}
	if (key == 'a') {

		leftKey = true;
	}
	if (key == 'd') {

		rightKey = true;
	}
	
}

function keyReleased() {
	if (key == 'w') {

		upKey = false;
	}

	if (key == 'a') {
		leftKey = false;
	}
	if (key == 'd') {
		rightKey = false;
	}
	if (key == 's') {
		downKey = false;
	}
	
}
//-----------------------------------MOUSE PRESSED-------------------------------
function mousePressed() {
  if (canShoot === true) {
    shootAbility();
  }
}

let controls = () => {
	if (upKey) {
		player.yspeed = -5;
	} else if (downKey) {
		player.yspeed = 5;
	} else {
		player.yspeed = 0;
	}
	if (leftKey) {
		player.xspeed = -5;
	} else if (rightKey) {
		player.xspeed = 5;
	} else {
		player.xspeed = 0;
	}
	
}

function collision(a, b) {
	
	if (a.x + a.w > b.x && a.x < b.x + b.w && a.y + a.h > b.y && a.y < b.y + b.h) {
		return true;
	}
	return false;
}

function debug() {

	
}

function UI() {
	fill(255);
	textSize(15);
	textAlign(LEFT);
	text("Hearts collected: " + points, 10, 30);	
	noFill();
}

function updateItems(){
	for (let i = 0; i  < items.length; i++){
		items[i].display();
		if(collision(items[i].hitbox, player.hitbox) ===  true){
			items[i].x = 10000;
			points += 1;
		}
	}

}

function updateReplyItems(){
	for(let replyItem of replyOptions){
		replyItem.display();
	}
	
	for (let i = bullets.length - 1; i >= 0; i--){
		let currentBullet = bullets[i];
		for(let replyItem of replyOptions){
			
			if(collision( currentBullet.hitbox, replyItem.hitbox) === true){
				replyItem.takeDamage();
				if (replyItem.type === ReplyItem.SHIELDTYPE){
					currentBullet.reflect(replyItem.hitbox);
				}
				else{
					bullets.splice(i, 1);
				}
			}	
		}
	}	
}

function shootAbility() {
	let bulletXDir = cos(player.returnAngle);
	let bulletYDir = sin(player.returnAngle);
	bullets.push(new Bullet(player.x + cos(player.returnAngle) * 40, player.y + sin(player.returnAngle) * 40, bulletXDir, bulletYDir));
}