const profileIcon = document.querySelector('.icon-container');
const dropdownMenu = document.createElement('div');
const PopUpUbahEmail = document.getElementById('PopUpUbahEmail');
const tabel_Produk = document.getElementById('tabel-produk');
const PopUpKomentar = document.getElementById('Pop-Komentar');
const PopupAddCat = document.getElementById('PopupAddCat');
const simpanKategori = document.getElementById('simpanKategori');
const batalKategori = document.getElementById('batalKategori');

// Tambahkan class dan styling untuk dropdown menu
dropdownMenu.classList.add('dropdown-custom');
dropdownMenu.style.display = 'none'; // Sembunyikan menu secara default
PopUpUbahEmail.style.display='none';
tabel_Produk.style.display='none';
PopUpKomentar.style.display='none';
PopupAddCat.style.display = "none";

// Tambahkan opsi sesuai gambar
dropdownMenu.innerHTML = `
    <div class="dropdown-header">
        <span class="email-label">Email :</span>
        <span id="text_email" class="email-address">admin@gmail.com</span>
    </div>
    <div id="ubah_email_btn" class="dropdown-item">
        <img src="image/ubah email icon.svg" class="dropdown-icon" alt="Eye Icon">
        Ubah email
    </div>
    <div id="keluar_btn" class="dropdown-item">
        <img src="image/keluar icon.svg" class="dropdown-icon" alt="Logout Icon">
        Keluar
    </div>
`;

/**
 * Fungsi untuk mendekode token JWT.
 * @param {string} token - Token JWT.
 * @returns {Object} Payload dari token JWT.
 */
function decode(token) {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
}

// Tambahkan dropdown ke dalam body
document.body.appendChild(dropdownMenu);

/**
 * Menampilkan atau menyembunyikan dropdown menu ketika ikon profil diklik.
 */
profileIcon.addEventListener('click', () => {
    dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
});

/**
 * Menutup dropdown menu jika pengguna mengklik di luar menu.
 */
document.addEventListener('click', (event) => {
    if (!profileIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = 'none';
    }
});

const searchInput = document.querySelector('.search-input');
const notFoundAlert = document.getElementById('not-found-alert');

/**
 * Fungsi untuk mencari produk dalam tabel berdasarkan nama produk.
 */
function searchProduct() {
    const searchValue = searchInput.value.toLowerCase();
    const tableRows = document.querySelectorAll('.table tbody tr'); // Ambil semua baris produk dari tabel
    let found = false;

    // Jika input kosong, sembunyikan notifikasi dan tampilkan semua produk
    if (searchValue === '') {
        notFoundAlert.classList.add('d-none');
        tableRows.forEach(row => {
            row.style.display = ''; // Tampilkan semua produk
        });
        return;
    }

    // Looping melalui setiap baris produk di tabel
    tableRows.forEach(row => {
        const productNameCell = row.querySelector('td:first-child'); // Ambil sel produk di kolom pertama
        if (productNameCell) {
            const productName = productNameCell.textContent.toLowerCase();
            if (productName.includes(searchValue)) {
                row.style.display = ''; // Tampilkan baris yang cocok
                found = true;
            } else {
                row.style.display = 'none'; // Sembunyikan baris yang tidak cocok
            }
        }
    });

    // Tampilkan ikon notifikasi jika produk tidak ditemukan
    if (!found) {
        notFoundAlert.innerHTML = `
            <img src="image/Notif Tidak dapat menemukan barang.svg" alt="Not Found Icon" class="not-found-icon" width="30" height="30" id="notFoundIcon">
        `;
        notFoundAlert.classList.remove('d-none');
        
        // Tambahkan event listener ke ikon untuk menutup notifikasi saat diklik
        document.getElementById('notFoundIcon').addEventListener('click', () => {
            notFoundAlert.classList.add('d-none');
        });
    } else {
        notFoundAlert.classList.add('d-none'); // Sembunyikan notifikasi jika produk ditemukan
    }
}

/**
 * Mengambil email pengguna dan menampilkannya di UI.
 */
document.addEventListener('DOMContentLoaded', async () => {
    const email_text = document.getElementById("text_email");
    const token = localStorage.getItem('authToken');
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
            email_text.textContent=hasil.email[0].email;
            document.getElementById('user-teks').textContent=username;
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
})

/**
 * Menampilkan popup ubah email ketika tombol "Ubah Email" diklik.
 */
document.getElementById('ubah_email_btn').addEventListener('click', () => {
    PopUpUbahEmail.style.display='flex';
})

/**
 * Menyembunyikan popup ubah email ketika tombol "Batal" diklik.
 */
document.getElementById('btn_batal').addEventListener("click", function() {
    PopUpUbahEmail.style.display = "none";
})

/**
 * Mengirim permintaan untuk mengubah email pengguna.
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
           window.location.href="home.html";
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
})

/**
 * Menghapus token autentikasi dan mengarahkan ke halaman login ketika tombol "Keluar" diklik.
 */
document.getElementById('keluar_btn').addEventListener('click', () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('riwayatArray');
    window.location.href='login.html';
})

/**
 * Fungsi untuk mencari produk berdasarkan input pencarian.
 */
document.getElementById('search-btn').addEventListener('click', async () => {
    const productList = document.getElementById('tableBody');
    const searchInput = document.getElementById('search-input');
    (document.getElementById('main-content1')).style.display='none';
    document.getElementById('main-content2').style.display='none';
    document.getElementById('main-content3').style.display='none';
    document.getElementById('main-content4').style.display='none';

    tabel_Produk.style.display='flex';
    const token = localStorage.getItem('authToken');

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
            for (let i=0; i<hasil.datas.length;i++) {
                if (searchInput.value.includes(hasil.datas[i].Produk)) {
                    const per_product = 
                    `<td>${hasil.datas[i].Produk}</td>
                    <td>${hasil.datas[i].ID}</td>
                    <td>${hasil.datas[i].Stok}</td>
                    <td>${hasil.datas[i].harga}</td>`;
                    productList.insertAdjacentHTML("beforeend", per_product);
                }
            } 

        } else {
            console.error('Error: Tidak dapat mengambil data')
        }
    } catch (error) {
        console.error(error.message);
    }
})

