// GameSetup.js

import { startGame } from './Game.js'; // Import the startGame function

export function setupGame() {
    const app = document.getElementById('app');
    app.innerHTML = ''; // Clear previous content

    const welcomeMessage = document.createElement('h1');
    welcomeMessage.innerText = "Welcome to Tier Each Other Apart";
    welcomeMessage.style.color = "orange";
    welcomeMessage.style.textAlign = "center";
    app.appendChild(welcomeMessage);

    const nameInput = document.createElement('input');
    nameInput.placeholder = "Enter your name";
    nameInput.style.display = 'block';
    nameInput.style.margin = '20px auto';
    app.appendChild(nameInput);

    const joinButton = document.createElement('button');
    joinButton.innerText = "Join Game";
    joinButton.style.display = 'block';
    joinButton.style.margin = '10px auto';
    app.appendChild(joinButton);

    const hostButton = document.createElement('button');
    hostButton.innerText = "Host Game";
    hostButton.style.display = 'block';
    hostButton.style.margin = '10px auto';
    app.appendChild(hostButton);

    const avatarContainer = document.createElement('div');
    const avatars = ['avatar1.png', 'avatar2.png', 'avatar3.png']; // Add your avatar images here
    avatars.forEach(avatar => {
        const img = document.createElement('img');
        img.src = `images/${avatar}`;
        img.style.width = '50px'; // Smaller size
        img.style.height = '50px'; // Maintain aspect ratio
        img.style.borderRadius = '50%'; // Circular
        img.style.cursor = 'pointer';
        img.style.margin = '5px';
        img.addEventListener('click', () => selectAvatar(avatar));
        avatarContainer.appendChild(img);
    });

    app.appendChild(avatarContainer);

    let selectedAvatar = null;

    joinButton.addEventListener('click', () => {
        if (!nameInput.value || !selectedAvatar) {
            alert("Please enter a name and select an avatar!");
            return;
        }
        // Handle joining the game
        // Add your logic to join a game here
    });

    hostButton.addEventListener('click', () => {
        if (!nameInput.value || !selectedAvatar) {
            alert("Please enter a name and select an avatar!");
            return;
        }
        const lobbyCode = generateLobbyCode();
        const lobbyMessage = document.createElement('h2');
        lobbyMessage.innerText = `Lobby Code: ${lobbyCode}`;
        app.appendChild(lobbyMessage);

        // Logic for adding bots can be added here

        // Proceed to select teams and start the game
        startGame(); // Call the function to start the game countdown
    });

    function selectAvatar(avatar) {
        if (!selectedAvatar) {
            selectedAvatar = avatar; // Select avatar
            alert(`Avatar ${avatar} selected!`);
            // Disable further selections
            avatarContainer.querySelectorAll('img').forEach(img => {
                img.style.pointerEvents = 'none'; // Disable clicks
                img.style.opacity = '0.5'; // Visual indication
            });
        }
    }

    function generateLobbyCode() {
        return Math.random().toString(36).substring(2, 8).toUpperCase(); // Generate a simple lobby code
    }
}
