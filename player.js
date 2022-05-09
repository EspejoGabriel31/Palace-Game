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
        
    }

    addToHand(card){
        if(!card.faceUP){
            card.flip();
        }
        this.hand.push(card)
    }

    addToHandA(){
        
    }

    addToLoad(index){
        let temp = this.hand[index]
        this.hand.splice(index, 1)
        this.loadingZone.unshift(temp)
        this.loadingZone.forEach(c => {
            console.log(this.loadingZone.indexOf(c) + " " + c.display())
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
            console.log("")
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
        console.log(this.name + "'s Face Up Cards:")
        this.faceDownFinal.forEach(c => console.log(count++ + ": " + c.display()))
    }

    display(){
        console.log(">>>"+ this.name + " faceDownFinal:")
        for(let i = 0; i < 3; i++){
            console.log("    " + this.faceDownFinal[i].display())
        }
        console.log(">>>"+ this.name + " faceUpFinal:")
        for(let i = 0; i < 3; i++){
            console.log("    " + this.faceUpFinal[i].display())
        }
        console.log(">>>"+ this.name + " hand:")
        for(let i = 0; i < this.hand.length; i++){
            console.log("    " + this.hand[i].display())
        }
        console.log(">>>"+ this.name + " playerDeck:")
        for(let i = 0; i < this.playerDeck.length; i++){
            console.log("    " + this.playerDeck[i].display())
        }
    }

    displayRemainingCards(){
        console.log(">>>"+ this.name + " playerDeck:")
        for(let i = 0; i < this.playerDeck.length; i++){
            console.log("    " + this.playerDeck[i].display())
        }
    }

    isOutOfCards(){
        return this.isHandEmpty() && this.isFaceUpEmpty() && this.isFaceDownEmpty()
    }

    isHandEmpty(){
        return this.hand.length == 0
    }

    isFaceUpEmpty(){
        return this.faceUpFinal.length == 0
    }

    isFaceDownEmpty(){
        return this.faceDownFinal.length == 0
    }

    win(){
        this.wins++
    }

    renderLoadingZone(){
        for(let i = 0; i < this.loadingZone.length; i++){
            if(this.loadingZone[i] != null){
                const lz = document.querySelector(`.loading-card-slot-${i}`)
                lz.innerHTML = ``
                lz.appendChild(this.loadingZone[i].render())
            }
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

        //Player Side of Board
        for(let i = 0; i < 3; i++){
            const cardSlotFU = document.querySelector(`.play-card-slot-FU` + i)
            const cardSlotFD = document.querySelector(`.play-card-slot-FD` + i)
            cardSlotFU.innerHTML = ``
            cardSlotFD.innerHTML = ``
            let tempCard = this.faceUpFinal[i].render()
            let tempCard1 = this.faceDownFinal[i].render()
            // tempCard.addEventListener('click', () => {
            //     this.selectedCard = this.faceUpFinal[i];
            //     this.selectedIndexFU = i
            //     console.log(this.selectedCard.display() + ' ' + this.selectedIndexFU)
            // })
            // tempCard1.addEventListener('click', () => {
            //     this.selectedCard = this.faceDownFinal[i];
            //     this.selectedIndexFD = i
            //     console.log(this.selectedCard.display() + ' ' + this.selectedIndexFD)
            // }) 
            cardSlotFU.appendChild(tempCard)
            cardSlotFD.appendChild(tempCard1)
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
        console.log(this.playerDeck.length)
        playerDeck.innerHTML = this.playerDeck.length;
        this.renderLoadingZone()
    }

    renderPlayerHand(){
        const playHandCardSlot = document.querySelector('.play-hand')
        playHandCardSlot.innerHTML = ''
        this.hand.forEach(c => {
            const cardDiv = this.renderHandCard(c)
            playHandCardSlot.append(cardDiv)
        })
    }

    flipHand(){
        this.hand.forEach(c => {
            c.flip()
        })
        this.renderPlayerHand()
    }

    renderHandCard(card){
        const cardDiv = document.createElement('div')
        cardDiv.className = 'hand-card-slot-' + this.hand.indexOf(card);
        cardDiv.style = "width: 4rem;"
        cardDiv.appendChild(card.render())

        // const cardDiv = document.querySelector('.hand-card-slot')
        // cardDiv.addEventListener('click', () => {
        //     this.selectedCard = card;
        //     this.selectedIndexHand = this.hand.indexOf(card)
        //     console.log(this.selectedCard.display() + " " + this.selectedIndexHand)
        // })

        return cardDiv
        
    }

    renderOpponent(){
        //Opponent side of Board
        for(let i = 0; i < 3; i++){
            const cardSlotFU = document.querySelector(`.opp-card-slot-FU` + i)
            const cardSlotFD = document.querySelector(`.opp-card-slot-FD` + i)
            cardSlotFU.innerHTML = ``
            cardSlotFD.innerHTML = ``
            let tempCard = this.faceUpFinal[i].render()
            let tempCard1 = this.faceDownFinal[i].render()
            cardSlotFU.appendChild(tempCard)
            cardSlotFD.appendChild(tempCard1)
        }
        //Opponent Hand
        const oppHand = document.querySelector('.opp-hand')
        oppHand.innerHTML = ''
        this.hand.forEach(c => {
            c.flip()
            const oppHandCardSlot = document.createElement('div')
            oppHandCardSlot.className = 'hand-card-slot';
            const cardDiv = c.render()
            oppHandCardSlot.appendChild(cardDiv)
            oppHand.append(oppHandCardSlot)
        })
        //Opponent deck
        const opponentDeck = document.querySelector('.opp-deck')
        console.log(this.playerDeck.length)
        opponentDeck.innerHTML = this.playerDeck.length;
    }
}