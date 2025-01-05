/**
 * Event listener untuk tombol register.
 * Mengirim permintaan ke server untuk membuat akun pengguna baru berdasarkan data yang dimasukkan.
 * Jika pendaftaran berhasil, pengguna akan diarahkan ke halaman `loading.html`.
 * Jika gagal, menampilkan notifikasi kesalahan terkait validasi atau proses pendaftaran.
 */
document.getElementById('registerButton').addEventListener('click', async function() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const notification = document.getElementById('notification');
    const notificationIcon = document.getElementById('notificationIcon');

    // Sembunyikan notifikasi sebelumnya
    notification.style.display = 'none';

    try {
        if (username === '' || email === '' || password === '' || confirmPassword === '') {
            // Tampilkan ikon notifikasi untuk bidang kosong
            notificationIcon.src = "image/Notif Belum Isi Semua.svg"; // Path untuk ikon bidang kosong
            notification.style.display = 'flex';
        } else if (password !== confirmPassword) {
            // Tampilkan ikon notifikasi untuk ketidakcocokan kata sandi
            notificationIcon.src = "image/Notif Password dan confirm beda.svg"; // Path untuk ikon kata sandi tidak cocok
            notification.style.display = 'flex';
        } else {
            const res = await fetch('http://localhost:5500/api/auth/signUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });
    
            const hasil = await res.json();
            if (res.ok) {
                window.location.href = 'loading.html'; 
            } else {
                if (hasil.message == 'Username sudah digunakan') {
                    notificationIcon.src = "image/Notif kalo ada kesalahan.svg"; 
                    console.log("Username error icon set:", notificationIcon.src); // Log path for debugging
                    notification.style.display = 'block'; // Display notification
                } else if (hasil.message === 'Format email tidak valid') {
                    notificationIcon.src = "image/Notif kalo ada kesalahan.svg";
                    console.log("Username error icon set:", notificationIcon.src); // Log path for debugging
                    notification.style.display = 'block'; // Display notification
                }
            }
            console.log('Response dari server:', hasil);
        }
       

    } catch (err) {
        console.log('Error:', err);
    }
});

/**
 * Event listener untuk menutup notifikasi.
 * Menyembunyikan elemen notifikasi ketika ikon close diklik.
 */
document.getElementById('closeNotification').addEventListener('click', function() {
    document.getElementById('notification').style.display = 'none';
});
