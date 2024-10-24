// GameSetup.js

export function GameSetup(hostGame, joinGame) {
    const container = document.createElement('div');

    // Initial Welcome Message and Input
    container.innerHTML = `
        <h2>Welcome to Tier Each Other Apart</h2>
        <label for="playerName">Enter your name:</label>
        <input type="text" id="playerName" placeholder="Your name" />
        <button id="joinButton">Join Game</button>
        <button id="hostButton">Host Game</button>
    `;

    const playerNameInput = container.querySelector('#playerName');
    const joinButton = container.querySelector('#joinButton');
    const hostButton = container.querySelector('#hostButton');

    // Event listener for hosting a game
    hostButton.addEventListener('click', () => {
        const playerName = playerNameInput.value.trim();
        if (playerName) {
            hostGame(playerName); // Call the host game function with the player's name
        } else {
            alert('Please enter your name to host a game.');
        }
    });

    // Event listener for joining a game
    joinButton.addEventListener('click', () => {
        const playerName = playerNameInput.value.trim();
        if (playerName) {
            showAvatarSelection(playerName); // Proceed to avatar selection
        } else {
            alert('Please enter your name to join a game.');
        }
    });

    // Function to show avatar selection after joining a game
    function showAvatarSelection(playerName) {
        container.innerHTML = `<h3>Select your avatar, ${playerName}:</h3>`;
        
        const avatarSelection = document.createElement('div');
        avatarSelection.id = 'avatarSelection';

        // List of avatars (you can add more)
        const avatars = ['avatar1', 'avatar2', 'avatar3'];
        avatars.forEach(avatar => {
            const img = document.createElement('img');
            img.src = `images/${avatar}.png`; // Adjust image path as needed
            img.alt = avatar;
            img.className = 'avatar';
            img.setAttribute('data-avatar', avatar);
            img.style.cursor = 'pointer'; // Change cursor to pointer for interactivity

            // Avatar selection logic
            img.addEventListener('click', () => {
                selectAvatar(avatar, playerName);
            });

            avatarSelection.appendChild(img);
        });

        container.appendChild(avatarSelection);
    }

    // Function to handle avatar selection and team assignment
    function selectAvatar(selectedAvatar, playerName) {
        const app = document.getElementById('app');
        app.innerHTML = ''; // Clear the current content

        // Display the chosen avatar and team selection
        const welcomeMessage = document.createElement('h2');
        welcomeMessage.innerText = `Welcome, ${playerName}! You have selected ${selectedAvatar}.`;
        app.appendChild(welcomeMessage);

        const avatarImage = document.createElement('img');
        avatarImage.src = `images/${selectedAvatar}.png`; // Display selected avatar
        avatarImage.alt = `${playerName}'s Avatar`;
        app.appendChild(avatarImage);

        // Team selection (for simplicity, assume two teams)
        const teamSelection = document.createElement('div');
        teamSelection.innerHTML = `
            <h3>Select your team:</h3>
            <button id="teamOneButton">Team One</button>
            <button id="teamTwoButton">Team Two</button>
        `;

        const teamOneButton = teamSelection.querySelector('#teamOneButton');
        const teamTwoButton = teamSelection.querySelector('#teamTwoButton');

        // Event listeners for team selection
        teamOneButton.addEventListener('click', () => {
            // Logic to join Team One
            app.innerHTML = `${playerName} has joined Team One!`;
            // Proceed with game setup
        });

        teamTwoButton.addEventListener('click', () => {
            // Logic to join Team Two
            app.innerHTML = `${playerName} has joined Team Two!`;
            // Proceed with game setup
        });

        app.appendChild(teamSelection); // Add team selection to the app
    }

    document.body.appendChild(container); // Append the main container to the body
}
