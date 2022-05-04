class Deck{
    constructor(){
        this.cards = [];
    }

    buildDeck(){
        let suits = ['clubs','hearts','diamonds','spades'];
        let values = ['2','3','4','5','6','7','8','9','10','jack','queen','king','ace'];
        for(let i = 0; i < 4; i++){
            for(let j = 0; j < 13; j++){
                let card = new Card(suits[i],values[j])
                card.rank = j + 2
                this.cards.push(card)
            }
        }
    }

    //Shuffle function based on the Fisher-Yates Shuffle function by Mike Bostok
    //https://bost.ocks.org/mike/shuffle/
    shuffleDeck(){
        let cur = this.getLength();
        let temp;
        let i;

        while(cur > 0){
            i = Math.floor(Math.random() * cur--)

            temp = this.cards[cur]
            this.cards[cur] = this.cards[i]
            this.cards[i] = temp
        }
    }

    getLength(){
        return this.cards.length
    }

    peek(){
        return this.cards[0]
    }

    draw(){
        return this.cards.shift()
    }

    display(){
        if(this.getLength() == 0){
            console.log("all cards dealt!")
        }
        else{
            for(let i = 0; i < this.getLength(); i++){
                console.log(i + 1 + " " + this.cards[i].display())       
            }
        }
    }

}

