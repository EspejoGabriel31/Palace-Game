class Board{
    constructor(deck, player1, player2){
        this.pile = []
        this.deck = deck
        this.p1 = player1
        this.p2 = player2
        this.topCardRank = 0
        this.turn = 0
    }
    

    /**
     * Main function for game
     */
    play(){
        let run = true
        while(run){
            console.log("*****Turn: " +this.turn + "*****")
            this.displayPile()
            let tp = null
            if(this.turn % 2 == 0){               
                tp = this.p1
            }
            else{
                tp = this.p2
            }
            tp.drawTillThree()
            tp.displayRemainingCards()
            this.menu(tp)
            const input = prompt("select an option")
            if(isNaN(input)){
                console.log("\n============================\nInvalid. Enter a number\n============================\n")
                continue
            }
            if(input < 0 || input > 4){
                console.log("\n============================\nInvalid. Enter a number displayed\n============================\n")
                continue
            }
            if(input == 1 && !tp.isHandEmpty()){
                this.selectCards(tp)
            }
            else if(input == 2){
                console.log("\n============================\nTurn passed\n============================\n")
                this.takePile(tp)
            }
            else if(input == 0){
                run = false
            }
            else if(input == 3 && tp.isHandEmpty()){
                this.faceUpLast(tp)
            }
            else if(input == 4 && tp.isFaceUpEmpty() && tp.isHandEmpty()){

            }
            else{
                console.log("\n============================\nCan't be used right now\n============================\n")
                continue
            }
        
            
            console.log("\n")
            this.turn++
        }
    }

    /**
     * Displays main menu based on which player is in control
     * @param {*} player 
     */
    menu(player){
        console.log(player.name + "'s turn!")
        player.displayHand()
        console.log("\nChoose an option")
        if(!player.isHandEmpty()){
            console.log("1. Play cards")
        }
        //console.log("2. Draw from deck")
        console.log("2. Pass")
        if(player.isHandEmpty()){
            console.log("3. Play face up final cards")
        }
        if(player.isHandEmpty() && player.isFaceUpEmpty()){
            console.log("4. Play face down final cards")
        }
        console.log("0. Quit")
    }

    /**
     * function to activate a card's effect
     * @param {*index of effect card} index 
     * @param {*player instance being used} p 
     * @param {*selector for which version of the function to use} selector 
     */
    activateEffect(index, p, selector){
        if(selector == 1){ //hand
            console.log("\n============================\nThis Card has an effect\n============================\n")
            if(p.hand[index].rank == 3){ //skip turn
                console.log("\n============================\nキング・クリムゾン\n============================\n")
                this.turn++ //SKIP OTHER PLAYER'S TURN
                p.hand.splice(index,1) //REMOVE 3 CARD FROM PLAY
            }
            else if(p.hand[index].rank == 7){ //copy top card
                console.log("\n============================\nCopied Top Card\n============================\n")
                p.addToLoad(index) 
                this.addToPile(p) //ADD 7 CARD TO TO TOP OF PILE WITHOUT CHANGING THE TOPCARD RANK
            }
            else if(p.hand[index].rank == 10){ //bomb
                console.log("\n============================\nキラークイーン\n============================\n")
                this.clearPile() //CLEAR PILE AND RESET TOPCARDRANK TO 0
                p.hand.splice(index,1) //REMOVE 10 CARD FROM PLAY
            }
        }
        else if(selector == 2){//faceUp
            console.log("\n============================\nThis Card has an effect\n============================\n")
            if(p.faceUpFinal[index].rank == 3){ //skip turn
                console.log("\n============================\nキング・クリムゾン\n============================\n")
                this.turn++ //SKIP OTHER PLAYER'S TURN
                p.faceUpFinal.splice(index,1) //REMOVE 3 CARD FROM PLAY
            }
            else if(p.faceUpFinal[index].rank == 7){ //copy top card
                console.log("\n============================\nCopied Top Card\n============================\n")
                p.addToLoad(index) 
                this.addToPile(p) //ADD 7 CARD TO TO TOP OF PILE WITHOUT CHANGING THE TOPCARD RANK
            }
            else if(p.faceUpFinal[index].rank == 10){ //bomb
                console.log("\n============================\nキラークイーン\n============================\n")
                this.clearPile() //CLEAR PILE AND RESET TOPCARDRANK TO 0
                p.faceUpFinal.splice(index,1) //REMOVE 10 CARD FROM PLAY
            }
        }
        else if(selector == 3){//faceDown
            console.log("\n============================\nThis Card has an effect\n============================\n")
            if(p.faceDownFinal[index].rank == 3){ //skip turn
                console.log("\n============================\nキング・クリムゾン\n============================\n")
                this.turn++ //SKIP OTHER PLAYER'S TURN
                p.faceDownFinal.splice(index,1) //REMOVE 3 CARD FROM PLAY
            }
            else if(p.faceDownFinal[index].rank == 7){ //copy top card
                console.log("\n============================\nCopied Top Card\n============================\n")
                p.addToLoad(index) 
                this.addToPile(p) //ADD 7 CARD TO TO TOP OF PILE WITHOUT CHANGING THE TOPCARD RANK
            }
            else if(p.faceDownFinal[index].rank == 10){ //bomb
                console.log("\n============================\nキラークイーン\n============================\n")
                this.clearPile() //CLEAR PILE AND RESET TOPCARDRANK TO 0
                p.faceDownFinal.splice(index,1) //REMOVE 10 CARD FROM PLAY
            }
        }

    }
    /**
     * function for adding cards from player's loading zone to pile
     * @param {*player instance being used} p 
     */
    addToPile(p){
        if(p.loadingZone[0].rank == 7){
            this.pile.unshift(p.loadingZone.pop())
        }
        else{
            let l = p.loadingZone.length
            for(let i = 0; i < l; i++){
                this.pile.unshift(p.loadingZone.pop())
            }
            this.topCardRank = this.pile[0].rank
        }
        
    }

    /**
     * Clear pile and start new one
     */
    clearPile(){
        this.pile = []
        this.topCardRank = 0
    }

    faceUpLast(p){
        let run = true
        while(run){
            this.selectFaceUpMenu(p)
            const choice = prompt()
            if(isNaN(choice)){
                if(choice == "-"){
                    this.takePile(p)
                    run = false
                    break
                }
                else{
                    alert("invalid input")
                }
            }
            else{
                if(choice >= 0 && choice < p.faceUpFinal.length){
                    if(p.faceUpFinal[choice].hasEffect)
                    {
                        this.activateEffect(choice, p, 2)
                        run = false
                        break
                    }
                    else if(p.faceUpFinal[choice].rank < this.topCardRank){
                        console.log("\n============================\nCard must be higher value than top of pile!\n============================\n")
                    }
                    else{
                        p.addFromFaceUp(choice)
                        this.addToPile(p)
                        run = false
                        break
                    }
                }
            }
        }
    }

    /**
     * function for selecting cards stage
     * @param {*} p 
     */
    selectCards(p){
        let run = true
        let firstCardRank = 0
        let tempCardRank = 0
        let counter = 0
        while(run){
            this.selectMenu(p)
            const choice = prompt()
            //check if input is a not a number
            if(isNaN(choice)){
                //exit condition 
                if (choice == "-"){
                    if(p.loadingZone.length != 0){
                        let l = p.loadingZone.length
                        for(let i = 0; i < l; i++){
                            p.hand.push(p.loadingZone.pop())
                        }
                    }
                    this.takePile(p)
                    run = false
                    break
                }
                //continue condition
                else if (choice == "+"){
                    //if loading zone has all four of one card it becomes a bomb
                    if(p.loadingZone.length == 4){ 
                        this.clearPile()
                        p.loadingZone = []
                    }
                    else{
                        this.addToPile(p)
                    }
                    run = false
                    break
                }
                //error handling
                else{
                    alert("invalid input")
                }
            }
            else
            {
                //check if selected index is in the array
                if(choice >= 0 && choice < p.hand.length){
                    
                    //check if selected card has an effect
                    if(p.hand[choice].hasEffect && p.loadingZone.length == 0)
                    {
                        this.activateEffect(choice, p, 1)
                        run = false
                        break
                    }

                    else if(p.hand[choice].hasEffect && p.loadingZone.length != 0){
                        console.log("\n============================\nYou have already played normal cards\n============================\n")
                    }

                    //check if selected card is higher value than the current top card
                    else if(p.hand[choice].rank < this.topCardRank)
                    {
                        console.log("\n============================\nCard must be higher value than top of pile!\n============================\n")
                    }
                    else{
                        //check if selected index is in the array
                        tempCardRank = p.hand[choice].rank
                        //check if this is the first card added to teh loading zone
                        if(counter == 0)
                        {
                            firstCardRank = tempCardRank
                            p.addToLoad(choice)
                            counter++
                        }
                        else
                        {
                            //check if the cards added to the loading zone have the same value
                            if(firstCardRank != tempCardRank)
                            {
                                console.log("\n============================\nInvalid: multiple cards must be of the same value\n============================\n")
                            }
                            else
                            {
                                p.addToLoad(choice)
                            }
                        }
                    }
                }
                else{
                    console.log("\n============================\nInvalid: choice not within array\n============================\n")
                }
            }
            
        }
    }

    /**
     * selecting cards menu
     * @param {player object} p 
     */
    selectMenu(p){
        console.log("\nSelect up to 4 cards to play, and then enter '+' to push cards (or enter '-' to go back):")
        p.displayHand()
        p.displayLoad()
        for(let i = 0; i < p.hand.length; i++){
            console.log("[" + i + "]")
        }
    }

    selectFaceUpMenu(p){
        console.log("\nSelect one of your Face Up cards to play, and then enter '+' to push cards:")
        p.displayFaceUp()
        for(let i = 0; i < p.faceUpFinal.length; i++){
            console.log("[" + i + "]")
        }
        
    }

    /**
     * add pile to player hand
     * @param {player object} p 
     */
    takePile(p){
        let len = this.pile.length
        for(let i = 0; i < len; i++){
            p.addToHand(this.pile.shift())
        }
        this.topCardRank = 0
    }

    /**
     * Show the current pile
     */
    displayPile(){
        let counter = 0
        console.log("\n*********Pile:*********")
        this.pile.forEach(c => console.log(++counter + ": " + c.display()))
        console.log("***********************\n")
    }

    /**
     * Deal cards out to both players
     */
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
    /*
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
        }*/
    }
    
}