function main(){
    let deck = new Deck();
    deck.buildDeck()
    deck.shuffleDeck()

    let player1 = new Player("p1")
    let player2 = new Player("p2")
    
    let board = new Board(deck, player1, player2)

    

    board.deal()
    board.play()

    
}
 
main()