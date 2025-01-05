/**
 * Skrip ini mengelola antarmuka pengguna untuk fitur kategori, seperti 
 * menambahkan kategori, mengedit kategori, dan menampilkan notifikasi kesalahan.
 * Selain itu, skrip ini mencakup pengelolaan dropdown profil pengguna dan autentikasi.
 */

// ========================================================
// Inisialisasi Elemen DOM
// ========================================================

/** Elemen ikon profil yang membuka dropdown menu */
const profileIcon = document.querySelector('.icon-container');

/** Elemen dropdown menu untuk profil */
const dropdownMenu = document.createElement('div');

/** Elemen popup untuk menambahkan kategori */
const tambahPopup = document.getElementById('tambahPopup');

/** Elemen popup untuk menambahkan kategori baru */
const PopupAddCat = document.getElementById('PopupAddCat');

/** Elemen popup untuk mengedit kategori */
const PopupEditCat = document.getElementById('PopupEditCat');

/** Tombol untuk menyimpan kategori */
const simpanKategori = document.getElementById('simpanKategori');

/** Tombol untuk membatalkan proses kategori */
const batalKategori = document.getElementById('batalKategori');

/** Popup untuk mengubah email */
const PopUpUbahEmail = document.getElementById('PopUpUbahEmail');

/** Elemen tabel produk */
const tabel_Produk = document.getElementById('tabel-produk');

/** Popup konfirmasi penghapusan */
const PopUpKonfirmDel = document.getElementById('PopUpKonfirmDel');

// ========================================================
// Pengaturan Dropdown Menu
// ========================================================

/** Tambahkan styling dan sembunyikan elemen popup secara default */
dropdownMenu.classList.add('dropdown-custom');
dropdownMenu.style.display = 'none';
PopupAddCat.style.display = "none";
PopupEditCat.style.display = "none";
PopUpUbahEmail.style.display = 'none';
tabel_Produk.style.display = 'none';
PopUpKonfirmDel.style.display = 'none';

/**
 * Fungsi untuk mendekode token JWT.
 * @param {string} token - Token JWT yang akan didekode.
 * @returns {Object} - Objek hasil decoding token.
 */
function decode(token) {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
}

// ========================================================
// Pengelolaan Dropdown Menu Profil
// ========================================================

/** Tambahkan opsi ke dalam dropdown menu */
dropdownMenu.innerHTML = `
    <div class="dropdown-header">
        <span class="email-label">Email :</span>
        <span id="text_email" class="email-address">admin@gmail.com</span>
    </div>
    <div id = "ubah_email_btn" class="dropdown-item">
        <img src="image/ubah email icon.svg" class="dropdown-icon" alt="Eye Icon">
        Ubah email
    </div>
    <div id="keluar_btn" class="dropdown-item">
        <img src="image/keluar icon.svg" class="dropdown-icon" alt="Logout Icon">
        Keluar
    </div>
`;

/** Tambahkan dropdown menu ke dalam dokumen */
document.body.appendChild(dropdownMenu);

/**
 * Event listener untuk menampilkan atau menyembunyikan dropdown menu saat ikon profil diklik.
 */
profileIcon.addEventListener('click', () => {
    dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
});

/**
 * Event listener untuk menutup dropdown menu jika klik di luar elemen menu.
 */
document.addEventListener('click', (event) => {
    if (!profileIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = 'none';
    }
});

const searchInput = document.querySelector('.search-input');
const notFoundAlert = document.getElementById('not-found-alert');

// ========================================================
// Fitur Tambah Kategori
// ========================================================

/** Event listener untuk membuka popup tambah kategori */
tambahPopup.addEventListener("click", function () {
    PopupAddCat.style.display = "flex";
});

/** Event listener untuk menutup popup tambah kategori */
batalKategori.addEventListener("click", function () {
    PopupAddCat.style.display = "none";
});

/**
 * Event listener untuk menyimpan kategori baru.
 * Melakukan validasi input, mengirim data ke server, dan menampilkan notifikasi.
 */
simpanKategori.addEventListener("click", async function () {
    const namaCat = document.getElementById('kategori-nama').value;
    const notification = document.getElementById('notification');
    const notificationIcon = document.getElementById('notificationIcon');
    const token = localStorage.getItem('authToken');

    // Sembunyikan notifikasi sebelumnya
    notification.style.display = 'none';

    // Validasi input
    if (namaCat === '') {
        notificationIcon.src = "image/Notif Belum Isi Semua.svg"; // Tampilkan notifikasi untuk input kosong
        notification.style.display = 'flex';
        return;
    }

    try {
        // Kirim data kategori baru ke server
        const res = await fetch('http://localhost:5500/api/category/kategori', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ namaKategori: namaCat }),
        });

        const hasil = await res.json();

        if (res.ok) {
            // Simpan data kategori baru ke dalam riwayat
            let storedRiwayat = localStorage.getItem("riwayatArray");
            storedRiwayat = storedRiwayat ? JSON.parse(storedRiwayat) : [];
            if (storedRiwayat.length > 6) {
                storedRiwayat.shift();
            }
            const data_baru = `Kategori baru: ${namaCat}`;
            storedRiwayat.push(data_baru);
            localStorage.setItem("riwayatArray", JSON.stringify(storedRiwayat));

            // Redirect ke halaman kategori
            window.location.href = 'category.html';
        } else {
            // Tangani pesan kesalahan dari server
            if (hasil.message == 'Kategori sama silahkan input kembali') {
                notificationIcon.src = "image/Notif kalo ada kesalahan.svg";
                notification.style.display = 'block';
            } else if (hasil.message === 'Kategori invalid' || hasil.message === 'Silahkan lengkapi semua bidang') {
                notificationIcon.src = "image/Notif kalo ada kesalahan.svg";
                notification.style.display = 'block';
            }
        }
        console.log('Response dari server:', hasil);

    } catch (err) {
        console.log('Error:', err);
    }
});

