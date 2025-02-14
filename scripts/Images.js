let BG;
let playerLeftPic, playerRightPic;
let itemPic;
let bulletPic;
//function is called in sketch.js, ./ will refer to the root folder
function loadImages(){
    BG = loadImage("./data/BG/Grassland_BG.jpg");
    playerLeftPic = loadImage("./data/Cat/cat_L.png");
    playerRightPic = loadImage("./data/Cat/cat_R.png");
    itemPic = loadImage("./data/Items/heart_wrapped.png");
    bulletPic = loadImage("./data/Bullet/bullet_heart.png");
}