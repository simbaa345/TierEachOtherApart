let players = [];
let lobbyCode;
let selectedAvatar = null;

// Function to select avatars
function selectAvatar(avatar) {
    if (selectedAvatar) {
        selectedAvatar.classList.remove('selected');
    }
    selectedAvatar = avatar;
    avatar.classList.add('selected');
}