/**
 * Menangani DOMContentLoaded untuk mengambil data kategori dan menambahkan event listener.
 */
document.addEventListener("DOMContentLoaded", async () => {
    const categoryList = document.getElementById('categoryList');
    const token = localStorage.getItem('authToken');

    try {
        /**
         * Mengambil data kategori dari server.
         * @async
         * @function
         * @returns {Promise<Response>} Respons dari server.
         */
        const res = await fetch('http://localhost:5500/api/category/getKategori', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const hasil = await res.json();
        if (res.ok) {
            /**
             * Melakukan looping untuk setiap kategori yang diterima dari server.
             */
            for (let i = 0; i < hasil.categories.length; i++) {
                const per_kategori = `
                    <div id="list_cat" dataCat_id="${hasil.categories[i].namaCategory}" class="category-item d-flex justify-content-between align-items-center p-2 my-2 bg-white">
                        <span class="category-name">${hasil.categories[i].namaCategory}</span>
                        <div class="action-container d-flex align-items-center"> 
                            <a href="product.html" class="view-product text-decoration-none text-dark d-flex align-items-center" dataCat_id="${hasil.categories[i].namaCategory}">
                                Lihat Produk...
                            </a>
                            <img id="editCat_btn" src="image/edit_icon.svg" class="ms-2" width="25" height="25" dataCat_id="${hasil.categories[i].namaCategory}">
                            <img id="deleteCat_btn" src="image/deletecat.svg" alt="Hapus Kategori" class="ms-2" width="25" height="25" dataCat_id="${hasil.categories[i].namaCategory}">
                        </div>
                    </div>`;
                categoryList.insertAdjacentHTML("beforeend", per_kategori);

                /**
                 * Menambahkan event listener untuk tombol "Lihat Produk".
                 */
                document.querySelectorAll('.view-product').forEach(button => {
                    button.addEventListener('click', function (event) {
                        event.preventDefault();
                        const id = this.getAttribute('dataCat_id');
                        window.location.href = `product.html?category=${id}`;
                    });
                });

                /**
                 * Menambahkan event listener untuk tombol hapus kategori.
                 * @param {Event} event - Event klik pada tombol hapus.
                 */
                const deleteButton = categoryList.querySelector(`img#deleteCat_btn[dataCat_id="${hasil.categories[i].namaCategory}"]`);
                deleteButton.addEventListener("click", async (event) => {
                    PopUpKonfirmDel.style.display = 'flex';

                    document.getElementById('simpanKonfirm').addEventListener('click', async () => {
                        const id = event.target.getAttribute('dataCat_id');
                        try {
                            const res = await fetch(`http://localhost:5500/api/category/kategori/${id}`, {
                                method: 'DELETE',
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'Content-Type': 'application/json',
                                },
                            });

                            const hasil = await res.json();
                            if (res.ok) {
                                const item_cat = document.getElementById('categoryList');
                                item_cat.remove();
                                window.location.href = 'category.html';

                                /**
                                 * Menyimpan riwayat penghapusan kategori ke localStorage.
                                 */
                                let storedRiwayat = localStorage.getItem("riwayatArray");
                                storedRiwayat = storedRiwayat ? JSON.parse(storedRiwayat) : [];
                                if (storedRiwayat.length > 6) {
                                    storedRiwayat.shift();
                                }
                                const data_baru = `Kategori dihapus: ${id}`;
                                storedRiwayat.push(data_baru);
                                localStorage.setItem("riwayatArray", JSON.stringify(storedRiwayat));
                            } else {
                                console.error('Error: Tidak dapat menghapus data', hasil.message);
                            }
                        } catch (err) {
                            console.error('Error: Tidak dapat menghapus data');
                        }
                    });

                    document.getElementById('batalKonfirm').addEventListener('click', async () => {
                        PopUpKonfirmDel.style.display = 'none';
                    });
                });

                /**
                 * Menambahkan event listener untuk tombol edit kategori.
                 * @param {Event} event - Event klik pada tombol edit.
                 */
                const editCatButton = categoryList.querySelector(`img#editCat_btn[dataCat_id="${hasil.categories[i].namaCategory}"]`);
                editCatButton.addEventListener("click", (event) => {
                    id = event.target.getAttribute('dataCat_id');
                    PopupEditCat.style.display = "flex";

                    document.getElementById('batalKategori2').addEventListener("click", function () {
                        PopupEditCat.style.display = "none";
                    });

                    document.getElementById('simpanKategori2').addEventListener('click', async () => {
                        const namaCat = document.getElementById('kategori-nama2').value;
                        try {
                            const res = await fetch(`http://localhost:5500/api/category/kategori/${id}`, {
                                method: 'PUT',
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ editNama: namaCat }),
                            });

                            const hasil = await res.json();
                            if (res.ok) {
                                window.location.href = 'category.html';

                                /**
                                 * Menyimpan riwayat pengeditan kategori ke localStorage.
                                 */
                                let storedRiwayat = localStorage.getItem("riwayatArray");
                                storedRiwayat = storedRiwayat ? JSON.parse(storedRiwayat) : [];
                                if (storedRiwayat.length > 6) {
                                    storedRiwayat.shift();
                                }
                                const data_baru = `Kategori diubah: ${id} menjadi ${namaCat}`;
                                storedRiwayat.push(data_baru);
                                localStorage.setItem("riwayatArray", JSON.stringify(storedRiwayat));
                            } else {
                                console.error('Error: Tidak dapat mengubah data', hasil.message);
                            }
                        } catch (err) {
                            console.error(err.message);
                        }
                    });
                });
            }
        } else {
            console.error('Error: Tidak dapat mengambil data');
        }
    } catch (err) {
        console.log('Error:', err);
    }
});

