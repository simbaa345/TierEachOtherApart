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

    // Handle bot addition
    document.getElementById('addBots').onclick = () => {
        const numBots = parseInt(document.getElementById('numBots').value);
        if (numBots < 0 || numBots > MAX_BOTS) {
            alert('Please choose between 0 to 3 bots.');
            return;
        }
        addBots(numBots);
    };
}

function loadAvatars() {
    const avatarsDiv = document.getElementById('avatars');
    avatarsDiv.innerHTML = ''; // Clear previous avatars

    const avatars = ['avatar1.png', 'avatar2.png', 'avatar3.png', 'avatar4.png']; // Update with your avatar file names
    avatars.forEach((avatar, index) => {
        const img = document.createElement('img');
        img.src = `images/${avatar}`;
        img.className = 'avatar';
        img.alt = `Avatar ${index + 1}`;
        img.style.width = '50px';
        img.style.height = '50px';
        img.style.borderRadius = '50%';
        img.onclick = () => selectAvatar(index);

        avatarsDiv.appendChild(img);
    });
}

function selectAvatar(index) {
    const name = document.getElementById('playerName').value;
    if (!name) return alert('Please enter your name before selecting an avatar.');

    // Check if player already exists
    const existingPlayer = players.find(player => player.name === name);
    if (existingPlayer) {
        alert('You have already selected an avatar.');
        return;
    }

    // Add player with selected avatar
    players.push({ name, avatar: index });
    document.getElementById('avatars').innerHTML = ''; // Clear avatars after selection

    // Display selected avatar
    const selectedAvatar = document.createElement('div');
    selectedAvatar.innerHTML = `<img src="images/avatar${index + 1}.png" style="border-radius: 50%; width: 50px; height: 50px;"> ${name}`;
    document.getElementById('teamSelection').appendChild(selectedAvatar);

    // Enable the start game button if conditions are met
    const startGameButton = document.getElementById('startGame');
    startGameButton.disabled = players.length < 4; // Check if 4 or more players
}

// Add bots and display them in the team selection
function addBots(numBots) {
    const teamSelection = document.getElementById('teamSelection');
    for (let i = 1; i <= numBots; i++) {
        const botName = `Bot ${i}`;
        players.push({ name: botName, avatar: (i % 4) }); // Assign avatars in a cycle
        const botDiv = document.createElement('div');
        botDiv.innerHTML = `<img src="images/avatar${(i % 4) + 1}.png" class="avatar" style="border-radius: 50%; width: 50px; height: 50px;"> ${botName}`;
        teamSelection.appendChild(botDiv);
    }
    const startGameButton = document.getElementById('startGame');
    startGameButton.disabled = players.length < 4; // Enable if 4 or more players
}

// Generate a random lobby code
function generateLobbyCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase(); // Simple random lobby code
}

// Call setupGame on page load
document.addEventListener('DOMContentLoaded', setupGame);
