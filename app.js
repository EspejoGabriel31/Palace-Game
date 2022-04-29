function main(){
    let deck = new Deck();
    deck.buildDeck()
    for(let i = 0; i < deck.cards.length; i++){
        console.log(deck.cards[i].suit + " " + deck.cards[i].value)
    }
}

main()