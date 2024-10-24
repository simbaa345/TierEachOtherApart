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
            showBotSelection(playerName); // Proceed to bot selection
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

    // Function to show bot selection after hosting a game
    function showBotSelection(playerName) {
        container.innerHTML = `
            <h3 style="text-align: center;">How many bots would you like to add? (0-3)</h3>
            <input type="number" id="botCount" min="0" max="3" value="0" style="width: 50px; text-align: center;" />
            <button id="addBotsButton" style="padding: 10px 20px; font-size: 1em;">Add Bots</button>
        `;

        const botCountInput = container.querySelector('#botCount');
        const addBotsButton = container.querySelector('#addBotsButton');

        addBotsButton.addEventListener('click', () => {
            const botCount = parseInt(botCountInput.value);
            players.push({ name: playerName, avatar: null, team: null, isHost: true });
            for (let i = 1; i <= botCount; i++) {
                const botName = `Bot ${i}`;
                players.push({ name: botName, avatar: `avatar${(i % 3) + 1}`, team: null }); // Assign avatars in a round-robin fashion
            }
            assignTeams(); // Assign teams after adding bots
            showLobby(); // Show lobby with teams and avatars
        });
    }

    // Function to show the lobby with teams
    function showLobby() {
        const app = document.getElementById('app');
        app.innerHTML = ''; // Clear the current content

        const teamsContainer = document.createElement('div');
        teamsContainer.style.textAlign = 'center';

        const teams = {};
        players.forEach(player => {
            if (!teams[player.team]) {
                teams[player.team] = [];
            }
            teams[player.team].push(player);
        });

        // Display teams and their members
        Object.keys(teams).forEach(teamName => {
            const teamDiv = document.createElement('div');
            teamDiv.innerHTML = `<h3>${teamName}</h3>`;
            const avatarsContainer = document.createElement('div');
            avatarsContainer.style.display = 'flex';
            avatarsContainer.style.justifyContent = 'center';
            avatarsContainer.style.gap = '10px';

            teams[teamName].forEach(member => {
                const avatarImage = document.createElement('img');
                avatarImage.src = `images/${member.avatar}.png`;
                avatarImage.alt = `${member.name}'s Avatar`;
                avatarImage.style.width = '50px';
                avatarImage.style.borderRadius = '50%';
                avatarsContainer.appendChild(avatarImage);
            });

            teamDiv.appendChild(avatarsContainer);
            teamsContainer.appendChild(teamDiv);
        });

        app.appendChild(teamsContainer);

        // Only the host sees the "Start Game" button
        const startButton = document.createElement('button');
        startButton.innerText = 'Start Game';
        startButton.style.padding = '10px 20px';
        startButton.style.marginTop = '20px';
        startButton.disabled = players.length < 4; // Disable button if less than 4 players
        startButton.addEventListener('click', startGame); // Start game logic

        if (players[0].isHost) { // Only show for the host
            app.appendChild(startButton);
        }
    }

    // Function to assign players to teams based on current player count
    function assignTeams() {
        const playerCount = players.length;
        const teamsCount = Math.min(Math.ceil(playerCount / 2), maxTeams); // Max teams based on player count

        players.forEach((player, index) => {
            player.team = `Team ${Math.floor(index / (playerCount / teamsCount)) + 1}`;
        });
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
    }

    // Function to start the game with a countdown
    function startGame() {
        const app = document.getElementById('app');
        app.innerHTML = ''; // Clear previous content

        const countdownMessage = document.createElement('h2');
        countdownMessage.innerText = "Game starts in 5 seconds...";
        countdownMessage.style.textAlign = 'center';
        app.appendChild(countdownMessage);

        let countdown = 5;
        const countdownInterval = setInterval(() => {
            countdown--;
            countdownMessage.innerText = `Game starts in ${countdown} seconds...`;
            if (countdown <= 0) {
                clearInterval(countdownInterval);
                app.innerHTML = '<h2 style="text-align: center;">Game Started!</h2>';
                // Here you would transition to the game logic
                // For example: loadTierList();
            }
        }, 1000);
    }

    return container;
}
