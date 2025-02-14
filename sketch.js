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
let noOptionPicked = false;
let replyChosen;
let GAMESTATES = {
	GAMEOVER : 0,
	WIN : 1,
	PLAYING: 2
}
let gameState;
//---------------------MAIN MENU VARS-------
let MENUSTATE = {
	MAINMENU: 0,
	CONTROSLMENU: 1
};
let menuState = MENUSTATE.MAINMENU;
let startGame = false;

let startButton;
let howToPlayMenuButton;
let exitControlsMenuButton;



function loadItems(){
	items = [];
	for (let i = 0; i  < 8; i++){
		let randomXOffset = random(50, width/2 - 70);
		let randomXDirection = int(random(0, 2)) > 0 ? 1 : -1;
		let randomX = randomXOffset * randomXDirection + width/2; 
		let randomY = random(200, height-50);

		if (randomX < 0 || randomX > width){
			randomX = 200;
		}
		items.push(new Item(randomX, randomY));
	}
}

function preload(){
	loadImages();
}

function setup() {
	createCanvas(1024, 576);
	resizeImages();
	

	player = new Player();
	bullets = []; // javasript array/ arraylist equivalent combined
	
	//------------reply item options----------

	replyOptions = [];
	replyOptions.push(new ReplyItem(700, 100, "yes"));
	let noOption = new ReplyItem(200, 100, "no");
	if (noOptionPicked){
		noOption.type = ReplyItem.SHIELDTYPE;
	}
	
	replyOptions.push(noOption);
	
	
	
	upKey = false;
	downKey = false;
	rightKey = false;
	leftKey = false;

	//------------ setting up items------------
	loadItems();

	points = 0;

	//----------------
	canShoot = false;

	replyChosen = false;
	gameState = GAMESTATES.PLAYING;

	//---------------------MAIN MENU----------
	loadMenuButtons();

}

function draw() {
	//playSong();
	if (startGame){
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
		
		if(points >= 8){
			updateReplyItems();
		}
		
	
		//debug();
		//-------------------DISPLATYING THE UI--------------------
		UI();

	}
	
	else{
		if(menuState === MENUSTATE.MAINMENU){
			mainMenu();
		}
		else{
			controlsMenu();
		}
		
	}
	

}

function keyPressed() {
	if (key == 'w' || key == 'W') {

		upKey = true;
	}
	if (key == 's' || key == 'S') {

		downKey = true;
	}
	if (key == 'a' || key == 'A') {

		leftKey = true;
	}
	if (key == 'd' || key == 'D') {

		rightKey = true;
	}

	if (keyCode == ENTER && gameState === GAMESTATES.GAMEOVER){
		setup();
	}
	
}

