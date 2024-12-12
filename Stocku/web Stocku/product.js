const profileIcon = document.querySelector('.icon-container');
const dropdownMenu = document.createElement('div');
const pop_up_komentar = document.getElementById('Pop-Komentar')
const notification = document.getElementById('notification');
const notificationIcon = document.getElementById('notificationIcon');
const PopUpUbahEmail = document.getElementById('PopUpUbahEmail');

// Tambahkan class dan styling untuk dropdown menu
dropdownMenu.classList.add('dropdown-custom');
dropdownMenu.style.display = 'none'; // Sembunyikan menu secara default
pop_up_komentar.style.display='none';
notification.style.display = 'none';

PopUpUbahEmail.style.display='none';

function decode(token) {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
}

function getCategory(param) {
    const url = new URLSearchParams(window.location.search);
    return url.get(param);
}

const kategori = getCategory('category');

if (kategori) {
    document.querySelector('.dashboard-title').textContent = `Produk/${kategori}`
} else {
    console.error('Kategori tidak ada')
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
// Tangkap semua tombol "UBAH"
const ubahButtons = document.querySelectorAll('.ubah-button');

// Tambahkan event listener untuk setiap tombol "UBAH"
ubahButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Arahkan ke halaman edit product.html saat tombol "UBAH" diklik
        window.location.href = 'edit product.html';
    });
});

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

async function ambilProduk(category) {
    const productList = document.getElementById('tableBody');
    const token = localStorage.getItem('authToken');

    try {
        const res = await fetch(`http://localhost:5500/api/product/${category}/getProduct`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const hasil = await res.json();

        if (res.ok) {
            for (let i=0; i<hasil.products.length;i++) {
                let image;
                if (hasil.products[i].Stok<=10) {
                    image = "image/indikator merah.svg";
                } else {
                    image = "image/indikator ijo.svg";
                }
                const date_prediksi = await prediksiTanggal(hasil.products[i].ID);
                const per_product = 
                `<td>${hasil.products[i].Produk}</td>
                <td>${hasil.products[i].ID}</td>
                <td>${hasil.products[i].Stok}</td>
                <td><img src="${image}"></td>
                <td><button id="button_edit_prod" prod_id= ${hasil.products[i].ID} class="btn btn-link ubah-button">UBAH</button></td>
                <td><img id = "komentar_btn" prod_id= ${hasil.products[i].ID} class="komentar_class" src="image/check icon.svg" alt="check icon"></td>
                <td>${date_prediksi}</td>
                <td>Rp${hasil.products[i].harga.toLocaleString()},-</td>`;
                productList.insertAdjacentHTML("beforeend", per_product);
                checkTanggalandUpdate(hasil.products[i].Stok, hasil.products[i].harga, hasil.products[i].ID);
            } 

            const ubahBtn = document.getElementsByClassName('btn btn-link ubah-button');
            for (let btn of ubahBtn) {
                btn.addEventListener('click',  () => {
                    const id = btn.getAttribute('prod_id');
                    console.log(id);
                    window.location.href = `edit product.html?product=${id}`
                })
            }

            const komenBtn = document.getElementsByClassName('komentar_class');
            for (let btn of komenBtn) {
                btn.addEventListener('click',  () => {
                    const id = btn.getAttribute('prod_id');
                    console.log(id);
                    pop_up_komentar.style.display='flex';
                    document.getElementById('btn_komentar_simpan').setAttribute('prod-id', id);
                    document.getElementById('btn_komentar_simpan').addEventListener('click', async () => {
                        const komentar = document.getElementById('text_komen').value;
                        const id = document.getElementById('btn_komentar_simpan').getAttribute('prod-id');
                        const token = localStorage.getItem('authToken');
                    
                        try {
                            const res = await fetch(`http://localhost:5500/api/product/editCek/${id}`, {
                                method: 'PATCH',
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ cek: komentar }),
                            });
                    
                            const hasil = await res.json();
                    
                            if (res.ok) {
                                const storedRiwayat = localStorage.getItem("riwayatArray");
                                storedRiwayat = storedRiwayat ? JSON.parse(storedRiwayat) : [];
                                if (storedRiwayat.length>6) {
                                    storedRiwayat.shift();
                                }
                                const data_baru = [`Komentar baru: ${id}`];
                                storedRiwayat.push(data_baru);
                                localStorage.setItem("riwayatArray", JSON.stringify(storedRiwayat));

                                window.location.href = 'category.html'; 
                            } else {
                                if ((hasil.message == 'Produk Tidak Valid') || (hasil.message == 'Silahkan lengkapi semua bidang')) {
                                    notificationIcon.src = "image/Notif kalo ada kesalahan.svg";
                                    notification.style.display = 'block'; 
                                }
                            }
                        } catch (error) {
                            console.error(error.message);
                        }
                    })
                })
            }

        } else {
            console.error('Error: Tidak dapat mengambil data')
        }
    } catch (error) {
        console.error(error.message);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const kategori = getCategory('category'); 
    if (kategori) {
        ambilProduk(kategori);
    }
});

