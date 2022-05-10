


let deck = new Deck();
deck.buildDeck()
deck.addEffects()
//deck.shuffleDeck()

let player1 = new Player("kagami")
let player2 = new Player("shinobu")

player1.deckColor = "green"

player2.deckColor = "blue"

let board = new Board(deck, player1, player2)
board.deal()
let tempPlayer = null
let tempOpponent = null
let counter = 0
let firstCardRank = null

// let testCard = new Card('spades', 'A')
// testCard.rank = 14
// board.pile.push(testCard)
// board.topCardRank = testCard.rank

function main(){
    board.render()
    counter = 0
    firstCardRank = null

    if(board.turn % 2 == 0){
        tempPlayer = player1
        tempOpponent = player2
    }
    else{
        tempPlayer = player2
        tempOpponent = player1  
    }

    //tempPlayer.displayFaceUp()
    tempPlayer.drawTillThree()
    tempPlayer.renderPlayer()
    tempOpponent.renderOpponent()

    board.turn++
    
}

const startButton = document.querySelector('.start-button')
const passButton = document.querySelector('.pass-button')
const unshiftButton = document.querySelector('.unshift-button')


function resetPanel(){
    startButton.disabled = false
    passButton.disabled = false
    unshiftButton.disabled = true 
    passButton.innerHTML = `Pass` 
    board.selectPhase = false
    board.mainPhase = true
}

function newTurn(){
    tempPlayer.renderLoadingZone()
    tempPlayer.renderPlayerHand()
    board.render()
    resetPanel()
    main()
}

passButton.addEventListener('click', () => {
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
})

startButton.addEventListener('click', startEvent)

function startEvent() {
    switchPhase()    
    addSelectCardEventListeners()
    if(tempPlayer.loadingZone.length != 0){
        unshiftButton.disabled = false
    }

    if(tempPlayer.isHandEmpty() && !tempPlayer.isFaceUpEmpty()){
        //console.log("made it here")
        addFUCardEventListeners()
    }
    else if(tempPlayer.isHandEmpty() && tempPlayer.isFaceUpEmpty()){
       // addFDCardEventListeners()
    }

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
}

let cardDiv = null
let FUcardDiv = null
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
    //check if selected card has an effect
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

function addFUCardEventListeners(){
    let i = 0
    tempPlayer.faceUpFinal.forEach(c => {
        FUcardDiv = document.querySelector(`.play-card-slot-FU${i++}`)
        FUcardDiv.addEventListener('click', () => {
            cardEventFU(c)
        })
    })
}

function cardEventFU(c){
    console.log("start of cardEventFU")

    tempPlayer.selectedCard = c //select temp card
    tempPlayer.selectedIndexFU = c.faceUpIndex

    console.log(tempPlayer.selectedCard.display())
    console.log("selectedIndexFU: " + tempPlayer.selectedIndexFU)

    if(tempPlayer.selectedCard.hasEffect){
        effectActivate(2)
        console.log("effect card activated successfully")
    }
    else if(tempPlayer.selectedCard.rank < board.topCardRank){
        alert("Card must be higher value than top of pile!")
        return
    }
    else{
        tempPlayer.addFromFaceUpA()
        board.addToPile(tempPlayer)
        console.log("normal card played successfully")
        tempPlayer.rerenderFaceUp()
        newTurn()
        console.log("new turn")
    }
    console.log("end of cardEventFU")
    

}

function addFDCardEventListeners(){
    let i = 0
    tempPlayer.faceDownFinal.forEach(c => {
        cardDiv = null
        cardDiv = document.querySelector(`.play-card-slot-FD${i++}`)
        cardDiv.addEventListener('click', () => {
            cardEventFD(c)
        })
    })
}

function cardEventFD(c){
    tempPlayer.selectedCard = c
    tempPlayer.selectedIndexFD = tempPlayer.faceDownFinal.indexOf(c)
    if(tempPlayer.selectedCard.hasEffect && tempPlayer.loadingZone.length == 0){
        effectActivate(3)
    }
    else if(tempPlayer.selectedCard.rank < board.topCardRank){
        alert("Card must be higher value than top of pile!")
        return
    }
    else {
        tempPlayer.addFromFaceDownA()
        board.addToPile(tempPlayer)
    }

}

unshiftButton.addEventListener('click', unshiftEvent)

function unshiftEvent(){
    board.addToPile(tempPlayer)
    newTurn()
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
            tempPlayer.faceUpFinal.splice(tempPlayer.selectedIndexFU, 1, tempPlayer.generateEmptyCard())
        }
        else if(tempPlayer.selectedCard.rank == 7){
            tempPlayer.addFromFaceUpA()
            board.addToPile(tempPlayer)
        }
        else if(tempPlayer.selectedCard.rank == 10){
            board.clearPile()
            tempPlayer.faceUpFinal.splice(tempPlayer.selectedIndexFU, 1, tempPlayer.generateEmptyCard())
        }
        tempPlayer.rerenderFaceUp()
        
    }
    else if(selector == 3){
        if(tempPlayer.selectedCard.rank == 3){
            board.turn++
            tempPlayer.hand.splice(tempPlayer.selectedIndexFD, 1, tempPlayer.generateEmptyCard())
        }
        else if(tempPlayer.selectedCard.rank == 7){
            tempPlayer.addFromFaceDownA()
            board.addToPile(tempPlayer)
        }
        else if(tempPlayer.selectedCard.rank == 10){
            board.clearPile()
            tempPlayer.faceDownFinal.splice(tempPlayer.selectedIndexFD, 1, tempPlayer.generateEmptyCard())
        }
    }
    newTurn()
}



main()