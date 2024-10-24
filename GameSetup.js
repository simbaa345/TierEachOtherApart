// GameSetup.js

export function GameSetup(startGame, joinGame) {
    const container = document.createElement('div');

    container.innerHTML = `
        <h2>Game Setup</h2>
        <label for="playerName">Enter your name:</label>
        <input type="text" id="playerName" placeholder="Your name" />
        
        <h3>Select Your Avatar:</h3>
        <div id="avatarSelection">
            <img src="images/jell.jpg" alt="Avatar 1" class="avatar" data-avatar="avatar1">
            <img src="images/kashi.jpg" alt="Avatar 2" class="avatar" data-avatar="avatar2">
            <img src="images/cazey.jpg" alt="Avatar 3" class="avatar" data-avatar="avatar3">
        </div>
        
        <button id="startButton">Start Game</button>
        <button id="joinButton">Join Game</button>
    `;

    const startButton = container.querySelector('#startButton');
    const joinButton = container.querySelector('#joinButton');
    const playerNameInput = container.querySelector('#playerName');
    const avatarSelection = container.querySelectorAll('.avatar');

    let selectedAvatar = '';

    // Avatar selection logic
    avatarSelection.forEach(avatar => {
        avatar.addEventListener('click', () => {
            avatarSelection.forEach(av => av.classList.remove('selected'));
            avatar.classList.add('selected');
            selectedAvatar = avatar.getAttribute('data-avatar'); // Store the selected avatar
        });
    });

    // Event listener for starting the game
    startButton.addEventListener('click', () => {
        const playerName = playerNameInput.value.trim();
        if (playerName && selectedAvatar) {
            startGame(playerName, selectedAvatar); // Call startGame with name and avatar
        } else {
            alert('Please enter a name and select an avatar.');
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

    return container; // Return the created container
}
