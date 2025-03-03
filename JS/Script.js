const clear = document.getElementById('clear');
const showModal = document.getElementById('show');
const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const counter = document.getElementById('current');
const addNewModal = document.getElementById('add-container');
const hideModal = document.getElementById('hide');
const questionD = document.getElementById('question');
const answerD = document.getElementById('answer');
const addCard = document.getElementById('add-card');



// keep track of active cards
let currentActiveCard = 0;

// store DOM cards = 
const cards = [];

// store card data 
const cardsData = getCardsData();

// const cardsData = [
//     {
//         question: "What Is JavaScript",
//         answer: "A Programming Language That works On Clint-Side and Server-Side"
//     },
//     {
//         question: "What Must a variable begin with?",
//         answer: "A Letter, $ or _"
//     },
//     {
//         question: "What Is a variable",
//         answer: "A container for a piece of data"
//     },
//     {
//         question: "what is the Pointer",
//         answer: "A variable that pointes to the position of data"
//     }
// ];


// Create Card 


function creatCards() {
    cardsData.forEach((data, index) => {
        creatCard(data, index)
    });
}

function creatCard(data, index) {
    let cardContainer = document.createElement("div");
    cardContainer.classList.add("card");
    if (index === 0) {
        cardContainer.classList.add('active')
    }

    cardContainer.innerHTML = `
        <div class="inner-card">
                <div class="inner-card-front">
                    <p>
                        ${data.question}
                    </p>
                </div>
                <div class="inner-card-back">
                    <p>
                        ${data.answer}
                    </p>
                </div>
        </div>
    `;

    cardContainer.addEventListener('click', () =>
        cardContainer.classList.toggle('show-answer')
    );

    cards.push(cardContainer);
    cardsContainer.appendChild(cardContainer);

    updateCurrentText();
}

function updateCurrentText() {
    counter.innerText = `${currentActiveCard + 1} / ${cardsData.length}`;
}


function updatePrevCard() {
    // const pos = ((currentActiveCard - 1) + cardsData.length) % cardsData.length;
    cards[currentActiveCard].className = 'card right';
    currentActiveCard -= 1;
    if (currentActiveCard < 0) {
        alert('You have reached to the end of cars');
        currentActiveCard = 0
    }

    cards[currentActiveCard].className = 'card active';
    // cards[currentActiveCard].classList.remove('active');
    // cards[pos].classList.add('active');
    // currentActiveCard = pos;
    updateCurrentText();
}

function updateNextCard() {
    // const pos = ((currentActiveCard + 1) + cardsData.length) % cardsData.length;
    cards[currentActiveCard].className = 'card left';
    currentActiveCard += 1;
    if (currentActiveCard > cardsData.length - 1) {
        alert('You have reached to the end of cars');
        currentActiveCard = cardsData.length - 1;
    }

    cards[currentActiveCard].className = 'card active';
    // cards[currentActiveCard].classList.remove('active');
    // cards[pos].classList.add('active');
    updateCurrentText();
}


function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

function setCardsDat(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
    window.location.reload();

}


showModal.addEventListener('click', _ =>
    addNewModal.classList.add('show')
);

hideModal.addEventListener('click', _ =>
    addNewModal.classList.remove('show')
);

addCard.addEventListener('click', _ => {
    const question = questionD.value;
    const answer = answerD.value;

    if (question.trim(), answer.trim()) {
        const newCard = { question, answer };

        creatCard(newCard);
        question.value = '';
        answer.value = '';

        addNewModal.classList.remove('show');
        cardsData.push(newCard);
        setCardsDat(cardsData);
    }
})

creatCards();
prevBtn.addEventListener('click', updatePrevCard);
nextBtn.addEventListener('click', updateNextCard);

clear.addEventListener('click', _ => {
    localStorage.clear();
    cardsContainer.innerHTML = '';
    window.location.reload();
});














