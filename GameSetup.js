document.getElementById('hostGame').onclick = () => {
    const playerName = document.getElementById('playerName').value;
    if (playerName) {
        document.getElementById('avatarSelection').style.display = 'block';
        generateAvatars();
    } else {
        alert("Please enter a name.");
    }
};

function generateAvatars() {
    const avatarsContainer = document.getElementById('avatars');
    avatarsContainer.innerHTML = ''; // Clear previous avatars
    const avatars = ['avatar1.png', 'avatar2.png', 'avatar3.png']; // Update with your avatar images

    avatars.forEach(src => {
        const img = document.createElement('img');
        img.src = `images/${src}`;
        img.className = 'avatar';
        img.onclick = () => selectAvatar(img);
        avatarsContainer.appendChild(img);
    });
}

document.getElementById('confirmAvatar').onclick = () => {
    if (selectedAvatar) {
        const playerName = document.getElementById('playerName').value;
        players.push({ name: playerName, avatar: selectedAvatar.src });
        document.getElementById('addBots').style.display = 'block'; // Show Add Bots button
        document.getElementById('avatarSelection').style.display = 'none'; // Hide avatar selection
    } else {
        alert("Please select an avatar.");
    }
};

document.getElementById('addBots').onclick = () => {
    const botsToAdd = prompt("How many bots to add (1-3)?");
    if (botsToAdd >= 1 && botsToAdd <= 3) {
        for (let i = 0; i < botsToAdd; i++) {
            const botName = `Bot ${i + 1}`;
            const botAvatar = `images/bot_avatar.png`; // Update with your bot avatar image
            players.push({ name: botName, avatar: botAvatar });
        }
        document.getElementById('createTeams').style.display = 'block'; // Show Create Teams button
    } else {
        alert("Please enter a valid number of bots.");
    }
};
