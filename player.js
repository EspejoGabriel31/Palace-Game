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
}