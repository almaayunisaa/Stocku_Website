document.getElementById('registerButton').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const notification = document.getElementById('notification');
    const notificationIcon = document.getElementById('notificationIcon');

    // Sembunyikan notifikasi sebelumnya
    notification.style.display = 'none';

    if (username === '' || email === '' || password === '' || confirmPassword === '') {
        // Tampilkan ikon notifikasi untuk bidang kosong
        notificationIcon.src = "image/Notif Belum Isi Semua.svg"; // Path untuk ikon bidang kosong
        notification.style.display = 'flex';
    } else if (password !== confirmPassword) {
        // Tampilkan ikon notifikasi untuk ketidakcocokan kata sandi
        notificationIcon.src = "image/Notif Password dan confirm beda.svg"; // Path untuk ikon kata sandi tidak cocok
        notification.style.display = 'flex';
    } else {
        // Jika validasi berhasil, arahkan ke halaman berikutnya
        window.location.href = 'loading.html';
    }
});

// Event listener untuk menutup notifikasi saat ikon diklik
document.getElementById('closeNotification').addEventListener('click', function() {
    document.getElementById('notification').style.display = 'none';
});
