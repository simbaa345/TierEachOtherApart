// GameSetup.js

export function GameSetup(startGame, joinGame) {
    const container = document.createElement('div');

    container.innerHTML = `
        <h2>Game Setup</h2>
        <label for="playerName">Enter your name:</label>
        <input type="text" id="playerName" placeholder="Your name" />
        <button id="startButton">Start Game</button>
        <button id="joinButton">Join Game</button>
    `;

    const startButton = container.querySelector('#startButton');
    const joinButton = container.querySelector('#joinButton');
    const playerNameInput = container.querySelector('#playerName');

    // Step 1: Show avatar selection after starting the game
    startButton.addEventListener('click', () => {
        const playerName = playerNameInput.value.trim();
        if (playerName) {
            showAvatarSelection(playerName); // Move to avatar selection
        } else {
            alert('Please enter a name.');
        }
    });

    // Event listener for joining a game
    joinButton.addEventListener('click', () => {
        const playerName = playerNameInput.value.trim();
        if (playerName) {
            joinGame(playerName); // Call joinGame with player name
        } else {
            alert('Please enter your name to join a game.');
        }
    });

    container.appendChild(container); // Add the setup container
    document.body.appendChild(container); // Append to the document

    // Function to show avatar selection
    function showAvatarSelection(playerName) {
        container.innerHTML = `<h3>Please select your avatar, ${playerName}:</h3>`;
        
        const avatarSelection = document.createElement('div');
        avatarSelection.id = 'avatarSelection';

        // Add avatar images
        const avatars = ['avatar1', 'avatar2', 'avatar3']; // Add more avatars as needed
        avatars.forEach(avatar => {
            const img = document.createElement('img');
            img.src = `images/${avatar}.png`; // Adjust image path as needed
            img.alt = avatar;
            img.className = 'avatar';
            img.setAttribute('data-avatar', avatar);

            // Avatar selection logic
            img.addEventListener('click', () => {
                selectAvatar(avatar, playerName);
            });

            avatarSelection.appendChild(img);
        });

        container.appendChild(avatarSelection);
    }

    // Function to handle avatar selection
    function selectAvatar(selectedAvatar, playerName) {
        const app = document.getElementById('app');
        app.innerHTML = ''; // Clear the current content

        // Display welcome message with avatar
        const welcomeMessage = document.createElement('h2');
        welcomeMessage.innerText = `Welcome, ${playerName}! You have selected ${selectedAvatar}.`;
        app.appendChild(welcomeMessage);

        const avatarImage = document.createElement('img');
        avatarImage.src = `images/${selectedAvatar}.png`; // Display selected avatar
        avatarImage.alt = `${playerName}'s Avatar`;
        app.appendChild(avatarImage);

        setupGame(); // Call your setup game logic
    }

    return container; // Return the created container
}
