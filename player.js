class Player{
    constructor(name){
        this.name = name;
        this.hand = [];
        this.faceDownFinal = [];
        this.faceUpFinal = [];
        this.score = 0;
    }

    draw(card){
        this.hand.push(card)
    }

    display(){
        console.log(">"+ this.name + " faceDownFinal:")
        for(let i = 0; i < 3; i++){
            console.log(this.faceDownFinal[i].display())
        }
        console.log(">"+ this.name + " faceUpFinal:")
        for(let i = 0; i < 3; i++){
            console.log(this.faceUpFinal[i].display())
        }
        console.log(">"+ this.name + " hand:")
        for(let i = 0; i < this.hand.length; i++){
            console.log(this.hand[i].display())
        }
    }
}