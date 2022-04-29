class Card{
    constructor(suit, value){
        this.suit = suit;
        this.value = value;
        this.faceUP = false
    }
}

class Deck{
    constructor(){
        this.cards = []
    }

    buildDeck(){
        let suits = ['clubs','hearts','diamonds','spades']
        let values = ['2','3','4','5','6','7','8','9','10','jack','queen','king','ace']
        let 
        for(let i = 0; i < 4; i++){
            for(let j = 0; j < 13; j++){
                let card = new Card(suits[0],values[j])
                this.cards.push(card)
            }
        }
    }

    shuffleDeck(){

    }

    deal(){

    }

}

class Player{
    constructor(name){
        this.name = name
        this.hand = []
        this.faceDownFinal = []
        this.faceUpFinal = []
    }
}

function main(){
    let deck = new Deck()
    deck.buildDeck()
    for(let i = 0; i < deck.cards.length; i++){
        console.log(deck.cards[i].suit + " " + deck.cards[i].value)
    }
}

main()