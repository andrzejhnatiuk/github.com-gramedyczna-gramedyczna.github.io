const target = document.getElementById('target');
const scoreValue = document.getElementById('score-value');

let score = 0;

target.addEventListener('click', () => {
    score++;
    scoreValue.textContent = score;
    moveTarget();
});

function moveTarget() {
    const x = Math.floor(Math.random() * (document.getElementById('game-container').clientWidth - 50));
    const y = Math.floor(Math.random() * (document.getElementById('game-container').clientHeight - 50));

    target.style.left = `${x}px`;
    target.style.top = `${y}px`;
}