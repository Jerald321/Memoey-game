document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const restartButton = document.getElementById('restart');
    const cards = [
        '🍏', '🍏', '🍌', '🍌', '🥑', '🥑', '🍇', '🍇', 
        '🥚', '🥚', '🍋', '🍋', '🍍', '🍍', '🥕 ', '🥕 '
    ];

    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;

    function createCardElement(symbol) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;

        const front = document.createElement('div');
        front.classList.add('front');
        const back = document.createElement('div');
        back.classList.add('back');
        back.textContent = symbol;
        card.appendChild(back);
        card.appendChild(front);

        card.addEventListener('click', flipCard);

        return card;
    }

    function initializeBoard() {
        board.innerHTML = '';
        const shuffledCards = shuffle(cards);
        shuffledCards.forEach(symbol => {
            const card = createCardElement(symbol);
            board.appendChild(card);
        });
    }

    function flipCard() {
        if (lockBoard || this === firstCard) return;

        this.classList.add('flipped');

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
            disableCards();
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    restartButton.addEventListener('click', initializeBoard);

    initializeBoard();
});
