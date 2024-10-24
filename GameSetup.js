// GameSetup.js

const players = []; // Array to hold player data
const maxTeams = 5; // Maximum number of teams

export function GameSetup(hostGame, joinGame) {
    const container = document.createElement('div');

    // Epic Welcome Message
    container.innerHTML = `
        <h2 style="text-align: center; font-size: 2.5em; color: #ff6600; font-weight: bold;">
            Welcome to Tier Each Other Apart
        </h2>
        <label for="playerName" style="font-size: 1.2em;">Enter your name:</label>
        <input type="text" id="playerName" placeholder="Your name" style="padding: 10px; font-size: 1em; width: 200px;" />
        <div style="text-align: center; margin-top: 20px;">
            <button id="joinButton" style="padding: 10px 20px; font-size: 1em; margin-right: 10px;">Join Game</button>
            <button id="hostButton" style="padding: 10px 20px; font-size: 1em;">Host Game</button>
        </div>
    `;

    const playerNameInput = container.querySelector('#playerName');
    const joinButton = container.querySelector('#joinButton');
    const hostButton = container.querySelector('#hostButton');

    // Event listener for hosting a game
    hostButton.addEventListener('click', () => {
        const playerName = playerNameInput.value.trim();
        if (playerName) {
            const lobbyCode = generateLobbyCode(); // Generate a unique lobby code
            players.push({ name: playerName, avatar: null, team: null, isHost: true });
            showGameSetup(playerName, lobbyCode); // Proceed to setup
        } else {
            alert('Please enter your name to host a game.');
        }
    });

    // Event listener for joining a game
    joinButton.addEventListener('click', () => {
        const playerName = playerNameInput.value.trim();
        if (playerName) {
            players.push({ name: playerName, avatar: null, team: null });
            showAvatarSelection(playerName); // Proceed to avatar selection
        } else {
            alert('Please enter your name to join a game.');
        }
    });

    // Function to show the game setup after hosting
    function showGameSetup(playerName, lobbyCode) {
        container.innerHTML = `<h3 style="text-align: center;">Lobby Code: <strong>${lobbyCode}</strong></h3>`;
        
        const avatarSelection = document.createElement('div');
        avatarSelection.id = 'avatarSelection';
        avatarSelection.style.display = 'flex';
        avatarSelection.style.justifyContent = 'center';
        avatarSelection.style.gap = '10px'; // Space between avatars

        // List of avatars (you can add more)
        const avatars = ['avatar1', 'avatar2', 'avatar3'];
        avatars.forEach(avatar => {
            const img = document.createElement('img');
            img.src = `images/${avatar}.png`; // Adjust image path as needed
            img.alt = avatar;
            img.className = 'avatar';
            img.setAttribute('data-avatar', avatar);
            img.style.width = '50px'; // Set a smaller size for the avatar
            img.style.height = '50px';
            img.style.borderRadius = '50%'; // Make the avatar circular
            img.style.cursor = 'pointer'; // Change cursor to pointer for interactivity

            // Avatar selection logic
            img.addEventListener('click', () => {
                selectAvatar(avatar, playerName); // Call to select the avatar
            });

            avatarSelection.appendChild(img);
        });

        container.appendChild(avatarSelection);
    }

    // Function to show avatar selection after joining a game
    function showAvatarSelection(playerName) {
        container.innerHTML = `<h3 style="text-align: center;">Select your avatar, ${playerName}:</h3>`;
        
        const avatarSelection = document.createElement('div');
        avatarSelection.id = 'avatarSelection';
        avatarSelection.style.display = 'flex';
        avatarSelection.style.justifyContent = 'center';
        avatarSelection.style.gap = '10px'; // Space between avatars

        // List of avatars (you can add more)
        const avatars = ['avatar1', 'avatar2', 'avatar3'];
        avatars.forEach(avatar => {
            const img = document.createElement('img');
            img.src = `images/${avatar}.png`; // Adjust image path as needed
            img.alt = avatar;
            img.className = 'avatar';
            img.setAttribute('data-avatar', avatar);
            img.style.width = '50px'; // Set a smaller size for the avatar
            img.style.height = '50px';
            img.style.borderRadius = '50%'; // Make the avatar circular
            img.style.cursor = 'pointer'; // Change cursor to pointer for interactivity

            // Avatar selection logic
            img.addEventListener('click', () => {
                selectAvatar(avatar, playerName); // Call to select the avatar
            });

            avatarSelection.appendChild(img);
        });

        container.appendChild(avatarSelection);
    }

    // Function to handle avatar selection and team assignment
    function selectAvatar(selectedAvatar, playerName) {
        const playerIndex = players.findIndex(p => p.name === playerName);
        players[playerIndex].avatar = selectedAvatar; // Assign avatar to the player

        const app = document.getElementById('app');
        app.innerHTML = ''; // Clear the current content

        // Update team assignment
        assignTeams();
        
        // Display the team name and avatars
        const teamName = players[playerIndex].team;
        const teamMembers = players.filter(p => p.team === teamName);

        const teamMessage = document.createElement('h2');
        teamMessage.innerText = `You have joined ${teamName}!`;
        teamMessage.style.textAlign = 'center';
        app.appendChild(teamMessage);

        // Display team member avatars
        const avatarsContainer = document.createElement('div');
        avatarsContainer.style.display = 'flex';
        avatarsContainer.style.justifyContent = 'center';
        avatarsContainer.style.gap = '10px';

        teamMembers.forEach(member => {
            const avatarImage = document.createElement('img');
            avatarImage.src = `images/${member.avatar}.png`; // Display selected avatar
            avatarImage.alt = `${member.name}'s Avatar`;
            avatarImage.style.width = '50px';
            avatarImage.style.borderRadius = '50%'; // Keep it circular
            avatarsContainer.appendChild(avatarImage);
        });

        app.appendChild(avatarsContainer);

        // Check if player is the first in lobby to start the game
        if (players.filter(p => p.team === teamName).length === 1) {
            const startButton = document.createElement('button');
            startButton.innerText = 'Start Game';
            startButton.style.padding = '10px 20px';
            startButton.style.marginTop = '20px';
            startButton.disabled = players.length < 4; // Disable button if less than 4 players
            startButton.addEventListener('click', () => {
                // Logic to start the game
                alert('Game is starting!');
            });

            app.appendChild(startButton);
        }
    }

    // Function to generate a unique lobby code
    function generateLobbyCode() {
        return Math.random().toString(36).substring(2, 8).toUpperCase(); // Generates a random 6-character code
    }

    // Function to assign players to teams based on current player count
    function assignTeams() {
        const playerCount = players.length;
        const teamsCount = Math.min(Math.ceil(playerCount / 2), maxTeams); // Max teams based on player count

        players.forEach((player, index) => {
            player.team = `Team ${Math.floor(index / (playerCount / teamsCount)) + 1}`;
        });
    }

    document.body.appendChild(container); // Append the main container to the body
}
