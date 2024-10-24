export function GameSetup(onStart) {
    const div = document.createElement('div');
    div.innerHTML = `
        <h2>Enter Your Name</h2>
        <input type="text" id="playerName" placeholder="Your Name" />
        <button id="createLobby">Create Lobby</button>
        <button id="joinLobby">Join Lobby</button>
    `;
    
    const nameInput = div.querySelector('#playerName');
    div.querySelector('#createLobby').onclick = () => {
        const name = nameInput.value;
        // Logic to create a lobby
        onStart(name, true); // Call onStart with name and lobby creation
    };
    div.querySelector('#joinLobby').onclick = () => {
        const name = nameInput.value;
        const lobbyCode = prompt('Enter Lobby Code:');
        // Logic to join a lobby
        onStart(name, false, lobbyCode); // Call onStart with name and lobby joining
    };

    return div;
}
