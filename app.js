


let deck = new Deck();
deck.buildDeck()
deck.addEffects()
deck.shuffleDeck()

let player1 = new Player("kagami")
let player2 = new Player("p2")
let board = new Board(deck, player1, player2)
board.deal()
let tempPlayer = null
let tempOpponent = null

async function main(){
    board.render()

    if(board.turn % 2 == 0){
        tempPlayer = player1
        tempOpponent = player2
    }
    else{
        tempPlayer = player2
        tempOpponent = player1  
    }
    tempPlayer.renderPlayer()
    tempOpponent.renderOpponent()
    tempPlayer.drawTillThree()

    board.turn++
}

const nextTurn = document.querySelector('.next-turn-button')
const switchButton = document.querySelector('.switch-button')
const passButton = document.querySelector('.pass-button')
const unshiftButton = document.querySelector('.unshift-button')

nextTurn.addEventListener('click', () => {
    // let tempPlayer = null
    // if(board.turn + 1 % 2 == 0){
    //     tempPlayer = player1
    // }
    // else{
    //     tempPlayer = player2
    // }
    //board.turn++
    console.log('turn: ' + board.turn)
    
    // player1.flipHand()
    // player2.flipHand()
    
    switchButton.disabled = false
    switchButton.innerHTML = `Play`
    passButton.disabled = false
    //switchButtonChange()
    main()
})

// passButton.addEventListener('click', () => {
//     //let tempPlayer = null
//     if(board.turn + 1 % 2 == 0){
//         tempPlayer = player1
//     }
//     else{
//         tempPlayer = player2
//     }
//     board.takePile(tempPlayer)
//     console.log(tempPlayer.displayHand())
//     tempPlayer.renderPlayerHand()
//     // player1.flipHand()
//     // player2.flipHand()
//     main()
//     board.render()
//     board.turn++
// })

switchButton.addEventListener('click', switchEvent)

function switchEvent() {
    if(board.mainPhase){
        switchPhase()
        addSelectCardEventListeners()
        
        if(tempPlayer.loadingZone.length != 0){
        
            unshiftButton.disabled = false
        //     unshiftButton.addEventListener('click', () =>{
        //         this.addToPile(tp)
        //         this.render()
        //         this.p1.renderPlayerHand()
        //         this.selectPhase = false
        //         this.mainPhase = true
        //         switchButton.innerHTML = `Play`
        //     })
        }
    }
    else{
        switchPhase()
        unshiftButton.disabled = true
    }
    console.log("mainPhase: "+ board.mainPhase)
    console.log("select: "+ board.selectPhase)
}

function switchPhase(){    
    if(board.mainPhase){
        board.selectPhase = true
        board.mainPhase = false
        switchButton.innerHTML = `Back`
    }
    else{
        board.selectPhase = false
        board.mainPhase = true
        switchButton.innerHTML = `Play`
    }
}
 

function addSelectCardEventListeners(){
    let i = 0
    tempPlayer.hand.forEach(c => {
        const cardDiv = document.querySelector(`.hand-card-slot-${i++}`)           
        
        cardDiv.addEventListener('click', () => { //when card has been clicked on
            tempPlayer.selectedCard = c;
            tempPlayer.selectedIndexHand = tempPlayer.hand.indexOf(c)
            console.log(tempPlayer.selectedCard.display() + " " + tempPlayer.selectedIndexHand)
            
            if(board.selectPhase){
                tempPlayer.addToLoadA()
                cardDiv.innerHTML = ``
                
                //const unshiftButton = document.querySelector('.unshift-button')
                unshiftButton.disabled = false
                
                // unshiftButton.addEventListener('click', () =>{
                //     board.addToPile(tempPlayer)
                //     board.render()
                //     tempPlayer.renderPlayerHand()
                //     board.selectPhase = false
                //     board.mainPhase = true
                //     const switchButton = document.querySelector('.switch-button')
                //     const passButton = document.querySelector('.pass-button')
                //     switchButton.disabled = true
                //     passButton.disabled = true
                //     const turnButton = document.querySelector('.next-turn-button')
                //     turnButton.disabled = false
                // })
            }
        })
    })
}

main()