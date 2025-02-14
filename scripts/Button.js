class Button{
	constructor(x, y, w ,h, text){
		this.x = x;
		this.y = y;
		this.w = w ;
		this.h = h;
		this.text = text;
        this.clickEvent;
	}
	
    set ClickEvent(clickEvent){
        this.clickEvent = clickEvent;
    }

	display(){

        stroke(0);
        strokeWeight(1);
		fill(255);
		rect(this.x, this.y, this.w, this.h);
        fill(0);
        textSize(15);
        textAlign(CENTER);
        textStyle(NORMAL);
        text(this.text, this.x + this.w/2, this.y + this.h/2 + 5);
	}
	
    onClick(){
        if (this.mouseOnButton()){
            this.clickEvent();
        }
        
    }

    mouseOnButton(){
        if(mouseX > this.x && mouseX < this.x  + this.w 
            && mouseY > this.y && mouseY < this.y + this.h){
                return true;
            }
            return false;
    }
		
}