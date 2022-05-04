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

    addToHand(card){
        if(!card.faceUP){
            card.flip();
        }
        this.hand.push(card)
    }

    addToLoad(index){
        let temp = this.hand[index]
        this.hand.splice(index, 1)
        this.loadingZone.push(temp)
    }

    drawFromDeck(){
        if(this.playerDeck.length != 0){
            let temp = this.playerDeck.shift()
            temp.flip()
            this.hand.push(temp)
        }
        else{
            alert("No more cards!")
        }
    }

    displayHand(){
        let count = 0
        console.log(this.name + "'s hand:")
        this.hand.forEach(c => console.log(++count + ": " + c.display()))
    }

    displayLoad(){
        if(this.loadingZone == 0){
            console.log("")
        }
        else{
            console.log("\nCards to be played:")
            this.loadingZone.forEach(c => console.log(">" + c.display()))
        }
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