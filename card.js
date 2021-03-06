class Card{
    constructor(suit, value){
        this.suit = suit;
        this.value = value;
        this.rank = 0;
        this.faceUP = true;
        this.hasEffect = false;
        this.isEmpty = false;
        this.faceUpIndex = null;
        this.faceDownIndex = null;
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
            return this.value + " of " + this.suit + " FU Index: " + this.faceUpIndex + " FD Index: " + this.faceDownIndex; 
            //this.rank + " " +  + " effect: " + this.hasEffect
        }
    }

    color(){
        if(this.suit == 'spades' || this.suit == 'clubs'){
            return 'black'
        }
        else{
            return 'red'
        }
    }

    symbol(){
        if(this.suit == 'spades'){
            return '♠'
        }
        else if(this.suit == 'hearts'){
            return '♥'
        }
        else if(this.suit == 'diamonds'){
            return '♦'
        }
        else if(this.suit == 'clubs'){
            return '♣'
        }
    }


    render(){
        const card = document.createElement('div');
        if(this.isEmpty){
            return card
        }
        else if(this.faceUP){
            card.innerText = this.symbol()
            card.classList.add("card", this.color())
            card.dataset.value = `${this.value} ${this.symbol()}`
            return card
        }
        else{
            card.style.backgroundColor = "grey";
            card.classList.add("card")
        }
        
            return card
    }

}