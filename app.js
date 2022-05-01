function main(){
    let deck = new Deck();
    deck.buildDeck()
    deck.shuffleDeck()

    let player1 = new Player("rei")
    let player2 = new Player("shinji")
    

    for(let i = 0; i < deck.getLength(); i++){
        console.log(i + 1 + " " + deck.cards[i].value + " " + deck.cards[i].suit)
    }
    console.log("---------------------------")
    deal(deck, player1, player2)
    
    console.log(player1.name + " faceDownFinal:")
    for(let i = 0; i < 3; i++){
        console.log(player1.faceDownFinal[i])
    }

    console.log(player2.name + " faceDownFinal:")
    for(let i = 0; i < 3; i++){
        console.log(player2.faceDownFinal[i])
    }

    console.log(player1.name + " faceUpFinal:")
    for(let i = 0; i < 3; i++){
        console.log(player1.faceUpFinal[i])
    }
    console.log(player2.name + " faceUpFinal:")
    for(let i = 0; i < 3; i++){
        console.log(player2.faceUpFinal[i])
    }

    console.log(player1.name + " hand:")
    for(let i = 0; i < player1.hand.length; i++){
        console.log(player1.hand[i])
    }
    console.log(player2.name + " hand:")
    for(let i = 0; i < player2.hand.length; i++){
        console.log(player2.hand[i])
    }

    console.log("---------------------------")
    for(let i = 0; i < deck.getLength(); i++){
        console.log(i + 1 + " " + deck.cards[i].value + " " + deck.cards[i].suit)
    }

    

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
}


main()