/**
 * Event listener untuk tombol login.
 * Mengirim permintaan ke server untuk memverifikasi kredensial pengguna dan menyimpan token autentikasi ke `localStorage`.
 * Jika login berhasil, pengguna diarahkan ke halaman `loading.html`.
 * Jika gagal, menampilkan notifikasi kesalahan.
 */
document.getElementById('loginButton').addEventListener('click', async function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const notification = document.getElementById('notification');
    const notificationIcon = document.getElementById('notificationIcon');

    // Clear previous error message
    notification.style.display = 'none';

    try {
        const res = await fetch('http://localhost:5500/api/auth/signIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const hasil = await res.json();
        if (res.ok) {
            const token = hasil.token;
            localStorage.setItem('authToken', token);
            localStorage.setItem('riwayatArray', JSON.stringify(['Login berhasil', 'Berhasil masuk ke Home']));
            window.location.href = 'loading.html'; 
        } else {
            if (hasil.message == 'Username Anda salah Silahkan coba lagi') {
                // Set icon for username error
                notificationIcon.src = "image/Notif Username Salah.svg"; // Path to username error icon
                console.log("Username error icon set:", notificationIcon.src); // Log path for debugging
                notification.style.display = 'block'; // Display notification
            } else if (hasil.message === 'Password Anda salah Silahkan coba lagi') {
               // Set icon for password error
               notificationIcon.src = "image/Notif Password Salah.svg"; // Path to password error icon
               console.log("Password error icon set:", notificationIcon.src); // Log path for debugging
               notification.style.display = 'block';
            }
        }

        console.log('Response dari server:', hasil);

    } catch (err) {
        console.log('Error:', err);
    }
});

/**
 * Event listener untuk menutup notifikasi kesalahan.
 * Menyembunyikan elemen notifikasi ketika tombol tutup diklik.
 */
document.getElementById('closeNotification').addEventListener('click', function() {
    document.getElementById('notification').style.display = 'none'; // Hide notification
});
