document.getElementById('createTeams').onclick = () => {
    if (players.length < 4) {
        alert('You need at least 4 players to create teams.');
        return;
    }

    players = shuffleArray(players);
    const teamsContainer = document.getElementById('teamsContainer');
    teamsContainer.innerHTML = '<h2>Teams:</h2>';

    for (let i = 0; i < players.length; i += 2) {
        const teamDiv = document.createElement('div');
        teamDiv.innerHTML = `<strong>Team ${Math.floor(i / 2) + 1}:</strong> ${players[i].name} (${players[i].avatar}), ${players[i + 1] ? players[i + 1].name + ` (${players[i + 1].avatar})` : 'Bot'}`;
        teamsContainer.appendChild(teamDiv);
    }

    teamsContainer.style.display = 'block';
    document.getElementById('startGame').style.display = 'block';
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
                countdownContainer.innerHTML = ""; 
                displayGame(); 
            }, 1000);
        }
    }, 1000);
}

function displayGame() {
    const gameContainer = document.createElement('div');
    gameContainer.id = 'gameContainer';
    document.getElementById('app').appendChild(gameContainer);

    // Black table structure
    gameContainer.innerHTML = `
        <h2>Time Remaining: <span id="timer">120</span> seconds</h2>
        <div style="display: flex;">
            <div style="width: 50px; text-align: center; color: white;">S</div>
            <div style="width: 50px; text-align: center; color: white;">A</div>
            <div style="width: 50px; text-align: center; color: white;">B</div>
            <div style="width: 50px; text-align: center; color: white;">C</div>
            <div style="width: 50px; text-align: center; color: white;">D</div>
            <div style="width: 50px; text-align: center; color: white;">F</div>
        </div>
        <div style="display: flex; border: 2px solid black; background-color: black; color: white;">
            <div style="width: 50px; padding: 10px;"></div>
            <div style="width: 50px; padding: 10px;" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
            <div style="width: 50px; padding: 10px;" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
            <div style="width: 50px; padding: 10px;" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
            <div style="width: 50px; padding: 10px;" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
            <div style="width: 50px; padding: 10px;" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
        </div>
        <div id="optionsContainer" style="margin-top: 20px;"></div>
        <button id="submitRankings">Submit Rankings</button>
    `;

    populateOptions();
    startTimer(120); 
}

function populateOptions() {
    const options = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew']; // Example categories
    const optionsContainer = document.getElementById('optionsContainer');
    
    options.forEach(option => {
        const optionDiv = document.createElement('div');
        optionDiv.textContent = option;
        optionDiv.draggable = true;
        optionDiv.ondragstart = (event) => {
            event.dataTransfer.setData('text/plain', option);
        };
        optionsContainer.appendChild(optionDiv);
    });
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    const tierCell = event.target;

    // Clear existing child elements to avoid multiple drops
    while (tierCell.firstChild) {
        tierCell.removeChild(tierCell.firstChild);
    }

    // Append dragged item to the tier cell
    const itemDiv = document.createElement('div');
    itemDiv.textContent = data;
    itemDiv.style.backgroundColor = 'white';
    itemDiv.style.color = 'black';
    itemDiv.style.padding = '5px';
    itemDiv.style.margin = '2px';
    tierCell.appendChild(itemDiv);
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
            // Implement logic for submitting rankings here
        }
    }, 1000);
}