function keyReleased() {
	if (key == 'w' || key == 'W') {

		upKey = false;
	}

	if (key == 'a' || key == 'A') {
		leftKey = false;
	}
	if (key == 'd' || key == 'D') {
		rightKey = false;
	}
	if (key == 's' || key == 'S') {
		downKey = false;
	}
	
}
//-----------------------------------MOUSE PRESSED-------------------------------
function mousePressed() {
  if (canShoot === true) {
    shootAbility();
  }
  startButton.onClick();
  howToPlayMenuButton.onClick();
  exitControlsMenuButton.onClick();
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

	fill(255);
	text(`${mouseX} ${mouseY}`, mouseX, mouseY);
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
		if (replyItem.optionType === ReplyItem.YESOPTIONTYPE && replyItem.hp <= 0){
			gameState = GAMESTATES.WIN;
		}
		else if (replyItem.optionType === ReplyItem.NOOPTIONTYPE && replyItem.hp <= 0) {
			noOptionPicked = true;
			gameState = GAMESTATES.GAMEOVER;
			
		}
		
	}
	
	for (let i = bullets.length - 1; i >= 0; i--){
		let currentBullet = bullets[i];
		for(let replyItem of replyOptions){
			
			if(collision( currentBullet.hitbox, replyItem.hitbox) === true){
				
				if (replyItem.type === ReplyItem.SHIELDTYPE){
					currentBullet.reflect(replyItem.hitbox);
				}
				else{
					bullets.splice(i, 1);
					if (gameState === GAMESTATES.PLAYING){
						replyItem.takeDamage();
					}
					
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

//-------------------UI---------------------------------
function UI() {
	fill(255);
	textSize(15);
	textAlign(LEFT);
	textStyle(NORMAL);
	text("Hearts collected: " + points, 10, 30);	
	noFill();

	fill(255);
	textSize(30);
	textStyle(BOLD);
	textAlign(CENTER);
	text("Will you be my Valentine?", width/2, 50);

	if (gameState === GAMESTATES.GAMEOVER){
		retryScreen();
	}
	else if (gameState === GAMESTATES.WIN){
		winScreen();
	}
		
	
	
}

function retryScreen(){
	fill(0);
	stroke(0);
	strokeWeight(4);
	fill(255);
	textSize(30);
	textStyle(BOLD);
	textAlign(CENTER);
	text("No? are you sure? Let's try again. \n \n press ENTER to play again", width/2, height/2);
	strokeWeight(1);

	image(brokenHeartPic, width/2 - brokenHeartPic.width/2, height/2 - brokenHeartPic.height/2 - 100);
	
}

function winScreen(){
	fill(0);
	stroke(0);
	strokeWeight(4);
	fill(255);
	textSize(30);
	textStyle(BOLD);
	textAlign(CENTER);
	text("Let's go out for Valentine's day then.\n \n 一生あなたを愛し続けます", width/2, height/2);
	strokeWeight(1);
	image(winScreenHeartPic, width/2 - winScreenHeartPic.width/2, height/2 - winScreenHeartPic.height/2 - 100);
}

//-------------------------MENUS------------
function mainMenu(){
	background(232, 90, 100);
	fill(0);
	stroke(100);
	strokeWeight(4);
	fill(255);
	textSize(50);
	textStyle(BOLD);
	textAlign(CENTER);
	text("Will you be my Valentine?", width/2, height/2 - 100);
	image(mainMenuPic, width/2 - mainMenuPic.width/2 - 20, height/2 - 100);
	startButton.display();
	howToPlayMenuButton.display();
	
}

function controlsMenu(){
	background(232, 90, 100);
	fill(0);
	stroke(100);
	strokeWeight(4);
	fill(255);
	textSize(50);
	textStyle(BOLD);
	textAlign(CENTER);
	text("CONTROLS", width/2, 100);
	
	
	textSize(20);
	stroke(0);
	strokeWeight(1);
	textStyle(NORMAL);
	textAlign(LEFT);
	text("Collect all 8 hearts to unlock the ability to give your response", 200, height/2 - 80);
	text("Once all 8 hearts have been collected \npress the left mouse button and shoot hearts towards your response", 200, height/2 );
	text("Control the cat with WASD on the keyboard ", 200, height/2 + 100 );

	image(controlsMenuPic, 120, height/2 - 120);





	exitControlsMenuButton.display();
}
function loadMenuButtons(){
	startButton = new Button(width/2 - 80, height/2 + 30, 120, 50, "START");
	startButton.ClickEvent = () =>{startGame = true;}
	howToPlayMenuButton = new Button(width/2 - 80, height/2 + 120, 120, 50, "HOW TO PLAY");
	howToPlayMenuButton.ClickEvent = () =>{openControlsMenu();};
	exitControlsMenuButton = new Button(60, 50, 100, 50, "CLOSE");
	exitControlsMenuButton.ClickEvent = () =>{closeControlsMenu();}
}

function openControlsMenu(){
	menuState = MENUSTATE.CONTROSLMENU;
}
function closeControlsMenu(){
	menuState  = MENUSTATE.MAINMENU;
}


