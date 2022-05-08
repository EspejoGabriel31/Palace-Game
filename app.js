


async function main(){
    let deck = new Deck();
    deck.buildDeck()
    deck.addEffects()
    //deck.display()
    deck.shuffleDeck()

    let player1 = new Player("kagami")
    let player2 = new Player("p2")
    
    let board = new Board(deck, player1, player2)
    board.deal()
    player1.addToLoad(0)
    //player1.addToLoad(1)
    //player1.addToLoad(2)
    
    
    


    
    

    board.startGame()
    //board.play()
}
 
main()