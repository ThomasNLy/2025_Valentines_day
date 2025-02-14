let SHIELD = 0;
let NOSHIELD = 1;

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
	}

	display() {
		if (this.type === SHIELD) {

			this.shield.update(this.x - this.shield.w / 2 + 10, this.y - this.shield.h / 2 + 10);
			this.shield.display();
		}

		fill(255, 0, 0);
		rect(this.x, this.y, 10, 10);
		text(this.text, this.x, this.y);
		this.hitbox.display();
		this.hitbox.update(this.x, this.y);
		this.hpBar();
	}

	hpBar(){
		fill(0);
		rect(this.x, this.y, 100, 50);
		fill(255, 0, 0);
		rect(this.x, this.y, 100 * this.hp/this.maxHp, 50);
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
}