const profileIcon = document.querySelector('.icon-container');
const dropdownMenu = document.createElement('div');
const PopUpUbahEmail = document.getElementById('PopUpUbahEmail');
const tabel_Produk = document.getElementById('tabel-produk');

// Tambahkan class dan styling untuk dropdown menu
dropdownMenu.classList.add('dropdown-custom');
dropdownMenu.style.display = 'none'; // Sembunyikan menu secara default
PopUpUbahEmail.style.display='none';
tabel_Produk.style.display='none';

function decode(token) {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
}

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

document.getElementById('laporan_btn').addEventListener('click', async () => {
    const token = localStorage.getItem('authToken');
    const notification = document.getElementById('notification');
    const notificationIcon = document.getElementById('notificationIcon');

    notification.style.display = 'none';
    
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

            notificationIcon.src = "image/notif-report.svg";  
            notification.style.display = 'block'; 

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

document.getElementById('closeNotification').addEventListener('click', function() {
    document.getElementById('notification').style.display = 'none'; // Hide notification
});

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
    localStorage.removeItem('riwayatArray');
    window.location.href='login.html';
})

document.getElementById('search-btn').addEventListener('click', async () => {
    const productList = document.getElementById('tableBody');
    const searchInput = document.getElementById('search-input');
    (document.getElementById('main-content_laporan1')).style.display='none';
    (document.getElementById('main-content_laporan2')).style.display='none';

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

async function ambilProdukLaris() {
    let produk_laris= document.getElementById('produk-laris-list');
    const token = localStorage.getItem('authToken');

    try {
        const res = await fetch(`http://localhost:5500/api/product/getOldData`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const hasil = await res.json();
        let stop = 0;

        if (res.ok) {
            let stok_sort_desc = hasil.datas.slice().sort((x, y) => y.Stok - x.Stok);
            let hariIni = new Date();
            const tahunIni = hariIni.getFullYear();
            const bulanIni = hariIni.getMonth()-2;
            stok_sort_desc = stok_sort_desc.filter(produk => {
                let tanggalProduk = new Date(produk.tanggal_habis);
                let tahunProduk = tanggalProduk.getFullYear();
                let bulanProduk = tanggalProduk.getMonth()

                if (bulanIni===0) {
                    return tahunProduk === tahunIni-1 && bulanProduk === 11;
                } else {
                    return tahunProduk === tahunIni && bulanProduk === bulanIni-1;
                }
            });

            for (let i=0; i<stok_sort_desc.length && stop<10 ;i++) {
                if (stok_sort_desc[i].IDProduk!==null) {
                    const per_product = 
                    `<li class="riwayat-item">${stok_sort_desc[i].IDProduk}</li>`;
                    produk_laris.insertAdjacentHTML("beforeend", per_product);
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

async function ambilProdukTidakLaris() {
    let produk_tidaklaris= document.getElementById('produk-tidaklaris-list');
    const token = localStorage.getItem('authToken');

    try {
        const res = await fetch(`http://localhost:5500/api/product/getOldData`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const hasil = await res.json();
        let stop = 0;

        if (res.ok) {
            let stok_sort_asc = hasil.datas.slice().sort((x, y) => x.Stok - y.Stok);
            let hariIni = new Date();
            const tahunIni = hariIni.getFullYear();
            const bulanIni = hariIni.getMonth()-2;
            stok_sort_asc = stok_sort_asc.filter(produk => {
                let tanggalProduk = new Date(produk.tanggal_habis);
                let tahunProduk = tanggalProduk.getFullYear();
                let bulanProduk = tanggalProduk.getMonth()

                if (bulanIni===0) {
                    return tahunProduk === tahunIni-1 && bulanProduk === 11;
                } else {
                    return tahunProduk === tahunIni && bulanProduk === bulanIni-1;
                }
            });

            for (let i=0; i<stok_sort_asc.length && stop<10 ;i++) {
                if (stok_sort_asc[i].IDProduk!==null) {
                    const per_product = 
                    `<li class="riwayat-item2">${stok_sort_asc[i].IDProduk}</li>`;
                    produk_tidaklaris.insertAdjacentHTML("beforeend", per_product);
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

async function ambilLaporan() {
    let teks_total_penjualan = document.getElementById('totalPenj-teks');
    const token = localStorage.getItem('authToken');

    try {
        const res = await fetch(`http://localhost:5500/api/product/getOldData`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const hasil = await res.json();

        if (res.ok) {
            let penjualan = hasil.datas;
            let hariIni = new Date();
            const tahunIni = hariIni.getFullYear();
            const bulanIni = hariIni.getMonth()-2;
            penjualan = penjualan.filter(produk => {
                let tanggalProduk = new Date(produk.tanggal_habis);
                let tahunProduk = tanggalProduk.getFullYear();
                let bulanProduk = tanggalProduk.getMonth()

                if (bulanIni===0) {
                    return tahunProduk === tahunIni-1 && bulanProduk === 11;
                } else {
                    return tahunProduk === tahunIni && bulanProduk === bulanIni-1;
                }
            });
            let totalPenjualan = 0;
            for (let i=0; i<penjualan.length ;i++) {
               totalPenjualan=totalPenjualan+penjualan[i].Harga*penjualan[i].Stok;
            } 
            teks_total_penjualan.innerText=`Rp${totalPenjualan.toLocaleString()},-`;
        } else {
            console.error('Error: Tidak dapat mengambil data')
        }
    } catch (error) {
        console.error(error.message);
    }
}

async function ambilGraf() {
    const chart = document.getElementById('graf').getContext('2d');
    const token = localStorage.getItem('authToken');

    try {
        const res = await fetch(`http://localhost:5500/api/product/getOldData`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const hasil = await res.json();

        if (res.ok) {
            let penjualan = hasil.datas;
            let hariIni = new Date();
            const tahunIni = hariIni.getFullYear();
            const bulanIni = hariIni.getMonth()-2;
            penjualan = penjualan.filter(produk => {
                let tanggalProduk = new Date(produk.tanggal_habis);
                let tahunProduk = tanggalProduk.getFullYear();
                let bulanProduk = tanggalProduk.getMonth()

                if (bulanIni===0) {
                    return tahunProduk === tahunIni-1 && bulanProduk === 11;
                } else {
                    return tahunProduk === tahunIni && bulanProduk === bulanIni-1;
                }
            });

            const list_idprod = penjualan.map(produk => produk.IDProduk);
            const list_penjualan = penjualan.map(produk => produk.Stok*produk.Harga);

            const graf_penjualan = new Chart(chart, {
                type: 'bar', 
                data: {
                    labels: list_idprod, 
                    datasets: [{
                        label: 'Pendapatan Bulan Lalu',
                        data: list_penjualan, 
                        backgroundColor: '#EA8D45',
                        borderColor: '#EA8D45',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            return graf_penjualan;
        } else {
            console.error('Error: Tidak dapat mengambil data')
        }
    } catch (error) {
        console.error(error.message);
    }
}

let hariIni = new Date();
const bulanIni = hariIni.getMonth()-2; 
const namaBulan = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

document.getElementById('judul-total-penjualan').innerText = `Total Penjualan ${namaBulan[bulanIni]}`;

document.addEventListener('DOMContentLoaded', async () => {
    await ambilCatatan();
    await ambilProdukLaris();
    await ambilProdukTidakLaris();
    await ambilLaporan();
    await ambilGraf();
})

