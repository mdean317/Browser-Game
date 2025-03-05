const cards = [
    { number: '2', value: 2, suit: 'hearts' },
    { number: '3', value: 3, suit: 'hearts' },
    { number: '4', value: 4, suit: 'hearts' },
    { number: '5', value: 5, suit: 'hearts' },
    { number: '6', value: 6, suit: 'hearts' },
    { number: '7', value: 7, suit: 'hearts' },
    { number: '8', value: 8, suit: 'hearts' },
    { number: '9', value: 9, suit: 'hearts' },
    { number: '10', value: 10, suit: 'hearts' },
    { number: 'J', value: 10, suit: 'hearts' },
    { number: 'Q', value: 10, suit: 'hearts' },
    { number: 'K', value: 10, suit: 'hearts' },
    { number: 'A', value: 11, suit: 'hearts' },
    { number: '2', value: 2, suit: 'spades' },
    { number: '3', value: 3, suit: 'spades' },
    { number: '4', value: 4, suit: 'spades' },
    { number: '5', value: 5, suit: 'spades' },
    { number: '6', value: 6, suit: 'spades' },
    { number: '7', value: 7, suit: 'spades' },
    { number: '8', value: 8, suit: 'spades' },
    { number: '9', value: 9, suit: 'spades' },
    { number: '10', value: 10, suit: 'spades' },
    { number: 'J', value: 10, suit: 'spades' },
    { number: 'Q', value: 10, suit: 'spades' },
    { number: 'K', value: 10, suit: 'spades' },
    { number: 'A', value: 11, suit: 'spades' },
    { number: '2', value: 2, suit: 'diamonds' },
    { number: '3', value: 3, suit: 'diamonds' },
    { number: '4', value: 4, suit: 'diamonds' },
    { number: '5', value: 5, suit: 'diamonds' },
    { number: '6', value: 6, suit: 'diamonds' },
    { number: '7', value: 7, suit: 'diamonds' },
    { number: '8', value: 8, suit: 'diamonds' },
    { number: '9', value: 9, suit: 'diamonds' },
    { number: '10', value: 10, suit: 'diamonds' },
    { number: 'J', value: 10, suit: 'diamonds' },
    { number: 'Q', value: 10, suit: 'diamonds' },
    { number: 'K', value: 10, suit: 'diamonds' },
    { number: 'A', value: 11, suit: 'diamonds' },
    { number: '2', value: 2, suit: 'clubs' },
    { number: '3', value: 3, suit: 'clubs' },
    { number: '4', value: 4, suit: 'clubs' },
    { number: '5', value: 5, suit: 'clubs' },
    { number: '6', value: 6, suit: 'clubs' },
    { number: '7', value: 7, suit: 'clubs' },
    { number: '8', value: 8, suit: 'clubs' },
    { number: '9', value: 9, suit: 'clubs' },
    { number: '10', value: 10, suit: 'clubs' },
    { number: 'J', value: 10, suit: 'clubs' },
    { number: 'Q', value: 10, suit: 'clubs' },
    { number: 'K', value: 10, suit: 'clubs' },
    { number: 'A', value: 11, suit: 'clubs' },
];

/*-------------------------------- Constants --------------------------------*/
const dealerHitsOn = 16;
const staticDeck = cards;
let playingDeck = [];
playingDeck = staticDeck;
playingDeck = [...staticDeck];

/*-------------------------------- Variables --------------------------------*/
let dealerCount = 0; 
let userCount = 0;
let userCardOne; 
let userCardTwo; 
let dealerCardOne; 
let dealerCardTwo; 
let isGameOver = true;
let userAcesCounter = 0;
let dealerAcesCounter = 0;
let betAmount = 0;
let chipStack = 0;

/*------------------------ Cached Element References ------------------------*/
const dealButton = document.querySelector('#deal');
const hitButton = document.querySelector('#hit');
const stayButton = document.querySelector('#stay');
const dealerCardOneDisplay = document.querySelector('#dealer-cards-1');
const dealerCardImage = dealerCardOneDisplay.children[0];
const dealerCardTwoDisplay = document.querySelector('#dealer-cards-2');
const userCardOneDisplay = document.querySelector('#user-cards-1');
const userCardTwoDisplay = document.querySelector('#user-cards-2');
const userCards = document.querySelector('#user-cards');
const dealerCards = document.querySelector('#dealer-cards');
const resultInput = document.querySelector('.game-result')

