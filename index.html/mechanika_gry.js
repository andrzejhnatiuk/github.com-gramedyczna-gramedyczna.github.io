const pairs = [
    { word: 'Buprenofrina', opposite: 'Nalokson' },
    { word: 'Beta-blokery', opposite: 'Glukagon' },
    { word: 'Cholinomimetyki', opposite: 'Atropina' },
    { word: 'Cyjanki', opposite: 'Hydroksykobalamina' },
    { word: 'Dabigatran', opposite: 'Idarucyzumab' },
    { word: 'Diazepam', opposite: 'Flumazenil' },
    { word: 'Glin', opposite: 'Deferoksamina' },
    { word: 'Heparyna', opposite: 'Siarczan protaminy' },
    { word: 'Insulina', opposite: 'Glukoza' },
    { word: 'Izoniazyd', opposite: 'Pirydoksyna' },
    { word: 'Etanol', opposite: 'Metanol' },
    { word: 'Nikotyna', opposite: 'Biperyden' },
    { word: 'Paracetamol', opposite: 'N-acetylocysteina' },
    { word: 'Żelazo', opposite: 'Deferoksamina' },
    { word: 'TLPD', opposite: 'Wodorowęglan Sodu' },
    { word: 'Warfaryna', opposite: 'Wit. K' },
  ];

  const gameBoard = document.getElementById('game-board');
  const scoreDisplay = document.getElementById('score');
  const mistakesDisplay = document.getElementById('mistakes');
  const restartButton = document.getElementById('restartButton');
  let firstCard = null;
  let secondCard = null;
  let score = 0;
  let mistakes = 0;

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function createCard(word) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = word;
    card.addEventListener('click', () => flipCard(card, word));
    gameBoard.appendChild(card);
    return card;
  }

  function flipCard(card, word) {
    if (!card.classList.contains('connected') && !card.classList.contains('incorrect')) {
      if (!firstCard) {
        firstCard = { element: card, word: word };
        card.classList.add('connected');
      } else if (!secondCard) {
        secondCard = { element: card, word: word };
        card.classList.add('connected');
        checkMatch();
      }
    }
  }

  function checkMatch() {
    if (firstCard && secondCard) {
      const pair1 = pairs.find(p => p.word === firstCard.word && p.opposite === secondCard.word);
      const pair2 = pairs.find(p => p.word === secondCard.word && p.opposite === firstCard.word);
      
      if (pair1 || pair2) {
        setTimeout(() => {
          firstCard.element.style.backgroundColor = '#6ed56d';
          secondCard.element.style.backgroundColor = '#6ed56d';
          score++;
          scoreDisplay.textContent = score;
          firstCard = null;
          secondCard = null;
          checkWin();
        }, 500);
      } else {
        setTimeout(() => {
          firstCard.element.classList.remove('connected');
          secondCard.element.classList.remove('connected');
          firstCard.element.classList.add('incorrect');
          secondCard.element.classList.add('incorrect');
          setTimeout(() => {
            firstCard.element.classList.remove('incorrect');
            secondCard.element.classList.remove('incorrect');
          }, 1000);
          firstCard = null;
          secondCard = null;
          mistakes++;
          mistakesDisplay.textContent = mistakes;
        }, 500);
      }
    }
  }

  function checkWin() {
    const allCards = document.querySelectorAll('.card');
    const allConnected = [...allCards].every(card => card.classList.contains('connected'));
    if (allConnected) {
      alert('Gratulacje! Wygrałeś czekoladke, teraz możesz iść do sklepu i sobie ją kupić.');
    }
  }

  function restartGame() {
    gameBoard.innerHTML = '';
    score = 0;
    mistakes = 0;
    scoreDisplay.textContent = score;
    mistakesDisplay.textContent = mistakes;
    initializeGame();
  }

  function initializeGame() {
    const shuffledPairs = shuffle(pairs);
    const uniquePairs = [...new Set(shuffledPairs)];
    const doubledPairs = uniquePairs.flatMap(pair => [pair, { word: pair.opposite, opposite: pair.word }]);
    const shuffledCards = shuffle(doubledPairs);
    shuffledCards.forEach(pair => {
      createCard(pair.word);
    });
  }

  initializeGame();

  restartButton.addEventListener('click', restartGame);