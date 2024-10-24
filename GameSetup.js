// GameSetup.js

// This function creates the game setup UI and handles starting the game
export function GameSetup(startGame) {
    const container = document.createElement('div');

    container.innerHTML = `
        <h2>Game Setup</h2>
        <label for="playerName">Enter your name:</label>
        <input type="text" id="playerName" placeholder="Your name" />
        <button id="startButton">Start Game</button>
    `;

    const startButton = container.querySelector('#startButton');
    const playerNameInput = container.querySelector('#playerName');

    // Event listener for starting the game
    startButton.addEventListener('click', () => {
        const playerName = playerNameInput.value.trim();
        if (playerName) {
            startGame(playerName); // Call the startGame function with the player's name
        } else {
            alert('Please enter a name.');
        }
    });

    return container; // Return the created container
}
