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
        <button id="confirmAvatar">Confirm Avatar</button>
        <div id="teamSelection"></div>
        <button id="startGame" disabled>Start Game</button>
    `;
    loadAvatars();

    document.getElementById('confirmAvatar').onclick = () => confirmAvatar(name);
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
        <button id="confirmAvatar">Confirm Avatar</button>
        <div id="botSelection">
            <label for="numBots">Add Bots (0-${MAX_BOTS}): </label>
            <input type="number" id="numBots" min="0" max="${MAX_BOTS}" value="0">
            <button id="addBots" disabled>Add Bots</button>
        </div>
        <div id="teamSelection"></div>
        <button id="startGame" disabled>Start Game</button>
    `;
    loadAvatars();

    document.getElementById('confirmAvatar').onclick = () => confirmAvatar(name);
    document.getElementById('addBots').onclick = addBots; // Ensure this is hooked up
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

let selectedAvatarIndex = null;

function selectAvatar(index) {
    selectedAvatarIndex = index; // Store the selected avatar index
    alert(`You have selected Avatar ${index + 1}`);
}

function confirmAvatar(name) {
    if (selectedAvatarIndex === null) {
        alert('Please select an avatar before proceeding.');
        return;
    }

    // Check if player already exists
    const existingPlayer = players.find(player => player.name === name);
    if (existingPlayer) {
        alert('You have already selected an avatar.');
        return;
    }

    // Add player with selected avatar
    players.push({ name, avatar: selectedAvatarIndex });
    document.getElementById('avatars').innerHTML = ''; // Clear avatars after selection

    // Display selected avatar
    const selectedAvatar = document.createElement('div');
    selectedAvatar.innerHTML = `<img src="images/avatar${selectedAvatarIndex + 1}.png" style="border-radius: 50%; width: 50px; height: 50px;"> ${name}`;
    document.getElementById('teamSelection').appendChild(selectedAvatar);

    // Enable the Add Bots button
    document.getElementById('addBots').disabled = false;

    // Check if enough players are present for starting the game
    const startGameButton = document.getElementById('startGame');
    startGameButton.disabled = players.length < 4; // Check if 4 or more players
}

// Add bots and display them in the team selection
function addBots() {
    const numBots = parseInt(document.getElementById('numBots').value);
    const teamSelection = document.getElementById('teamSelection');
    const availableAvatars = [0, 1, 2, 3].filter(index => !players.some(player => player.avatar === index));

    for (let i = 0; i < numBots; i++) {
        if (i >= availableAvatars.length) {
            alert('Not enough available avatars for the bots.');
            break; // Exit if no more avatars are available
        }
        const botName = `Bot ${players.length + 1}`; // Unique name for bots
        const avatarIndex = availableAvatars[i]; // Assign available avatars
        players.push({ name: botName, avatar: avatarIndex }); // Assign avatar from available list
        const botDiv = document.createElement('div');
        botDiv.innerHTML = `<img src="images/avatar${avatarIndex + 1}.png" class="avatar" style="border-radius: 50%; width: 50px; height: 50px;"> ${botName}`;
        teamSelection.appendChild(botDiv);
    }

    // Check if we can start the game now that bots are added
    const startGameButton = document.getElementById('startGame');
    startGameButton.disabled = players.length < 4; // Enable if 4 or more players
}

// Generate a random lobby code
function generateLobbyCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase(); // Simple random lobby code
}

// Call setupGame on page load
document.addEventListener('DOMContentLoaded', setupGame);
