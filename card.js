class Card{
    constructor(suit, value){
        this.suit = suit;
        this.value = value;
        this.rank = 0;
        this.faceUP = true;
        this.hasEffect = false;
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
        if(!this.faceUP){
            return "hidden";
        }
        else{
            return this.value + " of " + this.suit;
            //this.rank + " " +  + " effect: " + this.hasEffect
        }
    }
/*
    activateEffect(){
        if(this.hasEffect){
            if(this.rank == 3){

            }
            if(this.rank == 7){ 

            }
            if(this.rank == 10){
                
            }
        }
        else{
            console.log("this is a normal card")
        }
    }*/
}