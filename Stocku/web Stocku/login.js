// Contoh data pengguna yang tersimpan di database (simulasi)
const users = [
    { username: 'yourUsername', password: 'yourPassword' } // data user yang valid
];

// Fungsi pengecekan apakah username terdaftar dalam database
function isUsernameValid(username) {
    return users.some(user => user.username === username);
}

// Fungsi pengecekan apakah kombinasi username dan password cocok dalam database
function isUserValid(username, password) {
    return users.some(user => user.username === username && user.password === password);
}

document.getElementById('loginButton').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const notification = document.getElementById('notification');
    const notificationIcon = document.getElementById('notificationIcon');

    // Clear previous error message
    notification.style.display = 'none';

    if (!isUsernameValid(username)) {
        // Set icon for username error
        notificationIcon.src = "image/Notif Username Salah.svg"; // Path to username error icon
        console.log("Username error icon set:", notificationIcon.src); // Log path for debugging
        notification.style.display = 'block'; // Display notification
    } else if (!isUserValid(username, password)) {
        // Set icon for password error
        notificationIcon.src = "image/Notif Password Salah.svg"; // Path to password error icon
        console.log("Password error icon set:", notificationIcon.src); // Log path for debugging
        notification.style.display = 'block'; // Display notification
    } else {
        window.location.href = 'loading.html'; // Redirect to next page if login successful
    }
});

// Event listener to hide the notification when the close button is clicked
document.getElementById('closeNotification').addEventListener('click', function() {
    document.getElementById('notification').style.display = 'none'; // Hide notification
});
