console.log("script.js is loaded");

import { GameSetup } from './GameSetup.js';
import { GameLobby } from './GameLobby.js';
import { categories } from './categories.js'; // Import your categories

const socket = io(); // Initialize Socket.IO
const existingLobbyCodes = new Set(); // To keep track of lobby codes

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
            const newLobbyCode = generateLobbyCode(); // Generate a unique lobby code
            app.innerHTML = ''; // Clear the app
            app.appendChild(GameLobby(newLobbyCode, [{ name: playerName }], selectedCategory)); // Pass the selected category
            socket.emit('joinLobby', newLobbyCode); // Join the newly created lobby
        } else {
            app.innerHTML = ''; // Clear the app
            app.appendChild(GameLobby(lobbyCode, [{ name: playerName }], selectedCategory)); // Pass the selected category
            socket.emit('joinLobby', lobbyCode); // Join the existing lobby
        }
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
        // Update the UI with received rankings
        // You can handle score calculation here
    });

    // Initial load: Show game setup
    app.appendChild(GameSetup(startGame));
});
