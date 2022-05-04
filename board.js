class Board{
    constructor(deck, player1, player2){
        this.pile = []
        this.deck = deck
        this.p1 = player1
        this.p2 = player2
        this.topCardRank = 0
    }

    play(){
        let turn = 0;
        let run = true
        while(run){
            console.log("*****Turn: " + turn + "*****")
            this.displayPile()
            let tp = null
            if(turn % 2 == 0){               
                tp = this.p1
            }
            else{
                tp = this.p2
            }
            this.menu(tp)
            const input = prompt("select an option")
            if(input == 1){
                this.selectCards(tp)
            }
            else if(input == 2){
                tp.drawFromDeck()
                tp.displayHand()                    
            }
            else if(input == 3){
                console.log("Turn passed")
            }
            else if(input == 0){
                run = false
            }
            console.log("\n")
            turn++
        }
    }

    menu(player){
        console.log(player.name + "'s turn!")
        player.displayHand()
        console.log("\nChoose an option")
        console.log("1. Play cards")
        console.log("2. Draw from deck")
        console.log("3. Pass")
        console.log("0. Quit")
    }

    selectCards(p){
        let run = true
        let firstCardRank = 0
        let tempCardRank = 0
        let counter = 0
        while(run){
            console.log("Select up to 4 cards to play, and then enter 'done' to push cards (or enter 'exit' to go back):")
            p.displayHand()
            p.displayLoad()
            for(let i = 0; i < p.hand.length; i++){
                console.log("[" + i + "]")
            }
            const choice = prompt()
            if(choice >= 0 && choice < p.hand.length){
                tempCardRank = p.hand[choice].rank
                if(counter == 0){
                    firstCardRank = tempCardRank
                    p.addToLoad(choice)
                    counter++
                }
                else{
                    if(firstCardRank != tempCardRank){
                        console.log("============================\nInvalid: multiple cards must be of the same value\n============================")
                    }
                    else{
                        p.addToLoad(choice)
                    }
                }
                
            }
            else if (choice == "exit"){
                run = false
                break
            }
            else if (choice == "done"){
                let l = p.loadingZone.length
                for(let i = 0; i < l; i++){
                    this.pile.push(p.loadingZone.pop())
                }
                run = false
                break
            }
            else{
                alert("invalid input")
            }
        }
        

    }

    displayPile(){
        let counter = 0
        console.log("Pile:")
        this.pile.forEach(c => console.log(++counter + ": " + c.display()))
    }

    deal(){
        let n = 0
        while(n < 18){
            if(n % 2 == 0){
                if(n < 6){
                    this.p1.faceDownFinal.push(this.deck.draw())
                }
                else if(n >= 6 && n < 12){
                    this.p1.faceUpFinal.push(this.deck.draw())
                }
                else{
                    this.p1.addToHand(this.deck.draw())
                }
            }
            else{
                if(n < 6){
                    this.p2.faceDownFinal.push(this.deck.draw())
                }
                else if(n >= 6 && n < 12){
                    this.p2.faceUpFinal.push(this.deck.draw())
                }
                else{
                    this.p2.addToHand(this.deck.draw())
                }
            }
            n++
        }
        for(let i = 0; i < this.p1.faceDownFinal.length; i++){
            this.p1.faceDownFinal[i].flip()
            this.p2.faceDownFinal[i].flip()
        }
    
        for(let i = 0; i < 34; i++){
            if(i % 2 == 0){
                this.p1.playerDeck.push(this.deck.draw())
            }
            else{
                this.p2.playerDeck.push(this.deck.draw())
            }
        }
    
        for(let i = 0; i < this.p1.playerDeck.length; i++){
            this.p1.playerDeck[i].flip()
            this.p2.playerDeck[i].flip()
        }
    }
    
}