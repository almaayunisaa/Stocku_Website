/**
 * Skrip untuk mengelola fitur antarmuka pengguna, termasuk dropdown profil,
 * pencarian produk, pengaturan stok, dan autentikasi pengguna.
 *
 * @module UIInteraction
 */

// ========================================================
// Dropdown Profil
// ========================================================

/**
 * Element DOM untuk ikon profil.
 * @const {HTMLElement}
 */
const profileIcon = document.querySelector('.icon-container');

/**
 * Elemen dropdown menu untuk profil.
 * Dibuat secara dinamis.
 * @const {HTMLElement}
 */
const dropdownMenu = document.createElement('div');

/**
 * Elemen pop-up untuk mengubah email.
 * @const {HTMLElement}
 */
const PopUpUbahEmail = document.getElementById('PopUpUbahEmail');

/** 
 * Tambahkan class dan styling awal untuk dropdown menu.
 */
dropdownMenu.classList.add('dropdown-custom');
dropdownMenu.style.display = 'none'; // Default: Tersembunyi
PopUpUbahEmail.style.display = 'none';

/**
 * Fungsi untuk mendekode token JWT.
 * @param {string} token - Token JWT yang akan didekode.
 * @returns {Object} - Objek hasil decoding.
 */
function decode(token) {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
}

/**
 * Isi dropdown menu dengan opsi terkait profil pengguna.
 */
dropdownMenu.innerHTML = `
    <div class="dropdown-header">
        <span class="email-label">Email :</span>
        <span id="teks_email" class="email-address">admin@gmail.com</span>
    </div>
    <div id="ubah_email_btn" class="dropdown-item">
        <img src="image/ubah email icon.svg" class="dropdown-icon" alt="Eye Icon">
        Ubah email
    </div>
    <div id="keluar_btn" class="dropdown-item">
        <img src="image/keluar icon.svg" class="dropdown-icon" alt="Logout Icon">
        Keluar
    </div>
    <div class="dropdown-item">
        <img src="image/sign out icon .svg" class="dropdown-icon" alt="Sign Out Icon">
        Sign Out
    </div>
`;

// Tambahkan dropdown menu ke dalam body dokumen
document.body.appendChild(dropdownMenu);

/**
 * Event listener untuk menampilkan atau menyembunyikan dropdown menu.
 */
profileIcon.addEventListener('click', () => {
    dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
});

/**
 * Menutup dropdown menu jika klik di luar elemen dropdown.
 */
document.addEventListener('click', (event) => {
    if (!profileIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = 'none';
    }
});

// ========================================================
// Validasi dan Pengiriman Form
// ========================================================

/**
 * Event listener untuk pengiriman form produk.
 */
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    document.querySelector('.btn-primary').addEventListener('click', async function(e) {
        e.preventDefault();
        const catName = document.getElementById('namaCat').value;
        const productName = document.getElementById('productName').value;
        const productCode = document.getElementById('productCode').value;
        const productStock = document.getElementById('productStock').value;
        const productPrice = document.getElementById('productPrice').value;
        const productDescription = document.getElementById('productDescription').value;
        const token = localStorage.getItem('authToken');
        
        // Validasi form
        if (!productName || !productCode || !productStock || !productPrice || !productDescription || !catName) {
            alert('Mohon lengkapi semua bidang!');
            return;
        }

        try {
            const res = await fetch(`http://localhost:5500/api/product/${catName}/tambahProduk`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    namaProduk: productName, 
                    id: productCode, 
                    stok: productStock, 
                    harga: productPrice, 
                    deskripsi: productDescription 
                }),
            });
            const hasil = await res.json();

            if (res.ok) {
                // Tambahkan ke riwayat lokal
                let storedRiwayat = localStorage.getItem("riwayatArray");
                storedRiwayat = storedRiwayat ? JSON.parse(storedRiwayat) : [];
                if (storedRiwayat.length > 6) {
                    storedRiwayat.shift();
                }
                const data_baru = `Produk baru: ${productName}`;
                storedRiwayat.push(data_baru);
                localStorage.setItem("riwayatArray", JSON.stringify(storedRiwayat));

                // Notifikasi sukses
                notificationIcon.src = "image/notif-produk-tambah.svg"; 
                notification.style.display = 'block'; 
                setTimeout(() => {
                    window.location.href = "category.html";
                }, 2000);
            } else {
                // Notifikasi error
                notificationIcon.src = "image/Notif kalo ada kesalahan.svg";
                notification.style.display = 'block'; 
            }

        } catch (err) {
            console.error('Error:', err);
        }
    });

    // Tombol cancel form
    const cancelButton = document.querySelector('.btn-secondary');
    cancelButton.addEventListener('click', function() {
        if (confirm('Apakah Anda yakin ingin membatalkan? Semua perubahan akan hilang.')) {
            form.reset();
        }
    });
});

// ========================================================
// Fitur Pengaturan Stok
// ========================================================

/**
 * Elemen input untuk jumlah stok produk.
 * @const {HTMLElement}
 */
const stockInput = document.getElementById('productStock');

/**
 * Tombol untuk mengurangi jumlah stok.
 * @const {HTMLElement}
 */
const minButton = document.querySelector('.btn-min-stock');

