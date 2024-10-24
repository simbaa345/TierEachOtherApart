function createTeams() {
    if (players.length < 4) {
        alert('You need at least 4 players to create teams.');
        return;
    }

    // Shuffle players
    players = shuffleArray(players);

    const teamsContainer = document.getElementById('teamsContainer');
    teamsContainer.innerHTML = ''; // Clear existing teams

    // Create teams
    for (let i = 0; i < players.length; i += 2) {
        const teamNumber = Math.floor(i / 2) + 1;
        const teamDiv = document.createElement('div');
        teamDiv.innerHTML = `<strong>Team ${teamNumber}:</strong> ${players[i].name} (${players[i].avatar}), ${players[i + 1] ? players[i + 1].name + ` (${players[i + 1].avatar})` : 'Bot'}`;
        teamsContainer.appendChild(teamDiv);
    }

    // Show the Start Game button
    document.getElementById('startGame').style.display = 'block';
}

function startGame() {
    const app = document.getElementById('app');
    app.innerHTML = `<h2 style="color: orange;">Game Starting in <span id="countdown">5</span> seconds!</h2>`;

    let countdown = 5;
    countdownTimer = setInterval(() => {
        countdown--;
        document.getElementById('countdown').innerText = countdown;
        if (countdown === 0) {
            clearInterval(countdownTimer);
            displayTierList();
        }
    }, 1000);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startGame');
    if (startButton) {
        startButton.onclick = () => {
            startGame();
        };
    }
});
