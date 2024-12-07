let board = ["", "", "", "", "", "", "", "", ""]; // Estado do tabuleiro
let currentPlayer = "X"; // Jogador atual
let gameActive = true; // Estado do jogo
let scoreWin = 0;
let scoreLoss = 0;
let scoreDraw = 0;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const statusDisplay = document.getElementById("resultado");
const scoreWinDisplay = document.getElementById("score-win");
const scoreLossDisplay = document.getElementById("score-loss");
const scoreDrawDisplay = document.getElementById("score-draw");
const restartButton = document.getElementById("button");

function updateStatus(message) {
    statusDisplay.innerText = message;
}

function checkWinner() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            updateStatus(`Jogador ${board[a]} venceu!`);
            gameActive = false;
            if (board[a] === "X") {
                scoreWin++;
                scoreWinDisplay.innerText = scoreWin;
            } else {
                scoreLoss++;
                scoreLossDisplay.innerText = scoreLoss;
            }
            return;
        }
    }
    if (!board.includes("")) {
        updateStatus("Empate!");
        scoreDraw++;
        scoreDrawDisplay.innerText = scoreDraw;
        gameActive = false;
    }
}

function makeMove(index) {
    if (board[index] === "" && gameActive) {
        board[index] = currentPlayer;
        document.getElementById(`casa${index + 1}`).innerText = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        if (gameActive) {
            updateStatus(`Agora é a vez do jogador ${currentPlayer}`);
        }
    }
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    updateStatus("JOGO DA VELHA");
    document.querySelectorAll(".casa").forEach(cell => (cell.innerText = ""));
}

// Adiciona os eventos de clique nas casas
document.querySelectorAll(".casa").forEach((cell, index) => {
    cell.addEventListener("click", () => makeMove(index));
});

// Reiniciar o jogo
restartButton.addEventListener("click", restartGame);