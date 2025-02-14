class Item{
    constructor(x, y){
        this.x = x;
        this.y = y;
        
        this.pic = itemPic;
        this.hitbox = new Hitbox(this.x, this.y, 32, 32, 0 ,0);
    }
   

    display(){
        image(this.pic, this.x, this.y);
        this.hitbox.update(this.x, this.y);
    }

}