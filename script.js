import { GameSetup } from './GameSetup.js';
import { GameLobby } from './GameLobby.js';
import { categories } from './categories.js'; // Import your categories

console.log("script.js is loaded");
const socket = io(); // Initialize Socket.IO
const existingLobbyCodes = new Set(); // To keep track of lobby codes

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");
    
    const app = document.getElementById('app');
    
    // Function to get a random category
    function getRandomCategory() {
        const randomIndex = Math.floor(Math.random() * categories.length);
        return categories[randomIndex];
    }

    // Start the game and handle lobby creation/joining
    const startGame = (playerName, isCreating, lobbyCode) => {
        console.log('Starting game with:', playerName, isCreating, lobbyCode);
        const selectedCategory = getRandomCategory(); // Get a random category

        app.innerHTML = ''; // Clear existing content
        app.appendChild(GameLobby(lobbyCode, [{ name: playerName }], selectedCategory)); // Render the GameLobby
        socket.emit('joinLobby', lobbyCode); // Join the specified lobby
    };

    // Function to generate a random lobby code
    function generateLobbyCode(length = 6) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let lobbyCode;

        do {
            lobbyCode = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                lobbyCode += characters[randomIndex];
            }
        } while (existingLobbyCodes.has(lobbyCode)); // Check for uniqueness

        existingLobbyCodes.add(lobbyCode); // Store the new code
        return lobbyCode;
    }

    // Function to send rankings to the server
    function sendRanking(lobbyCode, rankingData) {
        socket.emit('sendRanking', { lobbyCode, rankingData });
    }

    // Listen for ranking updates from other players
    socket.on('receiveRanking', (data) => {
        console.log('Received ranking:', data);
        // Handle received rankings (update UI, calculate scores, etc.)
    });

    // Initial load: Show game setup
    app.innerHTML = '<h2>Welcome to Tier Each Other Apart!</h2>'; // Add a welcome message
    app.appendChild(GameSetup(startGame)); // Call the GameSetup function to render the game setup
});
