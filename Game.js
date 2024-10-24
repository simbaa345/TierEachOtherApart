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

    // Add logic for selecting avatar and team selection
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
        <h2 style="color: orange;">Lobby Code: ${lobbyCode}</h2>
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

    // Event listener for Start Game button
    document.getElementById('startGame').onclick = () => {
        const players = getPlayers();
        if (players.length < 4) {
            alert('You need at least 4 players to start the game.');
            return;
        }
        startGame(players); // Pass players to start the game
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
        const botDiv = document.createElement('div');
        botDiv.innerHTML = `<img src="images/bot_avatar${i}.png" class="avatar" alt="${botName}" style="border-radius: 50%; width: 50px; height: 50px;"> ${botName}`;
        teamSelection.appendChild(botDiv);
    }

    // Show the player list for teams
    players.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.innerText = player;
        teamSelection.appendChild(playerDiv);
    });

    // Enable the Start Game button if there are enough players
    const startGameButton = document.getElementById('startGame');
    if (players.length >= 4) {
        startGameButton.disabled = false;
    }
}

function getPlayers() {
    const players = [document.getElementById('playerName').value]; // Include host
    const numBots = parseInt(document.getElementById('numBots').value);
    for (let i = 1; i <= numBots; i++) {
        players.push(`Bot ${i}`);
    }
    return players;
}

function loadAvatars() {
    const avatarsDiv = document.getElementById('avatars');
    const avatars = ['avatar1.png', 'avatar2.png', 'avatar3.png']; // Add more avatar names as needed
    avatars.forEach(avatar => {
        const img = document.createElement('img');
        img.src = `images/${avatar}`;
        img.className = 'avatar';
        img.style.borderRadius = '50%';
        img.style.width = '50px';
        img.style.height = '50px';
        img.onclick = () => {
            img.style.border = '2px solid orange'; // Highlight selected avatar
            // Disable other avatars
            avatarsDiv.querySelectorAll('img').forEach(otherImg => {
                if (otherImg !== img) {
                    otherImg.style.pointerEvents = 'none';
                }
            });
        };
        avatarsDiv.appendChild(img);
    });
}

function generateLobbyCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase(); // Simple random lobby code
}

// Call setupGame on page load
document.addEventListener('DOMContentLoaded', setupGame);
