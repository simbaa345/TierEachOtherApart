let players = [];
let countdownTimer;
const TIME_LIMIT = 120; // 2 minutes for tier ranking

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

function splitPlayersIntoTeams() {
    const teams = {};
    players.forEach((player, index) => {
        const teamNumber = Math.floor(index / 2) + 1; // 2 players per team
        if (!teams[`Team ${teamNumber}`]) {
            teams[`Team ${teamNumber}`] = [];
        }
        teams[`Team ${teamNumber}`].push(player);
    });
    return teams;
}

// Ensure the startGame function is called when the Start Game button is clicked
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startGame');
    if (startButton) {
        startButton.onclick = () => {
            if (players.length >= 4) {
                const teams = splitPlayersIntoTeams();
                console.log('Teams:', teams); // Log the teams to verify
                startGame(); // Start the countdown
            } else {
                alert('You need at least 4 players to start the game.');
            }
        };
    }
});
