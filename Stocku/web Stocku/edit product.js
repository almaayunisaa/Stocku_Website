/**
 * Menampilkan atau menyembunyikan dropdown menu saat ikon profil diklik.
 */
const profileIcon = document.querySelector('.icon-container');
const dropdownMenu = document.createElement('div');
const PopUpUbahEmail = document.getElementById('PopUpUbahEmail');
const PopUpKonfirmDel = document.getElementById('PopUpKonfirmDel');

// Tambahkan class dan styling untuk dropdown menu
dropdownMenu.classList.add('dropdown-custom');
dropdownMenu.style.display = 'none'; // Sembunyikan menu secara default
PopUpUbahEmail.style.display='none';
PopUpKonfirmDel.style.display='none';

function decode(token) {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
}

/**
 * Mengambil parameter dari URL.
 * @param {string} param - Nama parameter yang ingin diambil.
 * @returns {string|null} Nilai parameter atau null jika tidak ditemukan.
 */
function getProduct(param) {
    const url = new URLSearchParams(window.location.search);
    return url.get(param);
}
const product = getProduct('product');

/**
 * Mengambil data produk dari server berdasarkan nama produk.
 * @param {string} product - Nama produk yang ingin diambil.
 * @returns {Promise<Object>} Data produk yang diperoleh dari server.
 */
async function ambilDataProduk(product) {
    const token = localStorage.getItem('authToken');
    try {
        const res = await fetch(`http://localhost:5500/api/product/getProductNama?produk=${product}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const hasil = await res.json();
        return hasil;
    } catch (err) {
        console.log('Error:', err);
    }
}

/**
 * Menampilkan data produk ke form setelah data diambil.
 */
const objek = ambilDataProduk(product);
objek
  .then((result) => {
    const data = result.products[0];
    document.getElementById('namaCat').value = data.namaCategory;
    document.getElementById('productName').value = data.Produk;
    document.getElementById('productCode').value = data.ID;
    document.getElementById('productStock').value = data.Stok;
    document.getElementById('productPrice').value = data.harga;
    document.getElementById('productDescription').value = data.deskripsi;

    cat_bfr=data.namaCategory; 
    namaProd_bfr =data.Produk;
    id_bfr = data.ID;
    stok_bfr = data.Stok;
    harga_bfr = data.harga;
    des_bfr = data.deskripsi;
  })
  .catch((error) => {
    console.error("Error:", error);
  });

/**
 * Tambahkan elemen dropdown ke dalam DOM.
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
`;


document.body.appendChild(dropdownMenu);


profileIcon.addEventListener('click', () => {
    dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
});

/**
 * Menutup dropdown.
 */
document.addEventListener('click', (event) => {
    if (!profileIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = 'none';
    }
});

/**
 * Event listener untuk validasi dan pengiriman formulir.
 */
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const productName = document.getElementById('productName');
    const productCode = document.getElementById('productCode');
    const productStock = document.getElementById('productStock');
    const productPrice = document.getElementById('productPrice');
    const productDescription = document.getElementById('productDescription');

    /**
     * Validasi formulir sebelum disimpan.
     * @param {Event} e - Objek event.
     */
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent form submission for now

        // Simple validation
        if (productName.value === '' || productCode.value === '' || productStock.value === '' || productPrice.value === '' || productDescription.value === '') {
            alert('Mohon lengkapi semua bidang!');
            return;
        }

        // Simulate saving data
        alert('Data produk berhasil disimpan!');
        form.reset(); // Reset the form fields
    });

    /**
     * Fungsi untuk membatalkan perubahan dan mereset formulir.
     */
    const cancelButton = document.querySelector('.btn-secondary');
    cancelButton.addEventListener('click', function() {
        if (confirm('Apakah Anda yakin ingin membatalkan? Semua perubahan akan hilang.')) {
            form.reset(); // Reset the form fields
        }
    });
});

/**
 * Menangani pengurangan dan penambahan stok produk.
 */
const stockInput = document.getElementById('productStock');
const minButton = document.querySelector('.btn-min-stock');
const plusButton = document.querySelector('.btn-plus-stock');

minButton.addEventListener('click', () => {
    let currentValue = parseInt(stockInput.value);
    if (currentValue > 0) {
        stockInput.value = currentValue - 1;
    }
});

plusButton.addEventListener('click', () => {
    let currentValue = parseInt(stockInput.value);
    stockInput.value = currentValue + 1;
});

const searchInput = document.querySelector('.search-input');
const notFoundAlert = document.getElementById('not-found-alert');

