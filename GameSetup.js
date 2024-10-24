import { categories } from './Categories.js';

export function setupGame() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <h1>Welcome to Tier Each Other Apart</h1>
        <input type="text" id="playerName" placeholder="Enter your name" />
        <button id="hostGame">Host Game</button>
        <button id="joinGame">Join Game</button>
        <div id="lobby" style="display:none;"></div>
    `;

    document.getElementById('hostGame').onclick = hostGame;
    document.getElementById('joinGame').onclick = joinGame;
}

function hostGame() {
    const app = document.getElementById('app');
    const name = document.getElementById('playerName').value;

    if (!name) {
        alert('Please enter your name.');
        return;
    }

    const lobbyCode = generateLobbyCode();
    app.innerHTML = `
        <h2>Lobby Code: ${lobbyCode}</h2>
        <p>${name}, please select your avatar:</p>
        <div id="avatars"></div>
        <div id="botSelection">
            <label for="numBots">Add Bots (0-3): </label>
            <input type="number" id="numBots" min="0" max="3" value="0">
            <button id="addBots">Add Bots</button>
        </div>
        <div id="teamSelection"></div>
        <button id="startGame" disabled>Start Game</button>
    `;
    loadAvatars();

    document.getElementById('addBots').onclick = () => {
        const numBots = parseInt(document.getElementById('numBots').value);
        if (numBots < 0 || numBots > 3) {
            alert('Please choose between 0 to 3 bots.');
            return;
        }
        addBots(numBots);
    };
}

function addBots(numBots) {
    const app = document.getElementById('app');
    const teamSelection = document.getElementById('teamSelection');
    teamSelection.innerHTML = `<h3>Players:</h3>`;
    const players = [document.getElementById('playerName').value]; // Add host

    // Add bots
    for (let i = 1; i <= numBots; i++) {
        const botName = `Bot ${i}`;
        players.push(botName);
        const botAvatar = `bot_avatar${i}.png`; // Adjust the bot avatar names
        const botDiv = document.createElement('div');
        botDiv.innerHTML = `<img src="images/${botAvatar}" class="avatar" alt="${botName}"> ${botName}`;
        teamSelection.appendChild(botDiv);
    }

    // Show the player list for teams
    players.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.innerText = player;
        teamSelection.appendChild(playerDiv);
    });

    // Logic for enabling the Start Game button
    const startGameButton = document.getElementById('startGame');
    if (players.length >= 4) {
        startGameButton.disabled = false;
    }
}

