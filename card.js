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
        if(this.faceUP){
            card.innerText = this.symbol()
            card.classList.add("card", this.color())
            card.dataset.value = `${this.value} ${this.symbol()}`
        }
        else{
            card.style.backgroundColor = "red";
            card.classList.add("card")
        }
        
            return card
    }

}