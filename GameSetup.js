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
        <div id="teamSelection"></div>
        <button id="startGame" disabled>Start Game</button>
    `;
    loadAvatars();

    // More logic for hosting the game...
}

function joinGame() {
    // Logic for joining the game
}

function generateLobbyCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase(); // Simple random code
}

function loadAvatars() {
    const avatars = ['avatar1.png', 'avatar2.png', 'avatar3.png']; // Example avatar filenames
    const avatarContainer = document.getElementById('avatars');

    avatars.forEach(avatar => {
        const img = document.createElement('img');
        img.src = `images/${avatar}`;
        img.className = 'avatar';
        img.onclick = () => selectAvatar(avatar);
        avatarContainer.appendChild(img);
    });
}

function selectAvatar(avatar) {
    // Handle avatar selection logic
}
