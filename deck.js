class Deck{
    constructor(){
        this.cards = []
    }

    buildDeck(){
        let suits = ['clubs','hearts','diamonds','spades']
        let values = ['2','3','4','5','6','7','8','9','10','jack','queen','king','ace']
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