/**
 * Mengambil produk dengan stok di bawah 10 dan menampilkannya di UI.
 */
async function ambilProduk() {
    const cek_list = document.getElementById('stok-list');
    const token = localStorage.getItem('authToken');

    try {
        const res = await fetch(`http://localhost:5500/api/product/getReport`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const hasil = await res.json();
        let stop = 0;

        if (res.ok) {
            for (let i=0; i<hasil.datas.length && stop<3 ;i++) {
                if (hasil.datas[i].Stok<10) {
                    const per_product = 
                    `<li class="stok-item">${hasil.datas[i].Produk}</li>`;
                    cek_list.insertAdjacentHTML("beforeend", per_product);
                    stop++
                }
            } 

        } else {
            console.error('Error: Tidak dapat mengambil data')
        }
    } catch (error) {
        console.error(error.message);
    }
}

/**
 * Mengambil data catatan produk yang memiliki atribut `Cek` tidak null.
 * Data ditampilkan di elemen HTML dengan ID `catatan-list`.
 * @async
 * @function ambilCatatan
 */
async function ambilCatatan() {
    const catatan_list = document.getElementById('catatan-list');
    const token = localStorage.getItem('authToken');

    try {
        const res = await fetch(`http://localhost:5500/api/product/getReport`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const hasil = await res.json();
        let stop = 0;

        if (res.ok) {
            for (let i=0; i<hasil.datas.length && stop<2 ;i++) {
                if (hasil.datas[i].Cek!==null && hasil.datas[i].Cek!=="null") {
                    const per_product = 
                    `<li class="riwayat-item">${hasil.datas[i].Produk} - ${hasil.datas[i].Cek}</li>`;
                    catatan_list.insertAdjacentHTML("beforeend", per_product);
                    stop++;
                }
            } 

        } else {
            console.error('Error: Tidak dapat mengambil data')
        }
    } catch (error) {
        console.error(error.message);
    }
}

/**
 * Event listener yang dijalankan saat DOM telah dimuat.
 * Mengambil data produk, catatan, dan riwayat dari `localStorage` dan menampilkannya di UI.
 */
document.addEventListener('DOMContentLoaded', async () => {
    await ambilProduk();
    await ambilCatatan();
    let stop = 0;
    const riwayatData = document.getElementById('riwayat_list');
    const riwayatList = localStorage.getItem("riwayatArray");
    let parse_riwayatList = riwayatList ? JSON.parse(riwayatList) : [];
    console.log(parse_riwayatList);
    for (let i=riwayatList.length; i>0 && stop<4 ;i--) {
        if (parse_riwayatList[i]!=undefined) {
            const per_riwayat = 
            `<li class="riwayat-item">${parse_riwayatList[i]}</li>`;
            stop++;
            riwayatData.insertAdjacentHTML("beforeend", per_riwayat);
        }
    } 
});

/**
 * Menutup popup untuk menambahkan kategori.
 * Event listener untuk tombol batal.
 */
batalKategori.addEventListener("click", function() {
    PopupAddCat.style.display = "none";
})

/**
 * Menyimpan kategori baru ke database.
 * Data kategori diambil dari input dengan ID `kategori-nama`.
 * @async
 * @function simpanKategori
 */
simpanKategori.addEventListener("click", async function() {
    const namaCat = document.getElementById('kategori-nama').value;
    const notification = document.getElementById('notification');
    const notificationIcon = document.getElementById('notificationIcon');
    const token = localStorage.getItem('authToken');
    // Clear previous error message
    notification.style.display = 'none';

    if (namaCat==='') {
        // Tampilkan ikon notifikasi untuk bidang kosong
        notificationIcon.src = "image/Notif Belum Isi Semua.svg"; // Path untuk ikon bidang kosong
        notification.style.display = 'flex';
        return;
    }

    try {
        const res = await fetch('http://localhost:5500/api/category/kategori', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ namaKategori: namaCat }),
        });

        const hasil = await res.json();
        console.log(hasil);
        if (res.ok) {
            
            window.location.href = 'category.html'; 
        } else {
            if (hasil.message == 'Kategori sama silahkan input kembali') {
                notificationIcon.src = "image/Notif kalo ada kesalahan.svg"; 
                console.log("Kategori error icon set:", notificationIcon.src); // Log path for debugging
                notification.style.display = 'block'; // Display notification
            } else if (hasil.message === 'Kategori invalid') {
               notificationIcon.src = "image/Notif kalo ada kesalahan.svg";
               console.log("Kategori error icon set:", notificationIcon.src); // Log path for debugging
               notification.style.display = 'block';
            } else if (hasil.message === 'Silahkan lengkapi semua bidang') {
                notificationIcon.src = "image/Notif kalo ada kesalahan.svg";
                console.log("Kategori error icon set:", notificationIcon.src); // Log path for debugging
                notification.style.display = 'block';
             }
        }

        console.log('Response dari server:', hasil);

    } catch (err) {
        console.log('Error:', err);
    }
})

/**
 * Menampilkan popup untuk menambahkan kategori baru.
 */
document.getElementById('tambah_kategori').addEventListener('click', () => {
    PopupAddCat.style.display = "flex";
})