// Event listener untuk pencarian saat pengguna mengetik
searchInput.addEventListener('input', searchProduct);

let isAsc = false;

document.getElementById("kolom_produk").addEventListener('click', async () => {
    const productList = document.getElementById('tableBody');
    isAsc=!isAsc;
    const token = localStorage.getItem('authToken');

    if (isAsc) {
        try {
            const res = await fetch(`http://localhost:5500/api/product/${kategori}/sortASC`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
    
            const hasil = await res.json();
    
            if (res.ok) {
                productList.innerHTML = '';
                for (let i=0; i<hasil.products.length;i++) {
                    let image;
                    if (hasil.products[i].Stok<=10) {
                        image = "image/indikator merah.svg";
                    } else {
                        image = "image/indikator ijo.svg";
                    }
                    const per_product = 
                    `<td>${hasil.products[i].Produk}</td>
                    <td>${hasil.products[i].ID}</td>
                    <td>${hasil.products[i].Stok}</td>
                    <td><img src="${image}"></td>
                    <td><button id="button_edit_prod" prod_id= ${hasil.products[i].ID} class="btn btn-link ubah-button">UBAH</button></td>
                    <td><img id = "komentar_btn" catid= ${hasil.products[i].ID} src="image/check icon.svg" alt="check icon"></td>
                    <td>${hasil.products[i].Prediksi}</td>
                    <td>Rp${hasil.products[i].harga.toLocaleString()},-</td>`;
                    productList.insertAdjacentHTML("beforeend", per_product);

                    prediksiTanggal(hasil.products[i].ID);
                } 
    
                document.getElementById('button_edit_prod').addEventListener('click', function () {
                    const id = document.getElementById('button_edit_prod').getAttribute('prod_id');
                    console.log(id);
                    window.location.href = `edit product.html?product=${id}`
                })

                const ubahBtn = document.getElementsByClassName('btn btn-link ubah-button');
            for (let btn of ubahBtn) {
                btn.addEventListener('click',  () => {
                    const id = btn.getAttribute('prod_id');
                    console.log(id);
                    window.location.href = `edit product.html?product=${id}`
                })
            }

            const komenBtn = document.getElementsByClassName('komentar_class');
            for (let btn of komenBtn) {
                btn.addEventListener('click',  () => {
                    const id = btn.getAttribute('prod_id');
                    console.log(id);
                    pop_up_komentar.style.display='flex';
                    document.getElementById('btn_komentar_simpan').setAttribute('prod-id', id);
                    document.getElementById('btn_komentar_simpan').addEventListener('click', async () => {
                        const komentar = document.getElementById('text_komen').value;
                        const id = document.getElementById('btn_komentar_simpan').getAttribute('prod-id');
                        const token = localStorage.getItem('authToken');
                    
                        try {
                            const res = await fetch(`http://localhost:5500/api/product/editCek/${id}`, {
                                method: 'PATCH',
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ cek: komentar }),
                            });
                    
                            const hasil = await res.json();
                    
                            if (res.ok) {
                                window.location.href = 'category.html'; 
                            } else {
                                if ((hasil.message == 'Produk Tidak Valid') || (hasil.message == 'Silahkan lengkapi semua bidang')) {
                                    notificationIcon.src = "image/Notif kalo ada kesalahan.svg";
                                    notification.style.display = 'block'; 
                                }
                            }
                        } catch (error) {
                            console.error(error.message);
                        }
                    })
                })
            }
            } else {
                console.error('Error: Tidak dapat mengambil data');
            }
        } catch (error) {
            console.error(error.message);
        }
    } else {
        try {
            const res = await fetch(`http://localhost:5500/api/product/${kategori}/sortDSC`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
    
            const hasil = await res.json();
    
            if (res.ok) {
                productList.innerHTML = '';
                for (let i=0; i<hasil.products.length;i++) {
                    let image;
                    if (hasil.products[i].Stok<=10) {
                        image = "image/indikator merah.svg";
                    } else {
                        image = "image/indikator ijo.svg";
                    }
                    const per_product = 
                    `<td>${hasil.products[i].Produk}</td>
                    <td>${hasil.products[i].ID}</td>
                    <td>${hasil.products[i].Stok}</td>
                    <td><img src="${image}"></td>
                    <td><button id="button_edit_prod" prod_id= ${hasil.products[i].ID} class="btn btn-link ubah-button">UBAH</button></td>
                    <td><img id = "komentar_btn" catid= ${hasil.products[i].ID} src="image/check icon.svg" alt="check icon"></td>
                    <td>${hasil.products[i].Prediksi}</td>
                    <td>Rp${hasil.products[i].harga.toLocaleString()},-</td>`;
                    productList.insertAdjacentHTML("beforeend", per_product);
                } 
    
                document.getElementById('button_edit_prod').addEventListener('click', function () {
                    const id = document.getElementById('button_edit_prod').getAttribute('prod_id');
                    console.log(id);
                    window.location.href = `edit product.html?product=${id}`
                })
            } else {
                console.error('Error: Tidak dapat mengambil data', hasil.message);
            }

            const ubahBtn = document.getElementsByClassName('btn btn-link ubah-button');
            for (let btn of ubahBtn) {
                btn.addEventListener('click',  () => {
                    const id = btn.getAttribute('prod_id');
                    console.log(id);
                    window.location.href = `edit product.html?product=${id}`
                })
            }

            const komenBtn = document.getElementsByClassName('komentar_class');
            for (let btn of komenBtn) {
                btn.addEventListener('click',  () => {
                    const id = btn.getAttribute('prod_id');
                    console.log(id);
                    pop_up_komentar.style.display='flex';
                    document.getElementById('btn_komentar_simpan').setAttribute('prod-id', id);
                    document.getElementById('btn_komentar_simpan').addEventListener('click', async () => {
                        const komentar = document.getElementById('text_komen').value;
                        const id = document.getElementById('btn_komentar_simpan').getAttribute('prod-id');
                        const token = localStorage.getItem('authToken');
                    
                        try {
                            const res = await fetch(`http://localhost:5500/api/product/editCek/${id}`, {
                                method: 'PATCH',
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ cek: komentar }),
                            });
                    
                            const hasil = await res.json();
                    
                            if (res.ok) {
                                window.location.href = 'category.html'; 
                            } else {
                                if ((hasil.message == 'Produk Tidak Valid') || (hasil.message == 'Silahkan lengkapi semua bidang')) {
                                    notificationIcon.src = "image/Notif kalo ada kesalahan.svg";
                                    notification.style.display = 'block'; 
                                }
                            }
                        } catch (error) {
                            console.error(error.message);
                        }
                    })
                })
            }
        } catch (error) {
            console.error(error.message);
        }
    }
})

