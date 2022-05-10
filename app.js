//===============================================Set Up game===============================================
let deck = new Deck();
deck.buildDeck()
deck.addEffects()
deck.shuffleDeck()

let name1 = prompt('Enter Player 1\'s name')
let name2 = prompt('Enter Player 2\'s name')
let player1 = new Player(name1)
let player2 = new Player(name2)
player1.deckColor = "crimson"
player2.deckColor = "navy"
let board = new Board(deck, player1, player2)
board.deal()

//===============================================global variables===============================================
let tempPlayer = null
let tempOpponent = null
let counter = 0
let firstCardRank = null
const startButton = document.querySelector('.start-button')
const passButton = document.querySelector('.pass-button')
const unshiftButton = document.querySelector('.unshift-button')
let cardDiv = null
let FUcardDiv = null

function main(){
    board.render()
    counter = 0
    firstCardRank = null

    //win condition 
    if(tempPlayer != null && tempPlayer.isOutOfCards()){
        tempPlayer.wins++

        alert(`${tempPlayer.name} wins!`)
        return
    }

    //swap players depending on the turn
    if(board.turn % 2 == 0){
        tempPlayer = player1
        tempOpponent = player2
    }
    else{
        tempPlayer = player2
        tempOpponent = player1  
    }

    tempPlayer.drawTillThree()
    tempPlayer.renderPlayer()
    tempOpponent.renderOpponent()

    board.turn++
    
}

//===============================================helper functions===============================================

function resetPanel(){
    startButton.disabled = false
    passButton.disabled = false
    unshiftButton.disabled = true 
    passButton.innerHTML = `Pass` 
    board.selectPhase = false
    board.mainPhase = true
}

function newTurn(){
    switchBackandFront()
    tempPlayer.renderLoadingZone()
    tempPlayer.renderPlayerHand()
    board.render()
    resetPanel()
    main()
}

function switchPhase(){    
    if(board.mainPhase){
        board.selectPhase = true
        board.mainPhase = false
        startButton.disabled = true
    }
    else{
        board.selectPhase = false
        board.mainPhase = true
        startButton.disabled = false
    }
    if(!tempPlayer.finalPhase && tempPlayer.backRowSwitched){
        tempPlayer.finalPhase = true
    }
}

function switchBackandFront(){
    const fuNode0 = document.querySelector('.play-card-slot-FU0')
    const fuNode1 = document.querySelector('.play-card-slot-FU1')
    const fuNode2 = document.querySelector('.play-card-slot-FU2')
    if(fuNode0.innerHTML == '<div></div>' && fuNode1.innerHTML == '<div></div>' && fuNode2.innerHTML == '<div></div>' && !tempPlayer.backRowSwitched){
        let tempArray = tempPlayer.faceUpFinal
        let tempArrayA = tempPlayer.faceDownFinal
        tempPlayer.faceUpFinal = tempArrayA
        tempPlayer.faceDownFinal = tempArray
        tempPlayer.backRowSwitched = true
    }
}

function effectActivate(selector){
    if(selector == 1){
        if(tempPlayer.selectedCard.rank == 3){
            board.turn++
            tempPlayer.hand.splice(tempPlayer.selectedIndexHand, 1)
        }
        else if(tempPlayer.selectedCard.rank == 7){
            tempPlayer.addToLoadA()
            board.addToPile(tempPlayer)
        }
        else if(tempPlayer.selectedCard.rank == 10){
            board.clearPile()
            tempPlayer.hand.splice(tempPlayer.selectedIndexHand, 1)
        }
    }
    else if(selector == 2){
        
        if(tempPlayer.selectedCard.rank == 3){
            board.turn++
            tempPlayer.faceUpFinal.splice(tempPlayer.selectedBackrow, 1, tempPlayer.generateEmptyCard())
        }
        else if(tempPlayer.selectedCard.rank == 7){
            tempPlayer.addFromFaceUpA()
            board.addToPile(tempPlayer)
        }
        else if(tempPlayer.selectedCard.rank == 10){
            board.clearPile()
            tempPlayer.faceUpFinal.splice(tempPlayer.selectedBackrow, 1, tempPlayer.generateEmptyCard())
        }
        tempPlayer.rerenderFaceUp()
    }
    
    newTurn()
}

