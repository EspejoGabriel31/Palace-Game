class Player{
    constructor(name){
        this.name = name;
        this.hand = [];
        this.faceDownFinal = [];
        this.faceUpFinal = [];
        this.playerDeck = []
        this.loadingZone = []
        this.score = 0;
    }

    draw(card){
        if(!card.faceUP){
            card.flip();
        }
        this.hand.push(card)
    }

    

    display(){
        console.log(">>>"+ this.name + " faceDownFinal:")
        for(let i = 0; i < 3; i++){
            console.log(this.faceDownFinal[i].display())
        }
        console.log(">>>"+ this.name + " faceUpFinal:")
        for(let i = 0; i < 3; i++){
            console.log(this.faceUpFinal[i].display())
        }
        console.log(">>>"+ this.name + " hand:")
        for(let i = 0; i < this.hand.length; i++){
            console.log(this.hand[i].display())
        }
        console.log(">>>"+ this.name + " playerDeck:")
        for(let i = 0; i < this.playerDeck.length; i++){
            console.log(this.playerDeck[i].display())
        }
    }
}