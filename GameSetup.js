// GameSetup.js

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
        const app = document.getElementById('app');
        app.innerHTML = ''; // Clear the current content

        // Display the chosen avatar and team selection
        const welcomeMessage = document.createElement('h2');
        welcomeMessage.innerText = `Welcome, ${playerName}! You have selected ${selectedAvatar}.`;
        welcomeMessage.style.textAlign = 'center';
        app.appendChild(welcomeMessage);

        const avatarImage = document.createElement('img');
        avatarImage.src = `images/${selectedAvatar}.png`; // Display selected avatar
        avatarImage.alt = `${playerName}'s Avatar`;
        avatarImage.style.width = '100px'; // Slightly larger for display
        avatarImage.style.borderRadius = '50%'; // Keep it circular
        avatarImage.style.display = 'block'; // Centering the avatar
        avatarImage.style.margin = '0 auto'; // Center the avatar
        app.appendChild(avatarImage);

        // Disable further avatar selection
        const avatarSelection = document.getElementById('avatarSelection');
        avatarSelection.querySelectorAll('img').forEach(img => {
            img.style.pointerEvents = 'none'; // Disable clicks on all avatars
            img.style.opacity = '0.5'; // Dim the avatars
        });

        // Team selection (for simplicity, assume two teams)
        const teamSelection = document.createElement('div');
        teamSelection.innerHTML = `
            <h3 style="text-align: center;">Select your team:</h3>
            <div style="text-align: center;">
                <button id="teamOneButton" style="padding: 10px 20px; margin: 5px;">Team One</button>
                <button id="teamTwoButton" style="padding: 10px 20px; margin: 5px;">Team Two</button>
            </div>
        `;

        const teamOneButton = teamSelection.querySelector('#teamOneButton');
        const teamTwoButton = teamSelection.querySelector('#teamTwoButton');

        // Event listeners for team selection
        teamOneButton.addEventListener('click', () => {
            app.innerHTML = `${playerName} has joined Team One!`;
            // Proceed with game setup
        });

        teamTwoButton.addEventListener('click', () => {
            app.innerHTML = `${playerName} has joined Team Two!`;
            // Proceed with game setup
        });

        app.appendChild(teamSelection); // Add team selection to the app
    }

    document.body.appendChild(container); // Append the main container to the body
}