/**
 * Fungsi pencarian produk di dalam tabel.
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
        notFoundAlert.classList.remove('d-none');
        
        // Tambahkan event listener ke ikon untuk menutup notifikasi saat diklik
        document.getElementById('notFoundIcon').addEventListener('click', () => {
            notFoundAlert.classList.add('d-none');
        });
    } else {
        notFoundAlert.classList.add('d-none'); // Sembunyikan notifikasi jika produk ditemukan
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    /**
     * Menyimpan data produk dengan mengirimkan permintaan PATCH ke server.
     * @param {Event} e - Objek event.
     */
    document.querySelector('.btn-primary').addEventListener('click', async function(e) {
        e.preventDefault();
        const namaProd_now = document.getElementById('productName').value;
        const stok_now = document.getElementById('productStock').value;
        const harga_now = document.getElementById('productPrice').value;
        const des_now = document.getElementById('productDescription').value;
        const token = localStorage.getItem('authToken');

        if (stokNotStonk(stok_bfr, stok_now)) {
            const selisih = stok_bfr-stok_now;
            updateSelisih(selisih);
        }

        try {
            const res = await fetch(`http://localhost:5500/api/product/editProduk/${product}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ namaProduk:namaProd_now,stok:stok_now, harga:harga_now, deskripsi:des_now }),
            });
    
            const hasil = await res.json();
            console.log(hasil)
            if (res.ok) {
                let storedRiwayat = localStorage.getItem("riwayatArray");
                storedRiwayat = storedRiwayat ? JSON.parse(storedRiwayat) : [];
                console.log(storedRiwayat);
                if (storedRiwayat.length > 6) {
                    storedRiwayat.shift();
                }
                const data_baru = `Produk diubah: ${namaProd_now}`;
                storedRiwayat.push(data_baru);
                localStorage.setItem("riwayatArray", JSON.stringify(storedRiwayat));

                notificationIcon.src = "image/notif-produk-edit.svg"; 
                notification.style.display = 'block'; 
                setTimeout(() => {
                    window.location.href = "category.html";
                }, 2000);

            } else {
                if (hasil.message == 'Produk Tidak Valid' || hasil.message == 'Silahkan lengkapi semua bidang' || hasil.message == 'Stok atau harga harus berupa angka') {
                    notificationIcon.src = "image/Notif kalo ada kesalahan.svg"; 
                    console.log("Kategori error icon set:", notificationIcon.src); // Log path for debugging
                    notification.style.display = 'block'; // Display notification
                }
            }

            console.log('Response dari server:', hasil);
            form.reset(); 
        } catch (err) {
            console.error('Error:', err);
        }
    });

    
    const cancelButton = document.querySelector('.btn-secondary');
    cancelButton.addEventListener('click', function() {
        if (confirm('Apakah Anda yakin ingin membatalkan? Semua perubahan akan hilang.')) {
            form.reset(); // Reset the form fields
        }
    });
});

// Event listener to hide the notification when the close button is clicked
document.getElementById('closeNotification').addEventListener('click', function() {
    document.getElementById('notification').style.display = 'none'; // Hide notification
});

/**
* Menghapus produk dengan permintaan DELETE ke server.
*/
document.getElementById('btn_hapus_produk').addEventListener('click', async () => {
    console.log("test");
    const token = localStorage.getItem('authToken');
    PopUpKonfirmDel.style.display='flex';
    console.log('Token:', token);
    document.getElementById('simpanKonfirm').addEventListener('click', async () => {
        try {
            const res = await fetch(`http://localhost:5500/api/product/hapusProduk/${product}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
    
            const hasil = await res.json();
            if (res.ok) {
                
                let storedRiwayat = localStorage.getItem("riwayatArray");
                storedRiwayat = storedRiwayat ? JSON.parse(storedRiwayat) : [];
                if (storedRiwayat.length>6) {
                    storedRiwayat.shift();
                }
                const data_baru = [`Produk dihapus: ${product}`];
                storedRiwayat.push(data_baru);
                localStorage.setItem("riwayatArray", JSON.stringify(storedRiwayat));
            }
            window.location.href='category.html';
            console.log('Response dari server:', hasil);
            return hasil;
        } catch (err) {
            console.log('Error:', err);
        }
    })

    document.getElementById('batalKonfirm').addEventListener('click', async () => {
        PopUpKonfirmDel.style.display='none';
    })

})

/**
 * Validasi apakah stok sebelumnya lebih besar dari stok sekarang.
 * @param {number} stok_bfr - Stok sebelumnya.
 * @param {number} stok_now - Stok sekarang.
 * @returns {boolean} True jika stok sebelumnya lebih besar.
 */
function stokNotStonk(stok_bfr, stok_now) {
    return stok_bfr>stok_now;
}

/**
 * Menyimpan perbedaan stok ke dalam localStorage.
 * @param {number} selisih - Selisih stok.
 */
function updateSelisih(selisih) {
    let total = parseInt(localStorage.getItem("totalSelisih")) || 0;
    total = total +selisih;
    localStorage.setItem("totalSelisih", total);
}

/**
 * Fungsi yang dijalankan saat halaman selesai dimuat untuk mengambil email pengguna dan menampilkan di UI.
 */
document.addEventListener('DOMContentLoaded', async () => {
    const email_text = document.getElementById("teks_email");
    const token = localStorage.getItem('authToken');
     
    /**
     * Mendekode token JWT untuk mendapatkan payload.
     * @param {string} token - Token JWT yang akan didekode.
     * @returns {Object} Payload dari token JWT.
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
 * Event listener untuk tombol "Ubah Email". Menampilkan pop-up form ubah email.
 */
document.getElementById('ubah_email_btn').addEventListener('click', () => {
    PopUpUbahEmail.style.display='flex';
})

/**
 * Event listener untuk tombol "Batal" di pop-up ubah email. Menyembunyikan pop-up.
 */
document.getElementById('btn_batal').addEventListener("click", function() {
    PopUpUbahEmail.style.display = "none";
})

/**
 * Event listener untuk tombol "Simpan" di pop-up ubah email.
 * Mengirim permintaan POST untuk memperbarui email pengguna.
 */
document.getElementById('btn_simpan').addEventListener("click", async () => {
    const new_email = document.getElementById('email-text').value;
    const token = localStorage.getItem('authToken');
    
    /**
     * Mendekode token JWT untuk mendapatkan payload.
     * @param {string} token - Token JWT yang akan didekode.
     * @returns {Object} Payload dari token JWT.
     */
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
 * Event listener untuk tombol "Keluar". Menghapus token dan riwayat, lalu mengarahkan ke halaman login.
 */
document.getElementById('keluar_btn').addEventListener('click', () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('riwayatArray');
    window.location.href='login.html';
})
