class Player{
	constructor(){
		this.x = width/2;
		this.y = height/2;
	
		this.angle = 0;
		this.xspeed = 0;
		this.yspeed = 0;
		this.hitbox = new Hitbox(this.x , this.y , 45, 45, 0, 0);
		this.pic = playerLeftPic;
		this.center = this.pic.width/2;
	}

	
	display(){
		//this.hitbox.display();
		translate(this.x, this.y);
		this.calculateRotation();
		//rotate(this.angle);
		image(this.pic, -this.center, -this.center);
		resetMatrix();
		
		
		
	}
	
	move(){
		this.x += this.xspeed;
		this.y += this.yspeed;
		this.hitbox.update(this.x -this.center, this.y - this.center + 3);
		
	}
	
	calculateRotation(){
		this.angle = atan2(mouseY - this.y, mouseX - this.x);
	}
	
	get returnAngle(){
		return this.angle;
	}
}