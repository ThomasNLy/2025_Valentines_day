let BG;
let playerLeftPic, playerRightPic;
let itemPic;
let bulletPic;
let yesPic;
let noPic;
let hpBarPic;
let brokenHeartPic;
let winScreenHeartPic;
let controlsMenuPic;
//let mainMenuPic;
//function is called in sketch.js, ./ will refer to the root folder
function loadImages(){
    BG = loadImage("./data/BG/Grassland_BG.jpg");
    playerLeftPic = loadImage("./data/Cat/cat_L.png");
    playerRightPic = loadImage("./data/Cat/cat_R.png");
    itemPic = loadImage("./data/Items/heart_wrapped.png");
    bulletPic = loadImage("./data/Bullet/bullet_heart.png");
    yesPic = loadImage("./data/Items/yes_pic.png");
    noPic = loadImage("./data/Items/no_pic2.png");
    hpBarPic = loadImage("./data/UI/hp_bar_outline.png");
    brokenHeartPic = loadImage("./data/UI/broken_heart.png");
    winScreenHeartPic = loadImage("./data/Bullet/bullet_heart.png")
    mainMenuPic = loadImage("./data/Items/heart_wrapped.png");
    controlsMenuPic = loadImage("./data/Items/heart_wrapped.png");

}
function resizeImages(){
    BG.resize(1024, 576);
	playerLeftPic.resize(48, 48);
    playerRightPic.resize(48, 48);
    hpBarPic.resize(128, 64);	
    winScreenHeartPic.resize(128, 128);
    mainMenuPic.resize(128, 128);
    controlsMenuPic.resize(64, 64);
}