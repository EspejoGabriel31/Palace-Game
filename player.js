class Player{
    constructor(name){
        this.name = name;
        this.hand = [];
        this.faceDownFinal = [];
        this.faceUpFinal = [];
        this.playerDeck = [];
        this.loadingZone = [];
        this.wins = 0;
        this.selectedCard = null;
        this.selectedIndexHand = null;
        this.selectedIndexFU = null;
        this.selectedIndexFD = null;
        this.selectedBackrow = null
        this.deckColor = null
        this.backRowSwitched = false
        this.finalPhase = false
    }

    generateEmptyCard(){
        let blank = new Card(null, null)
        blank.isEmpty = true
        return blank
    }

    addToHand(card){
        if(!card.faceUP){
            card.flip();
        }
        this.hand.push(card)
    }

    addToLoad(index){
        let temp = this.hand[index]
        this.hand.splice(index, 1)
        this.loadingZone.unshift(temp)
        this.loadingZone.forEach(c => {
            //console.log(this.loadingZone.indexOf(c) + " " + c.display())
        })
    }

    addToLoadA(){
        let temp = this.selectedCard
        this.hand.splice(this.selectedIndexHand, 1)
        this.loadingZone.unshift(temp)
        this.selectedCard = null
        this.selectedIndexHand = null
        this.renderLoadingZone()
    }

    addFromFaceUp(index){
        let temp = this.faceUpFinal[index]
        this.faceUpFinal.splice(index, 1)
        this.loadingZone.unshift(temp)
    }

    addFromFaceDown(index){
        let temp = this.faceDownFinal[index]
        this.faceDownFinal.splice(index, 1)
        this.loadingZone.unshift(temp)
    }

    addFromFaceUpA(){
        let temp = this.selectedCard
        let store = this.faceUpFinal.splice(this.selectedBackrow, 1, this.generateEmptyCard()) //replace FU card with empty card
        console.log(store)
        this.loadingZone.unshift(temp) //
        this.selectedCard = null
        this.selectedIndexFU = null
    }

    addFromFaceDownA(){
        let temp = this.selectedCard
        this.faceDownFinal.splice(this.selectedIndexFD, 1, this.generateEmptyCard()) //replace FD card with empty card
        this.loadingZone.unshift(temp) //immediately sends card to pile
        this.selectedCard = null
        this.selectedIndexFD = null
        //this.renderPlayer()
    }


    drawTillThree(){
        while(this.hand.length < 3 && this.playerDeck.length != 0){
            this.drawFromDeck()
        }
    }

    drawFromDeck(){
        if(this.playerDeck.length != 0){
            let temp = this.playerDeck.shift()
            temp.flip()
            this.hand.push(temp)
        }
        else{
            alert("No more cards!")
        }
    }

    displayHand(){
        let count = 0
        console.log(this.name + "'s hand:")
        this.hand.forEach(c => console.log(count++ + ": " + c.display()))
    }

    displayLoad(){
        if(this.loadingZone == 0){
            //console.log("")
        }
        else{
            console.log("\nCards to be played:")
            this.loadingZone.forEach(c => console.log(">" + c.display()))
        }
    }

    displayFaceUp(){
        let count = 0
        console.log(this.name + "'s Face Up Cards:")
        this.faceUpFinal.forEach(c => console.log(count++ + ": " + c.display()))
    }

    displayFaceDown(){
        let count = 0
        //console.log(this.name + "'s Face Up Cards:")
        this.faceDownFinal.forEach(c => console.log(count++ + ": " + c.display()))
    }

    display(){
        //console.log(">>>"+ this.name + " faceDownFinal:")
        for(let i = 0; i < 3; i++){
            //console.log("    " + this.faceDownFinal[i].display())
        }
        //console.log(">>>"+ this.name + " faceUpFinal:")
        for(let i = 0; i < 3; i++){
            //console.log("    " + this.faceUpFinal[i].display())
        }
        //console.log(">>>"+ this.name + " hand:")
        for(let i = 0; i < this.hand.length; i++){
            //console.log("    " + this.hand[i].display())
        }
        //console.log(">>>"+ this.name + " playerDeck:")
        for(let i = 0; i < this.playerDeck.length; i++){
            //console.log("    " + this.playerDeck[i].display())
        }
    }

    displayRemainingCards(){
        //console.log(">>>"+ this.name + " playerDeck:")
        for(let i = 0; i < this.playerDeck.length; i++){
            //console.log("    " + this.playerDeck[i].display())
        }
    }

    isOutOfCards(){
        return this.isHandEmpty() && this.isFaceUpEmpty() && this.isFaceDownEmpty()
    }

    isHandEmpty(){
        return this.hand.length == 0
    }

    isFaceUpEmpty(){
        let i = 0
        this.faceUpFinal.forEach(c => {
            if(!c.isEmpty){
                ////console.log(c.display())
                i++
            }
        })
        return i == 0
    }

    isFaceDownEmpty(){
        let i = 0
        this.faceDownFinal.forEach(c => {
            if(!c.isEmpty){
                i++
            }
        })
        return i == 0
        //return this.faceDownFinal.length == 0
    }

    win(){
        this.wins++
    }

    renderLoadingZone(){
        for(let i = 0; i < this.loadingZone.length; i++){
            const lz = document.querySelector(`.loading-card-slot-${i}`)
            if(this.loadingZone[i] != null){
                lz.innerHTML = ``
                lz.appendChild(this.loadingZone[i].render())
            }
            else{
                lz.innerHTML = ``
            }
        }
    }

    rerenderFaceUp(){
        for(let i = 0; i < this.faceUpFinal.length; i++){
            const cardSlotFU = document.querySelector(`.play-card-slot-FU` + i)
            const newCard = document.createElement('div')
            newCard.className = "play-card-slot-FU" + i + " card-slot"
            let tempCard = this.faceUpFinal[i].render()
            newCard.appendChild(tempCard)
            cardSlotFU.replaceWith(newCard)
        }
    }

    rerenderFaceDown(){
        for(let i = 0; i < this.faceDownFinal.length; i++){
            const cardSlotFD = document.querySelector(`.play-card-slot-FD` + i)
            const newCard = document.createElement('div')
            newCard.className = "play-card-slot-FD" + i + " card-slot"
            let tempCard = this.faceDownFinal[i].render()
            newCard.appendChild(tempCard)
            cardSlotFD.replaceWith(newCard)
        }
    }

/*
    collect/save data for player
    redraw player
    function for defining actions for a turn
*/
    renderPlayer(){
        const playerName = document.querySelector('.player-name')
        playerName.innerHTML = `${this.name}`

        // //Player Side of Board

        for(let i = 0; i < this.faceUpFinal.length; i++){
            const cardSlotFU = document.querySelector(`.play-card-slot-FU` + i)
            cardSlotFU.innerHTML = ``
            let tempCard = this.faceUpFinal[i].render()
            cardSlotFU.appendChild(tempCard)
        }

        for(let i = 0; i < this.faceDownFinal.length; i++){    
            const cardSlotFD = document.querySelector(`.play-card-slot-FD` + i)
            cardSlotFD.innerHTML = ``
            let tempCard = this.faceDownFinal[i].render()
            cardSlotFD.appendChild(tempCard)
        }

        //Player Hand
        const playHandCardSlot = document.querySelector('.play-hand')
        playHandCardSlot.innerHTML = ''
        this.hand.forEach(c => {
            const cardDiv = this.renderHandCard(c)
            playHandCardSlot.append(cardDiv)
        })
        //Deck and Loading Zone
        const playerDeck = document.querySelector('.play-deck')
       
        playerDeck.innerHTML = this.playerDeck.length;
        playerDeck.style = `background-color: ${this.deckColor};`
        this.renderLoadingZone()
    }

    renderPlayerHand(){
        const playHandCardSlot = document.querySelector('.play-hand')
        playHandCardSlot.innerHTML = ''
        this.hand.forEach(c => {
            const cardDiv = this.renderHandCard(c)
            playHandCardSlot.appendChild(cardDiv)
        })
    }

    renderHandCard(card){
        if(!card.faceUP){
            card.flip()
        }
        const cardDiv = document.createElement('div')
        cardDiv.className = 'hand-card-slot-' + this.hand.indexOf(card);
        cardDiv.style = "width: 4rem;"
        cardDiv.appendChild(card.render())
        
        return cardDiv     
    }

    flipHand(){
        this.hand.forEach(c => {
            c.flip()
        })
        this.renderPlayerHand()
    }    

    renderOpponent(){
        //Opponent side of Board
        for(let i = 0; i < this.faceUpFinal.length; i++){
            const cardSlotFU = document.querySelector(`.opp-card-slot-FU` + i)          
            cardSlotFU.innerHTML = ``
            let tempCard = this.faceUpFinal[i].render()
            cardSlotFU.appendChild(tempCard)
        }
        for(let i = 0; i < this.faceDownFinal.length; i++){
            const cardSlotFD = document.querySelector(`.opp-card-slot-FD` + i)
            cardSlotFD.innerHTML = `` 
            let tempCard1 = this.faceDownFinal[i].render()
            cardSlotFD.appendChild(tempCard1)
        }
        //Opponent Hand
        const oppHand = document.querySelector('.opp-hand')
        oppHand.innerHTML = ''
        this.hand.forEach(c => {
            if(c.faceUP){
                c.flip()
            }
            const oppHandCardSlot = document.createElement('div')
            oppHandCardSlot.className = 'hand-card-slot';
            const cardDiv = c.render()
            oppHandCardSlot.appendChild(cardDiv)
            oppHand.append(oppHandCardSlot)
        })
        //Opponent deck
        const opponentDeck = document.querySelector('.opp-deck')
        opponentDeck.innerHTML = this.playerDeck.length;
        opponentDeck.style = `background-color: ${this.deckColor};`
    }


}