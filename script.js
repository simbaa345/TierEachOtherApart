import { GameSetup } from './GameSetup.js';
import { GameLobby } from './GameLobby.js';

document.addEventListener('DOMContentLoaded', () => {
   const app = document.getElementById('app');

   const startGame = (playerName, isCreating, lobbyCode) => {
       // Handle the logic for creating or joining a lobby
       if (isCreating) {
           const newLobbyCode = 'XYZ123'; // Generate your lobby code
           app.innerHTML = ''; // Clear the app
           app.appendChild(GameLobby(newLobbyCode, [{ name: playerName }])); // Pass players
       } else {
           // Logic to join a lobby and fetch players
           app.innerHTML = ''; // Clear the app
           app.appendChild(GameLobby(lobbyCode, [{ name: playerName }])); // Pass players
       }
   };

   // Initial load
   app.appendChild(GameSetup(startGame));
});
