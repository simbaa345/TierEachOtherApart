document.getElementById('createTeams').onclick = () => {
    if (players.length < 4) {
        alert('You need at least 4 players to create teams.');
        return;
    }

    players = shuffleArray(players);

    const teamsContainer = document.getElementById('teamsContainer');
    teamsContainer.innerHTML = '<h2>Teams:</h2>'; // Clear existing teams

    // Create teams
    for (let i = 0; i < players.length; i += 2) {
        const teamDiv = document.createElement('div');
        teamDiv.innerHTML = `<strong>Team ${Math.floor(i / 2) + 1}:</strong> ${players[i].name} (${players[i].avatar}), ${players[i + 1] ? players[i + 1].name + ` (${players[i + 1].avatar})` : 'Bot'}`;
        teamsContainer.appendChild(teamDiv);
    }

    teamsContainer.style.display = 'block';
    document.getElementById('startGame').style.display = 'block'; // Show Start Game button
};

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

document.getElementById('startGame').onclick = () => {
    startGame();
};

function startGame() {
    const countdownContainer = document.createElement('div');
    countdownContainer.id = 'countdown';
    document.getElementById('app').appendChild(countdownContainer);

    let countdown = 5;
    const countdownInterval = setInterval(() => {
        countdownContainer.innerHTML = `Game starts in ${countdown}...`;
        countdown--;

        if (countdown < 0) {
            clearInterval(countdownInterval);
            countdownContainer.innerHTML = "Game Started!";
            setTimeout(() => {
                // Transition to game logic here
                countdownContainer.innerHTML = ""; // Clear countdown message
                displayGame(); // Call the function to display the game
            }, 1000);
        }
    }, 1000);
}

function displayGame() {
    // Implement the game UI here with tier lists
    const gameContainer = document.createElement('div');
    gameContainer.id = 'gameContainer';
    document.getElementById('app').appendChild(gameContainer);

    // Example structure of the game UI
    gameContainer.innerHTML = `
        <h2>Time Remaining: <span id="timer">120</span> seconds</h2>
        <div id="tierList" style="display: flex;">
            <div style="border: 1px solid black; padding: 10px;">
                <h3>S</h3>
                <div class="tier-cell" data-tier="S"></div>
            </div>
            <div style="border: 1px solid black; padding: 10px;">
                <h3>A</h3>
                <div class="tier-cell" data-tier="A"></div>
            </div>
            <div style="border: 1px solid black; padding: 10px;">
                <h3>B</h3>
                <div class="tier-cell" data-tier="B"></div>
            </div>
            <div style="border: 1px solid black; padding: 10px;">
                <h3>C</h3>
                <div class="tier-cell" data-tier="C"></div>
            </div>
            <div style="border: 1px solid black; padding: 10px;">
                <h3>D</h3>
                <div class="tier-cell" data-tier="D"></div>
            </div>
            <div style="border: 1px solid black; padding: 10px;">
                <h3>F</h3>
                <div class="tier-cell" data-tier="F"></div>
            </div>
        </div>
        <button id="submitRankings">Submit Rankings</button>
    `;

    startTimer(120); // Start the 2-minute timer
}

function startTimer(duration) {
    let timer = duration;
    const timerDisplay = document.getElementById('timer');

    const timerInterval = setInterval(() => {
        timer--;
        timerDisplay.textContent = timer;

        if (timer <= 0) {
            clearInterval(timerInterval);
            alert("Time's up! Submitting rankings...");
            // Implement the logic for submitting rankings here
        }
    }, 1000);
}
