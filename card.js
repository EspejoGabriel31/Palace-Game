class Card{
    constructor(suit, value){
        this.suit = suit;
        this.value = value;
        this.rank = 0
        this.faceUP = false;
    }

    flip(){
        if(this.faceUP){
            this.faceUP = false
        }
        else{
            this.faceUP = true
        }
    }

    

    display(){
        if(this.faceUP == true){
            return "hidden";
        }
        else{
            return this.rank + " " + this.value + " of " + this.suit;
        }
    }
}