class Card{
    constructor(suit, value){
        this.suit = suit;
        this.value = value;
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
}