//===============================================event listeners===============================================
startButton.addEventListener('click', startEvent)

passButton.addEventListener('click', passEvent)

unshiftButton.addEventListener('click', unshiftEvent)

function startEvent() {
    switchPhase()    
    addSelectCardEventListeners()
    if(tempPlayer.loadingZone.length != 0){
        unshiftButton.disabled = false
    }
    if(tempPlayer.isHandEmpty() && !tempPlayer.isFaceUpEmpty()){
        addBackrowEventListeners()
    }
}

function passEvent(){
    if(tempPlayer.loadingZone.length != 0){
        let l = tempPlayer.loadingZone.length
        for(let i = 0; i < l; i++){
            const loadingZoneCard = document.querySelector('.loading-card-slot-' + i)
            tempPlayer.hand.push(tempPlayer.loadingZone.pop())
            loadingZoneCard.innerHTML = ``
        }
    }
    board.takePile(tempPlayer)
    newTurn()
}

function unshiftEvent(){
    board.addToPile(tempPlayer)
    newTurn()
}

function addSelectCardEventListeners(){
    let i = 0
    tempPlayer.hand.forEach(c => {
        cardDiv = document.querySelector(`.hand-card-slot-${i++}`)
        cardDiv.addEventListener('click', () => {
            cardEvent(c)
        })
    })
}

function cardEvent(c)  { //when card has been clicked on
    tempPlayer.selectedCard = c
    tempPlayer.selectedIndexHand = tempPlayer.hand.indexOf(c)
    if(tempPlayer.selectedCard.hasEffect && tempPlayer.loadingZone.length == 0){
        effectActivate(1)
    }
    else{
        if(tempPlayer.selectedCard.rank < board.topCardRank){
            alert("Card must be higher value than top of pile!")
            return
        }
        else{
            if(counter == 0){
                firstCardRank = tempPlayer.selectedCard.rank
                tempPlayer.addToLoadA()
                counter++
            }
            else{
                if(firstCardRank != c.rank){
                    alert("Invalid: multiple cards must be of the same value")
                }
                else{
                    tempPlayer.addToLoadA()
                }
            }
            cardDiv.innerHTML = ``
            passButton.innerHTML = `Cancel`
            unshiftButton.disabled = false
            tempPlayer.renderPlayerHand()
            addSelectCardEventListeners()
        }
    }
    
}

function addBackrowEventListeners(){
    let i = 0
    tempPlayer.faceUpFinal.forEach(c => {
        FUcardDiv = document.querySelector(`.play-card-slot-FU${i++}`)
        FUcardDiv.addEventListener('click', () => {
            backrowEvent(c)
        })
    })
}

function backrowEvent(c){  
    if(tempPlayer.finalPhase && !c.faceUP){
        c.flip() 
        tempPlayer.selectedBackrow = c.faceDownIndex
    }
    else{
        tempPlayer.selectedBackrow = c.faceUpIndex
    }

    tempPlayer.selectedCard = c //select temp card

    if(tempPlayer.selectedCard.hasEffect){
        effectActivate(2)
    }
    else if(tempPlayer.selectedCard.rank < board.topCardRank){
        alert("Card must be higher value than top of pile!")
        if(tempPlayer.finalPhase){
            let FDtempCard = tempPlayer.selectedCard
            tempPlayer.faceUpFinal.splice(tempPlayer.selectedBackrow, 1, tempPlayer.generateEmptyCard())
            tempPlayer.addToHand(FDtempCard)
            board.takePile(tempPlayer)
            tempPlayer.rerenderFaceUp()
            newTurn()
        }
        return
    }
    else{
        tempPlayer.addFromFaceUpA()
        board.addToPile(tempPlayer)
        tempPlayer.rerenderFaceUp()
        newTurn()
    }
}

main()