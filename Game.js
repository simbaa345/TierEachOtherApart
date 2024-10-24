let players = [];
let countdownTimer;
const TIME_LIMIT = 120; // 2 minutes for tier ranking

// Function to create teams
function createTeams() {
    if (players.length < 4) {
        alert('You need at least 4 players to create teams.');
        return;
    }

    // Shuffle players array
    players = shuffleArray(players);

    const teamsContainer = document.getElementById('teamsContainer');
    teamsContainer.innerHTML = ''; // Clear existing teams

    // Create teams
    for (let i = 0; i < players.length; i += 2) {
        const teamNumber = Math.floor(i / 2) + 1;
        const teamDiv = document.createElement('div');
        teamDiv.innerHTML = `<strong>Team ${teamNumber}:</strong> ${players[i].name}, ${players[i + 1] ? players[i + 1].name : 'Bot'}`;
        teamsContainer.appendChild(teamDiv);
    }

    // Show the Start Game button
    document.getElementById('startGame').style.display = 'block';
}

// Helper function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
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

function displayTierList() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <h2 style="color: orange;">Drag and Drop Your Rankings</h2>
        <div id="tierList" style="display: flex; justify-content: center; margin-bottom: 20px;">
            <div id="tiers" style="margin-right: 20px;">
                <div class="tier-cell" data-tier="S">S</div>
                <div class="tier-cell" data-tier="A">A</div>
                <div class="tier-cell" data-tier="B">B</div>
                <div class="tier-cell" data-tier="C">C</div>
                <div class="tier-cell" data-tier="D">D</div>
                <div class="tier-cell" data-tier="F">F</div>
            </div>
            <div id="rankingOptions" style="width: 200px; border: 1px solid black; height: 400px; overflow-y: auto;">
                <h3>Options</h3>
                <ul id="optionList"></ul>
            </div>
        </div>
        <button id="submitRanking" style="display: none;">Submit Ranking</button>
        <div id="timer" style="color: red;">Time Left: <span id="timeLeft">${TIME_LIMIT}</span> seconds</div>
    `;
    
    loadOptions();
    setupDragAndDrop();
    startTimer();
}

function loadOptions() {
    const optionList = document.getElementById('optionList');
    const categories = ['Cereal Brands', 'Honeymoon Destinations']; // Example categories
    const options = categories.map(category => {
        return Array.from({ length: 10 }, (_, i) => `${category} ${i + 1}`);
    }).flat();

    options.forEach(option => {
        const li = document.createElement('li');
        li.innerText = option;
        li.draggable = true;
        li.ondragstart = (e) => {
            e.dataTransfer.setData('text/plain', option);
        };
        optionList.appendChild(li);
    });
}

function setupDragAndDrop() {
    const tierCells = document.querySelectorAll('.tier-cell');
    tierCells.forEach(cell => {
        cell.ondragover = (e) => {
            e.preventDefault();
        };

        cell.ondrop = (e) => {
            const droppedItem = e.dataTransfer.getData('text/plain');
            const item = document.createElement('div');
            item.innerText = droppedItem;
            cell.appendChild(item);
            e.preventDefault();
        };
    });
}

function startTimer() {
    let timeLeft = TIME_LIMIT;
    const timerElement = document.getElementById('timeLeft');

    const timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            document.getElementById('submitRanking').style.display = 'block';
            alert('Time is up! Please submit your ranking.');
        }
    }, 1000);
}

// Ensure the startGame function is called when the Start Game button is clicked
document.addEventListener('DOMContentLoaded', () => {
    const createTeamsButton = document.getElementById('createTeams');
    const startButton = document.getElementById('startGame');

    if (createTeamsButton) {
        createTeamsButton.onclick = createTeams;
    }

    if (startButton) {
        startButton.onclick = () => {
            startGame();
        };
    }
});
