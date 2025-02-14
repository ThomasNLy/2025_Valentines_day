let SHIELD = 0;
let NOSHIELD = 1;


let YESOPTION = 0;
let NOOPTION  = 1;
class ReplyItem {
	constructor(x, y, text) {
		this.x = x;
		this.y = y;
		this.type = NOSHIELD
		this.text = text;
		this.hitbox = new Hitbox(this.x, this.y, 100, 100, 0 ,0);
		this.shield = new Shield(this.x, this.y, this.w + 20, this.h + 20);
		this.hp = 8;
		this.maxHp = 8;
		
		if (text === "yes"){
			this.pic = yesPic;
			this.optionType = YESOPTION;
		}
		else{
			this.pic = noPic;
			this.optionType = NOOPTION;
		}
		
	}

	display() {
		if (this.type === SHIELD) {

			this.shield.update(this.x - this.shield.w / 2 + 10, this.y - this.shield.h / 2 + 10);
			this.shield.display();
		}

		image(this.pic, this.x, this.y);
		
		this.hpBar();
	}

	hpBar(){
		fill(255, 0, 0);
		rect(this.x + 3.5, this.y-30, 119 * this.hp/this.maxHp, 20);
		image(hpBarPic, this.x ,this.y - 50);
		
		
	}
	
	takeDamage(){
		this.hp -= 1;
		if (this.hp <= 0){
			this.hp = 0;
		}
	}

	
	static get SHIELDTYPE(){
		return SHIELD;
	}
	static get NOSHIELDTYPE(){
		return NOSHIELD;
	}
	static get NOOPTIONTYPE(){
		return NOOPTION;
	}
	static get YESOPTIONTYPE(){
		return YESOPTION;
	}
}