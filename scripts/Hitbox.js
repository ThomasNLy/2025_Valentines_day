class Hitbox{
	constructor(x, y, w ,h, xOffset, yOffset){
		this.x = x;
		this.y = y;
		this.w = w ;
		this.h = h;
		this.xOffset = xOffset;
		this.yOffset = yOffset;
	}
	
	display(){

		fill(0, 255, 0, 200);
		rect(this.x, this.y, this.w, this.h);
	}
	
	update(x, y){
		this.x = x + this.xOffset;
		this.y = y + this.yOffset;
	
	}
	// set XOffSet(val){
	// 	this.xOffset = val;
	// }
	// set YOffSet(val){
	// 	this.yOffSet = val;
	// }
		
}