/**
 * Event listener untuk menyembunyikan notifikasi ketika tombol "close" diklik.
 */
document.getElementById('closeNotification').addEventListener('click', function () {
    document.getElementById('notification').style.display = 'none'; // Sembunyikan notifikasi
});

/**
 * Event listener yang dijalankan saat halaman selesai dimuat.
 * Mengambil email pengguna dan menampilkan username di UI.
 */
document.addEventListener('DOMContentLoaded', async () => {
    const email_text = document.getElementById("text_email");
    const token = localStorage.getItem('authToken');

    /**
     * Mendekode token JWT.
     * @param {string} token - Token JWT.
     * @returns {Object} Data terdekode dari token.
     */
    const decodeToken = (token) => {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    };

    const { username } = decodeToken(token);
    console.log(username);
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
            console.log('Berhasil mengambil email');
        } else {
            if (hasil.message == 'Gagal mengambil email') {
                notificationIcon.src = "image/Notif kalo ada kesalahan.svg";
                notification.style.display = 'block';
            }
        }
        console.log('Response dari server:', hasil.email[0].email);
    } catch (err) {
        console.error('Error:', err.message);
    }
});

/**
 * Event listener untuk membuka popup ubah email.
 */
document.getElementById('ubah_email_btn').addEventListener('click', () => {
    PopUpUbahEmail.style.display = 'flex';
});

/**
 * Event listener untuk membatalkan perubahan email.
 */
document.getElementById('btn_batal').addEventListener("click", function () {
    PopUpUbahEmail.style.display = "none";
});

/**
 * Event listener untuk menyimpan email baru.
 * Mengirim permintaan ke server untuk memperbarui email pengguna.
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
            console.log(hasil.message);
            window.location.href = "home.html";
        } else {
            if (hasil.message == 'Gagal mengubah email' || hasil.message == 'Silahkan lengkapi semua bidang') {
                notificationIcon.src = "image/Notif kalo ada kesalahan.svg";
                notification.style.display = 'block';
            }
        }
        console.log('Response dari server:', hasil.email[0].email);
    } catch (err) {
        console.error('Error:', err.message);
    }
});

/**
 * Event listener untuk menghapus token dari localStorage dan mengarahkan pengguna ke halaman login.
 */
document.getElementById('keluar_btn').addEventListener('click', () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('riwayatArray');
    window.location.href = 'login.html';
});

/**
 * Event listener untuk mencari produk berdasarkan input pengguna.
 * Menampilkan hasil dalam tabel produk.
 */
document.getElementById('search-btn').addEventListener('click', async () => {
    const productList = document.getElementById('tableBody');
    const searchInput = document.getElementById('search-input');
    document.getElementById('main-content').style.display = 'none';
    tabel_Produk.style.display = 'flex';

    const token = localStorage.getItem('authToken');
    console.log(searchInput);

    try {
        const res = await fetch(`http://localhost:5500/api/product/getReport`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const hasil = await res.json();
        if (res.ok) {
            for (let i = 0; i < hasil.datas.length; i++) {
                if (searchInput.value.includes(hasil.datas[i].Produk)) {
                    const per_product = `
                    <td>${hasil.datas[i].Produk}</td>
                    <td>${hasil.datas[i].ID}</td>
                    <td>${hasil.datas[i].Stok}</td>
                    <td>${hasil.datas[i].harga}</td>`;
                    productList.insertAdjacentHTML("beforeend", per_product);
                }
            }
        } else {
            console.error('Error: Tidak dapat mengambil data');
        }
    } catch (error) {
        console.error(error.message);
    }
});