/*----------------------------- Event Listeners -----------------------------*/
dealButton.addEventListener('click', (event) => {
    let userHasBlackjack = false; 
    let dealerHasBlackjack = false;
    if (isGameOver) {
        resetTable();

        userCardOne = getCard();
        userCardOneDisplay.innerHTML = (userCardOne.number + ' of ' + userCardOne.suit);
        if (userCardOne.number === 'A') {
            userAcesCounter = userAcesCounter + 1;
        }

        dealerCardOne = getCard();
        dealerCardOneDisplay.innerHTML = (dealerCardOne.number + ' of ' + dealerCardOne.suit);
        if (dealerCardOne.number === 'A') {
            dealerAcesCounter = dealerAcesCounter + 1;
        }

        userCardTwo = getCard();
        userCardTwoDisplay.innerHTML = (userCardTwo.number + ' of ' + userCardTwo.suit);
        if (userCardTwo.number === 'A') {
            userAcesCounter = userAcesCounter + 1;
            if (userCardOne.value === 10) {
                userHasBlackjack = true;
            }
        }
        else if ((userCardTwo.value === 10) && (userCardOne.number === 'A')) {
            userHasBlackjack = true;
        }

        dealerCardTwo = getCard();
        dealerCardTwoDisplay.innerHTML = (' ? ');
        if (dealerCardTwo.number === 'A') {
            dealerAcesCounter = dealerAcesCounter + 1;
            if (dealerCardOne.value === 10) {
                dealerHasBlackjack = true;
            }
        }
        else if ((dealerCardTwo.value === 10) && (dealerCardOne.number === 'A')) {
            dealerHasBlackjack = true;
        }

        if (dealerHasBlackjack) {
            isGameOver = true;
            dealerCardTwoDisplay.innerHTML = (dealerCardTwo.number + ' of ' + dealerCardTwo.suit);
            if (userHasBlackjack) {
                resultInput.innerHTML = "It's a blackjack push! You Tie."
            }
            else {
                resultInput.innerHTML = "Dealer has blackjack! You lose."
            }
        }
        else if (userHasBlackjack) {
            resultInput.innerHTML = "You have blackjack! You Win."
            isGameOver = true;
        }
        else {
            dealerCount = dealerCardOne.value + dealerCardTwo.value;

            if (dealerAcesCounter === 2) {
            dealerCount = dealerCount - 10;
            dealerAcesCounter = dealerAcesCounter - 1; 
            }

            userCount = userCardOne.value + userCardTwo.value;
            
            if (userAcesCounter === 2) {
                userCount = userCount - 10;
                userAcesCounter = userAcesCounter - 1; 
            }
            console.log(userCount);

            isGameOver = false;
        }      
    }
})

hitButton.addEventListener('click', (event) => {
    // This log is for testing purposes to verify we're getting the correct value
    // You have to click a button to see this log
    if ((userCount < 21) && (!isGameOver)) {
        let nextCard = getCard();
        if (nextCard.number === 'A') {
            userAcesCounter = userAcesCounter + 1;
        }

        const node = document.createElement("div");
        node.classList.add("extra-card");
        node.classList.add("card");
        node.innerHTML = (nextCard.number + ' of ' + nextCard.suit);
        userCards.appendChild(node);
        userCount = userCount + nextCard.value;
        if ((userAcesCounter > 0) && (userCount > 21)){
            userCount = userCount - 10;
            userAcesCounter = userAcesCounter - 1; 
        }
        
        if (userCount === 21) {
            stayfunction();
        }
        else if (userCount > 21) {
            resultInput.innerHTML = "You busted, sorry";
            isGameOver = true;
        }
    }
})

stayButton.addEventListener('click', (event) => {
    // This log is for testing purposes to verify we're getting the correct value
    // You have to click a button to see this log
    if (!isGameOver) {
        stayfunction();
    }
})
/*
    // Check if there's an ace. 
    dealerCount = dealerCardOne.value + dealerCardTwo.value;
    console.log(dealerCount);
    userCount = userCardOne.value + userCardTwo.value;
    console.log(userCount);*/


/*-------------------------------- Functions --------------------------------*/
const getCard = () => {

    let cardNumber = Math.floor(Math.random() * playingDeck.length-1);
    let newCard = playingDeck[cardNumber];

    playingDeck.splice(cardNumber, 1);
    console.log("static deck cards: " + staticDeck.length);

    return newCard;
}

const stayfunction = () => {
    dealerCardTwoDisplay.innerHTML = (dealerCardTwo.number + ' of ' + dealerCardTwo.suit);
    while (dealerCount <= dealerHitsOn) {
        let nextCard = getCard();
        if (nextCard.number === 'A') {
            dealerAcesCounter = dealerAcesCounter + 1;
        }

        const node = document.createElement("div");
        node.classList.add("extra-card");
        node.classList.add("card");
        node.innerHTML = (nextCard.number + ' of ' + nextCard.suit);
        dealerCards.appendChild(node);

        dealerCount = dealerCount + nextCard.value;
        if ((dealerAcesCounter > 0) && (dealerCount > 21)){
            dealerCount = dealerCount - 10;
            dealerAcesCounter = dealerAcesCounter - 1; 
        }
    }

    if (dealerCount === userCount) {
        resultInput.innerHTML = "It's a tie";
    }
    else if (dealerCount > 21) {
        resultInput.innerHTML = "Dealer busts, you win";
    }
    else if (dealerCount > userCount) {
        resultInput.innerHTML = "Dealer wins, you lose";
    }
    else if (dealerCount < userCount) {
        resultInput.innerHTML = "Dealer loses, you win!";
    }
    isGameOver = true;
}

const resetTable = () => {
    playingDeck = [...staticDeck];
    let cardsToRemove = document.querySelectorAll(".extra-card");
    cardsToRemove.forEach((cardElement) => {console.log(cardElement.innerHTML); cardElement.remove();});
    //userCardOneDisplay.setAttribute(img)
    //yInput.setAttribute("type", "button");
    userCardOneDisplay.innerHTML = (' - ');
    dealerCardOneDisplay.innerHTML = (' - ');
    userCardTwoDisplay.innerHTML = (' - ');
    dealerCardTwoDisplay.innerHTML = (' - ');
    isGameOver = false;
    resultInput.innerHTML = "";
    userAcesCounter = 0;
    dealerAcesCounter = 0;
}