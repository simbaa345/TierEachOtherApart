import { GameSetup } from './GameSetup.js';
import { GameLobby } from './GameLobby.js';
import { categories } from './categories.js'; // Import your categories

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    // Function to get a random category
    function getRandomCategory() {
        const randomIndex = Math.floor(Math.random() * categories.length);
        return categories[randomIndex];
    }

    // Start the game and handle lobby creation/joining
    const startGame = (playerName, isCreating, lobbyCode) => {
        const selectedCategory = getRandomCategory(); // Get a random category

        if (isCreating) {
            const newLobbyCode = 'XYZ123'; // You'd generate a unique lobby code here
            app.innerHTML = ''; // Clear the app
            app.appendChild(GameLobby(newLobbyCode, [{ name: playerName }], selectedCategory)); // Pass the selected category
        } else {
            app.innerHTML = ''; // Clear the app
            app.appendChild(GameLobby(lobbyCode, [{ name: playerName }], selectedCategory)); // Pass the selected category
        }
    };

    // Initial load: Show game setup
    app.appendChild(GameSetup(startGame));
});
