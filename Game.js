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
    // Implement countdown and game starting logic here
    alert("Game is starting! Implement countdown logic here.");
}