/**
 * Tombol untuk menambah jumlah stok.
 * @const {HTMLElement}
 */
const plusButton = document.querySelector('.btn-plus-stock');

/**
 * Event listener untuk mengurangi stok.
 * Stok akan berkurang 1 unit jika nilai stok saat ini lebih dari 0.
 */
minButton.addEventListener('click', () => {
    let currentValue = parseInt(stockInput.value);
    if (currentValue > 0) {
        stockInput.value = currentValue - 1;
    }
});

/**
 * Event listener untuk menambah stok.
 * Stok akan bertambah 1 unit setiap kali tombol ditekan.
 */
plusButton.addEventListener('click', () => {
    let currentValue = parseInt(stockInput.value);
    stockInput.value = currentValue + 1;
});

// ========================================================
// Fitur Pencarian Produk
// ========================================================

/**
 * Elemen input untuk pencarian produk.
 * @const {HTMLElement}
 */
const searchInput = document.querySelector('.search-input');

/**
 * Elemen notifikasi untuk produk yang tidak ditemukan.
 * @const {HTMLElement}
 */
const notFoundAlert = document.getElementById('not-found-alert');

/**
 * Fungsi untuk mencari produk dalam tabel.
 * Mencocokkan nama produk dengan input pengguna dan menampilkan hasil yang sesuai.
 */
function searchProduct() {
    const searchValue = searchInput.value.toLowerCase();

    // Jika input kosong, sembunyikan notifikasi dan tampilkan semua produk
    if (searchValue === '') {
        notFoundAlert.classList.add('d-none');
        const tableRows = document.querySelectorAll('.table tbody tr');
        tableRows.forEach(row => {
            row.style.display = ''; // Tampilkan semua produk
        });
        return;
    }

    const tableRows = document.querySelectorAll('.table tbody tr');
    let found = false;

    tableRows.forEach(row => {
        const productName = row.querySelector('td:first-child').textContent.toLowerCase();
        if (productName.includes(searchValue)) {
            row.style.display = '';
            found = true;
        } else {
            row.style.display = 'none';
        }
    });

    // Tampilkan notifikasi jika produk tidak ditemukan
    if (!found) {
        notFoundAlert.innerHTML = `
            <img src="image/Notif Tidak dapat menemukan barang.svg" alt="Not Found Icon" class="not-found-icon" width="30" height="30" id="notFoundIcon">
        `;
        notFoundAlert.classList.remove('d-none');
        document.getElementById('notFoundIcon').addEventListener('click', () => {
            notFoundAlert.classList.add('d-none');
        });
    } else {
        notFoundAlert.classList.add('d-none');
    }
}

/**
 * Event listener untuk memantau input pencarian dan memanggil fungsi `searchProduct`.
 */
searchInput.addEventListener('input', searchProduct);

// ========================================================
// Manajemen Email Pengguna
// ========================================================

/**
 * Ketika halaman dimuat, ambil email pengguna dari API menggunakan token JWT.
 */
document.addEventListener('DOMContentLoaded', async () => {
    const email_text = document.getElementById("teks_email");
    const token = localStorage.getItem('authToken');

    /**
     * Fungsi untuk mendekode token JWT.
     * @param {string} token - Token JWT yang akan didekode.
     * @returns {Object} - Objek hasil decoding.
     */
    const decodeToken = (token) => {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    };

    const { username } = decodeToken(token);
    try {
        const res = await fetch(`http://localhost:5500/api/auth/getEmail?username=${username}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const hasil = await res.json();
        if (res.ok) {
            email_text.textContent = hasil.email[0].email;
            document.getElementById('user-teks').textContent = username;
        } else {
            notificationIcon.src = "image/Notif kalo ada kesalahan.svg"; 
            notification.style.display = 'block'; 
        }
    } catch (err) {
        console.error('Error:', err.message);
    }
});

/**
 * Event listener untuk menampilkan popup ubah email.
 */
document.getElementById('ubah_email_btn').addEventListener('click', () => {
    PopUpUbahEmail.style.display = 'flex';
});

/**
 * Event listener untuk tombol batal pada popup ubah email.
 */
document.getElementById('btn_batal').addEventListener("click", function() {
    PopUpUbahEmail.style.display = "none";
});

/**
 * Event listener untuk menyimpan perubahan email pengguna.
 */
document.getElementById('btn_simpan').addEventListener("click", async () => {
    const new_email = document.getElementById('email-text').value;
    const token = localStorage.getItem('authToken');

    const decodeToken = (token) => {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    };

    const { username } = decodeToken(token);
    try {
        const res = await fetch(`http://localhost:5500/api/auth/editEmail?username=${username}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: new_email }),
        });

        const hasil = await res.json();
        if (res.ok) {
            window.location.href = "home.html";
        } else {
            notificationIcon.src = "image/Notif kalo ada kesalahan.svg"; 
            notification.style.display = 'block'; 
        }
    } catch (err) {
        console.error('Error:', err.message);
    }
});

// ========================================================
// Logout
// ========================================================

/**
 * Event listener untuk tombol keluar.
 * Menghapus token autentikasi dan riwayat, lalu mengarahkan ke halaman login.
 */
document.getElementById('keluar_btn').addEventListener('click', () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('riwayatArray');
    window.location.href = 'login.html';
});