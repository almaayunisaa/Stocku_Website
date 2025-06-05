const profileIcon = document.querySelector('.icon-container');
const dropdownMenu = document.createElement('div');
const PopUpUbahEmail = document.getElementById('PopUpUbahEmail');

// Tambahkan class dan styling untuk dropdown menu
dropdownMenu.classList.add('dropdown-custom');
dropdownMenu.style.display = 'none'; // Sembunyikan menu secara default
PopUpUbahEmail.style.display='none';

function decode(token) {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
}

// Tambahkan opsi sesuai gambar
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

// Tambahkan dropdown ke dalam body
document.body.appendChild(dropdownMenu);

// Fungsi toggle menu dropdown
profileIcon.addEventListener('click', () => {
    dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
});

// Menutup dropdown jika klik di luar menu
document.addEventListener('click', (event) => {
    if (!profileIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = 'none';
    }
});

// Form validation and submission
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
        console.log(productStock, productPrice);
        if (productName.value === '' || productCode.value === '' || productStock.value === '' || productPrice.value === '' || productDescription.value === '' || catName.value === '') {
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
                body: JSON.stringify({ namaProduk:productName, id:productCode, stok:productStock, harga:productPrice, deskripsi:productDescription }),
            });
    
            const hasil = await res.json();
            console.log(hasil)
            if (res.ok) {
                let storedRiwayat = localStorage.getItem("riwayatArray");
                storedRiwayat = storedRiwayat ? JSON.parse(storedRiwayat) : [];
                if (storedRiwayat.length>6) {
                    storedRiwayat.shift();
                }
                const data_baru = `Produk baru: ${productName}`;
                storedRiwayat.push(data_baru);
                localStorage.setItem("riwayatArray", JSON.stringify(storedRiwayat));
                notificationIcon.src = "image/notif-produk-tambah.svg"; 
                notification.style.display = 'block'; 
                setTimeout(() => {
                    window.location.href = "category.html";
                }, 2000);
            } else {
                if (hasil.message == 'Stok dan harga harus berupa angka' || hasil.message == 'ID sudah digunakan') {
                    notificationIcon.src = "image/Notif kalo ada kesalahan.svg"; 
                    console.log("Kategori error icon set:", notificationIcon.src); // Log path for debugging
                    notification.style.display = 'block'; // Display notification
                } else if (hasil.message === 'Kategori tidak ada') {
                   notificationIcon.src = "image/Notif kalo ada kesalahan.svg";
                   console.log("Kategori error icon set:", notificationIcon.src); // Log path for debugging
                   notification.style.display = 'block';
                } else if (hasil.message === 'Barang gagal ditambahkan') {
                    notificationIcon.src = "image/Notif kalo ada kesalahan.svg";
                    console.log("Kategori error icon set:", notificationIcon.src); // Log path for debugging
                    notification.style.display = 'block';
                 }
            }

            console.log('Response dari server:', hasil);
            form.reset(); 
        } catch (err) {
            console.error('Error:', err);
        }
    });

    // Optional: Add functionality for 'Cancel' button
    const cancelButton = document.querySelector('.btn-secondary');
    cancelButton.addEventListener('click', function() {
        if (confirm('Apakah Anda yakin ingin membatalkan? Semua perubahan akan hilang.')) {
            form.reset(); // Reset the form fields
        }
    });
});

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

// Fungsi untuk mencari produk dalam tabel
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
        notFoundAlert.classList.add('d-none');
    }
}

// Event listener untuk pencarian saat pengguna mengetik
searchInput.addEventListener('input', searchProduct);

document.addEventListener('DOMContentLoaded', async () => {
    const email_text = document.getElementById("teks_email");
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

document.getElementById('ubah_email_btn').addEventListener('click', () => {
    PopUpUbahEmail.style.display='flex';
})

document.getElementById('btn_batal').addEventListener("click", function() {
    PopUpUbahEmail.style.display = "none";
})

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
})

document.getElementById('keluar_btn').addEventListener('click', () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('riwayatArray');
    window.location.href='login.html';
})