document.getElementById("btn_komentar_batal").addEventListener('click', () => {
    pop_up_komentar.style.display='none';
})

async function bisaPrediksi(id) {
    const token = localStorage.getItem('authToken');
    try {
        const res = await fetch(`http://localhost:5500/api/product/getOldProd?id=${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const hasil = await res.json();

        if (res.ok) {
            if (hasil.oldproducts.length>=12) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (error) {
        console.error(error.message);
    }
}

function tambahHari(tanggal, hari) {
    if (isNaN(Date.parse(tanggal)) || isNaN(hari)) {
        console.error("Input tanggal atau hari tidak valid");
        return null;
    }
    const hasil = new Date(tanggal);
    hasil.setDate(hasil.getDate() + hari);
    return hasil;
}

async function prediksiTanggal(id) {
    const bisa = await bisaPrediksi(id);
    if (bisa) {
        const token = localStorage.getItem('authToken');
        try {
            const res = await fetch(`http://localhost:5500/api/product/editPrediksi/${id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const hasil = await res.json();
            if (res.ok) {
                const currentDate = new Date();
                const date_prediksi = tambahHari(currentDate, hasil.hari);
                return date_prediksi.toLocaleDateString();
            } else {
                return "Belum bisa diprediksi";
            }

        } catch (error) {
            console.error(error.message);
        }
    } else {
        return "Belum bisa diprediksi";
    }
        
}

function checkTanggalandUpdate(stok, harga, id_prod) {
    const tanggal = new Date();

    if (tanggal.getDate()===1) {
        parseInt(localStorage.getItem("totalSelisih")) || 0;
        id = `${id_prod}${tanggal.getDate().toString().padStart(2, '0')}${(tanggal.getMonth() + 1).toString().padStart(2, '0')}${ tanggal.getFullYear().toString().slice(-2)}`;
        updateStokHabis(id, stok, harga, id_prod, tanggal.toISOString().split('T')[0]);
        console.log(tanggal.toISOString().split('T')[0]);
        localStorage.removeItem("totalSelisih");
    }
}

async function updateStokHabis(id, stok, harga, id_prod, tanggalnow) {
    const token = localStorage.getItem('authToken');
    try {
        const res = await fetch(`http://localhost:5500/api/product/setOldProd?id=${id}&stok=${stok}&harga=${harga}&id_prod=${id_prod}&tgl_hbs=${tanggalnow}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const hasil = await res.json();
        console.log('Response dari server:', hasil);
    } catch (err) {
        console.log('Error:', err);
    }
}

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
    localStorage.removeItem('riwayatArray');
    window.location.href='login.html';
})

