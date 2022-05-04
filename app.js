function main(){
    let deck = new Deck();
    deck.buildDeck()
    deck.shuffleDeck()

    let player1 = new Player("rei")
    let player2 = new Player("shinji")
    

    deck.display()
    console.log("---------------------------")
    deal(deck, player1, player2)
    
    

    player1.display()
    player2.display()

    console.log("---------------------------")
    player1.draw(player1.playerDeck.shift())
    player1.display()

    
}

function play(card1, card2){
    
}

function deal(deck, player1, player2){
    let n = 0
    while(n < 18){
        if(n % 2 == 0){
            if(n < 6){
                player1.faceDownFinal.push(deck.draw())
            }
            else if(n >= 6 && n < 12){
                player1.faceUpFinal.push(deck.draw())
            }
            else{
                player1.draw(deck.draw())
            }
        }
        else{
            if(n < 6){
                player2.faceDownFinal.push(deck.draw())
            }
            else if(n >= 6 && n < 12){
                player2.faceUpFinal.push(deck.draw())
            }
            else{
                player2.draw(deck.draw())
            }
        }
        n++
    }
    for(let i = 0; i < player1.faceDownFinal.length; i++){
        player1.faceDownFinal[i].flip()
        player2.faceDownFinal[i].flip()
    }

    console.log("=========================")
    deck.display()
    console.log("=========================")

    for(let i = 0; i < 34; i++){

        console.log(i)
        console.log(deck.peek())
        if(i % 2 == 0){
            player1.playerDeck.push(deck.draw())
        }
        else{
            player2.playerDeck.push(deck.draw())
        }
    }

    for(let i = 0; i < player1.playerDeck.length; i++){
        player1.playerDeck[i].flip()
        player2.playerDeck[i].flip()
    }
}

main()