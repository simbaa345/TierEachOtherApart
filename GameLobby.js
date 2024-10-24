export function GameLobby(lobbyCode, players) {
    const div = document.createElement('div');
    div.innerHTML = `
        <h2>Lobby Code: ${lobbyCode}</h2>
        <h3>Current Players:</h3>
        <ul id="playersList"></ul>
        <button id="startGame">Start Game</button>
    `;

    const playersList = div.querySelector('#playersList');
    players.forEach(player => {
        const li = document.createElement('li');
        li.textContent = player.name;
        playersList.appendChild(li);
    });

    div.querySelector('#startGame').onclick = () => {
        // Logic to start the game
    };

    return div;
}
