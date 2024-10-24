// Game.js

import { categories } from './Categories.js'; // Import the categories from Categories.js

export function startGame(players) {
    const app = document.getElementById('app');
    app.innerHTML = ''; // Clear previous content

    // Create the tier list layout
    const tierListContainer = document.createElement('div');
    tierListContainer.style.display = 'flex';
    tierListContainer.style.justifyContent = 'space-around';
    tierListContainer.style.marginTop = '20px';

    const leftColumn = document.createElement('div');
    leftColumn.style.width = '100px';

    const tierLabels = ['S', 'A', 'B', 'C', 'D', 'F'];
    tierLabels.forEach(label => {
        const tierCell = document.createElement('div');
        tierCell.innerText = label;
        tierCell.style.border = '2px solid black';
        tierCell.style.height = '100px';
        tierCell.style.textAlign = 'center';
        tierCell.style.lineHeight = '100px'; // Center text vertically
        tierCell.style.fontSize = '24px';
        tierCell.style.backgroundColor = '#f0f0f0';
        tierCell.dataset.tier = label; // Use data attribute for dragging
        leftColumn.appendChild(tierCell);
    });

    const rightColumn = document.createElement('div');
    rightColumn.style.flexGrow = '1';
    rightColumn.style.border = '2px solid black';
    rightColumn.style.height = '600px'; // Set height for the game area

    tierListContainer.appendChild(leftColumn);
    tierListContainer.appendChild(rightColumn);
    app.appendChild(tierListContainer);

    // Create the drag-and-drop items from categories
    const categoryContainer = document.createElement('div');
    categoryContainer.style.marginTop = '20px';
    categoryContainer.style.display = 'flex';
    categoryContainer.style.flexWrap = 'wrap';
    categoryContainer.style.justifyContent = 'center';
    
    categories.forEach(item => {
        const categoryItem = document.createElement('div');
        categoryItem.innerText = item;
        categoryItem.style.border = '1px solid #000';
        categoryItem.style.margin = '5px';
        categoryItem.style.padding = '10px';
        categoryItem.style.cursor = 'move';
        categoryItem.draggable = true;

        categoryItem.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', item);
        });

        categoryContainer.appendChild(categoryItem);
    });

    app.appendChild(categoryContainer);

    // Timer
    let timeLeft = 120; // 2 minutes
    const timerDisplay = document.createElement('h2');
    timerDisplay.innerText = `Time left: ${timeLeft} seconds`;
    app.appendChild(timerDisplay);

    const timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `Time left: ${timeLeft} seconds`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showSubmitButton(); // Show submit button when time is up
        }
    }, 1000);

    // Function to show the submit button
    function showSubmitButton() {
        const submitButton = document.createElement('button');
        submitButton.innerText = 'Submit';
        submitButton.style.padding = '10px 20px';
        submitButton.style.marginTop = '20px';
        submitButton.addEventListener('click', submitResponses);
        app.appendChild(submitButton);
    }

    // Function to handle submit responses
    function submitResponses() {
        // Collect the responses and handle them as needed
        const tierCells = leftColumn.querySelectorAll('div');
        const results = {};

        tierCells.forEach(cell => {
            const tier = cell.dataset.tier;
            results[tier] = [...cell.childNodes].map(node => node.innerText); // Get items in each tier
        });

        console.log('Player Responses:', results); // Replace with your logic to handle the data
        alert('Responses submitted!'); // Feedback for now
    }

    // Add drop functionality to the tier cells
    leftColumn.querySelectorAll('div').forEach(cell => {
        cell.addEventListener('dragover', (e) => {
            e.preventDefault(); // Allow drop
        });

        cell.addEventListener('drop', (e) => {
            e.preventDefault();
            const item = e.dataTransfer.getData('text/plain');
            const tier = cell.dataset.tier;

            const itemDiv = document.createElement('div');
            itemDiv.innerText = item;
            itemDiv.style.border = '1px solid #ccc';
            itemDiv.style.margin = '5px';
            itemDiv.style.padding = '5px';
            itemDiv.style.backgroundColor = '#e0e0e0';

            cell.appendChild(itemDiv); // Add item to the respective tier
        });
    });
}
