


async function main(){
    let deck = new Deck();
    deck.buildDeck()
    deck.addEffects()
    //deck.display()
    deck.shuffleDeck()

    let player1 = new Player("p1")
    let player2 = new Player("p2")
    
    let board = new Board(deck, player1, player2)
    board.deal()
    board.render()
    
    player1.renderLoadingZone()
    
    
    


    
    

    board.startGame()
    //board.play()
}
 
main()