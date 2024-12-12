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
        <span class="email-address">admin@gmail.com</span>
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

const searchInput = document.querySelector('.search-input');
const notFoundAlert = document.getElementById('not-found-alert');

// Fungsi untuk mencari produk dalam tabel berdasarkan list produk yang ada di tabel halaman product.html
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

// Event listener untuk pencarian saat pengguna mengetik
searchInput.addEventListener('input', searchProduct);

document.getElementById('laporan_btn').addEventListener('click', async () => {
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
            data = hasil.datas;
            const ws = XLSX.utils.json_to_sheet(data);

            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Sheet1"); 
            XLSX.writeFile(wb, "laporan.xlsx");
        } else {
            console.error('Error: Tidak dapat mengambil data')
        }
    } catch (error) {
        console.error(error.message);
    }
})

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

document.getElementById('keluar_btn').addEventListener('click', () => {
    localStorage.removeItem('authToken');
    window.location.href='login.html';
})
