class Bullet{
	constructor( x,  y, xdir,  ydir){
		this.x = x;
		this.y = y; 
		this.xdir = xdir.toFixed(2);
		this.ydir = ydir.toFixed(2);
		this.xspeed = 2;
		this.yspeed = 2;
		this.alive = true;
		this.lifespan = 100;
		this.pic = bulletPic;
		this.center = this.pic.width/2;
		this.hitbox = new Hitbox(this.x, this.y, this.pic.width, this.pic.height, -this.center, -this.center);
	}
	
	display(){
		translate(this.x, this.y);
		image(this.pic, -this.center, -this.center);
		resetMatrix();
		
		
	}
	move(){
		this.x += this.xdir * this.xspeed;
		this.y += this.ydir * this.yspeed;

		//center hitbox around heart: places top left corner of hitbox at given x coordinate
		this.hitbox.update(this.x , this.y);
		if(this.x < 0 || this.x > width || this.y > height || this.y < 0)
		{
			this.alive = false;
		}
		else if(this.lifespan <= 0){
			this.alive = false;
		}
		this.lifespan -= 1;
	
	}
	
	reflect(other){
			let point = this.pointOfContact(other);
			this.calculateReflection(point);
		
	}
	
	calculateReflection(p){
		let normal = createVector(this.x - p.x, this.y - p.y);		
		
		let magnitude = Math.sqrt(normal.x * normal.x + normal.y * normal.y);
		
		normal.x *= 1/magnitude;
		normal.y *= 1/magnitude;
	
		let dotProduct = this.xdir * normal.x + this.ydir * normal.y;

		this.xdir = this.xdir - 2 * (dotProduct) * normal.x;
		this.ydir = this.ydir - 2  * (dotProduct)  * normal.y;
		
	} 
	pointOfContact(other){

		if(this.x  <= other.x){
			//console.log("left");
			return createVector(other.x, this.y);
		}
		else if(this.x >= other.x + other.w){
			//console.log("right");
			return createVector(other.x + other.w, this.y);
		}
	
			else if(this.y <= other.y){
				//console.log("top");
				
				return createVector(this.x, other.y);
			}
			else{
				//console.log("bottom");
				return createVector(this.x, other.y + other.h);
			}
			
			
		
		
	}
}