let players = [];
let currentPlayerIndex = 0;
let timer;

function startGame(playerList) {
    players = playerList;
    currentPlayerIndex = 0;
    showGameScreen();
    startCountdown();
}

function showGameScreen() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <h2 style="text-align: center;">Game Started!</h2>
        <div id="countdown" style="text-align: center; font-size: 2em;">2:00</div>
        <div id="tierList" style="display: flex; justify-content: center; margin-top: 20px;">
            ${createTierList()}
        </div>
        <div id="categoryItems" style="margin-top: 20px;"></div>
        <button id="submitRanking" style="display: none;">Submit Ranking</button>
    `;
    loadCategoryItems();

    document.getElementById('submitRanking').onclick = submitRanking;
}

function startCountdown() {
    let timeLeft = 120; // 2 minutes
    const countdownDisplay = document.getElementById('countdown');

    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById('submitRanking').style.display = 'block';
            return;
        }
        countdownDisplay.innerText = `${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`;
        timeLeft--;
    }, 1000);
}

function createTierList() {
    const TIER_OPTIONS = ['S', 'A', 'B', 'C', 'D', 'F'];
    return TIER_OPTIONS.map(tier => `
        <div class="tier" data-tier="${tier}" style="border: 1px solid black; padding: 10px; margin: 5px; width: 80px; text-align: center;">
            <strong>${tier}</strong>
            <div class="tier-items" id="${tier}-items" style="min-height: 100px;"></div>
        </div>
    `).join('');
}

function loadCategoryItems() {
    const categoryItemsDiv = document.getElementById('categoryItems');
    categoryItemsDiv.innerHTML = '';

    const tierListData = getTierListCategories();
    tierListData.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerText = item;
        itemDiv.draggable = true;
        itemDiv.ondragstart = (event) => {
            event.dataTransfer.setData('text/plain', item);
        };
        categoryItemsDiv.appendChild(itemDiv);
    });

    const TIER_OPTIONS = ['S', 'A', 'B', 'C', 'D', 'F'];
    TIER_OPTIONS.forEach(tier => {
        const tierDiv = document.getElementById(`${tier}-items`);
        tierDiv.ondragover = (event) => {
            event.preventDefault(); // Allow dropping
        };
        tierDiv.ondrop = (event) => {
            const item = event.dataTransfer.getData('text/plain');
            if (item) {
                const newItem = document.createElement('div');
                newItem.innerText = item;
                tierDiv.appendChild(newItem);
            }
        };
    });
}

function submitRanking() {
    const rankings = {};
    const TIER_OPTIONS = ['S', 'A', 'B', 'C', 'D', 'F'];
    TIER_OPTIONS.forEach(tier => {
        const items = Array.from(document.getElementById(`${tier}-items`).children).map(item => item.innerText);
        rankings[tier] = items;
    });

    console.log('Player Rankings:', rankings);
    // Here you can send rankings to the server or process them as needed
}

function getTierListCategories() {
    // Replace this with your logic to get categories for the players to rank
    return ['Cereal A', 'Cereal B', 'Cereal C', 'Cereal D', 'Cereal E'];
}

// Call event listeners for the game start if needed
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the game if needed or wait for GameSetup.js to call startGame
});
