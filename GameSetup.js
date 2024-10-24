let players = [];
let lobbyCode = '';
const MAX_BOTS = 3;

function setupGame() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <h1 style="color: orange; text-align: center;">Welcome to Tier Each Other Apart</h1>
        <input type="text" id="playerName" placeholder="Enter your name" />
        <div>
            <button id="joinGame">Join Game</button>
            <button id="hostGame">Host Game</button>
        </div>
    `;

    document.getElementById('joinGame').onclick = joinGame;
    document.getElementById('hostGame').onclick = hostGame;
}

function joinGame() {
    const app = document.getElementById('app');
    const name = document.getElementById('playerName').value;

    if (!name) {
        alert('Please enter your name.');
        return;
    }

    app.innerHTML = `
        <h2 style="color: orange;">Please select your avatar:</h2>
        <div id="avatars"></div>
        <div id="teamSelection"></div>
        <button id="startGame" disabled>Start Game</button>
    `;
    loadAvatars();
}

function hostGame() {
    const app = document.getElementById('app');
    const name = document.getElementById('playerName').value;

    if (!name) {
        alert('Please enter your name.');
        return;
    }

    lobbyCode = generateLobbyCode();
    app.innerHTML = `
        <h2 style="color: orange;">Lobby Code: ${lobbyCode}</h2>
        <p>${name}, please select your avatar:</p>
        <div id="avatars"></div>
        <div id="botSelection">
            <label for="numBots">Add Bots (0-${MAX_BOTS}): </label>
            <input type="number" id="numBots" min="0" max="${MAX_BOTS}" value="0">
            <button id="addBots">Add Bots</button>
        </div>
        <div id="teamSelection"></div>
        <button id="startGame" disabled>Start Game</button>
    `;
    loadAvatars();

    document.getElementById('addBots').onclick = () => {
        const numBots = parseInt(document.getElementById('numBots').value);
        if (numBots < 0 || numBots > MAX_BOTS) {
            alert('Please choose between 0 to 3 bots.');
            return;
        }
        addBots(numBots);
    };

    document.getElementById('startGame').onclick = () => {
        if (players.length < 4) {
            alert('You need at least 4 players to start the game.');
            return;
        }
        startGame(players); // Call the function to start the game
    };
}

function addBots(numBots) {
    const app = document.getElementById('app');
    const teamSelection = document.getElementById('teamSelection');
    teamSelection.innerHTML = `<h3>Players:</h3>`;
    players = [document.getElementById('playerName').value]; // Include host

    for (let i = 1; i <= numBots; i++) {
        const botName = `Bot ${i}`;
        players.push(botName);
        const botDiv = document.createElement('div');
        botDiv.innerHTML = `<img src="images/bot_avatar${i}.png" class="avatar" alt="${botName}" style="border-radius: 50%; width: 50px; height: 50px;"> ${botName}`;
        teamSelection.appendChild(botDiv);
    }

    // Display all players including bots
    players.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.innerText = player;
        teamSelection.appendChild(playerDiv);
    });

    // Enable Start Game button if there are enough players
    const startGameButton = document.getElementById('startGame');
    startGameButton.disabled = players.length < 4; // Enable if 4 or more players
}

// Generate a random lobby code
function generateLobbyCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase(); // Simple random lobby code
}

// Call setupGame on page load
document.addEventListener('DOMContentLoaded', setupGame);
