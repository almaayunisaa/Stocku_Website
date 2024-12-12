const profileIcon = document.querySelector('.icon-container');
const dropdownMenu = document.createElement('div');
const tambahPopup= document.getElementById('tambahPopup');
const PopupAddCat = document.getElementById('PopupAddCat');
const PopupEditCat = document.getElementById('PopupEditCat');
const simpanKategori = document.getElementById('simpanKategori');
const batalKategori = document.getElementById('batalKategori');
const PopUpUbahEmail = document.getElementById('PopUpUbahEmail');
const tabel_Produk = document.getElementById('tabel-produk');
const PopUpKonfirmDel = document.getElementById('PopUpKonfirmDel');

// Tambahkan class dan styling untuk dropdown menu
dropdownMenu.classList.add('dropdown-custom');
dropdownMenu.style.display = 'none'; // Sembunyikan menu secara default
PopupAddCat.style.display = "none";
PopupEditCat.style.display = "none";
PopUpUbahEmail.style.display='none';
tabel_Produk.style.display='none';
PopUpKonfirmDel.style.display='none';

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
    <div id = "ubah_email_btn" class="dropdown-item">
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

//event listener buttonn add cat
tambahPopup.addEventListener("click", function() {
    PopupAddCat.style.display = "flex";
})

//close pop up add cat
batalKategori.addEventListener("click", function() {
    PopupAddCat.style.display = "none";
})

// save cat
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
        if (res.ok) {
            let storedRiwayat = localStorage.getItem("riwayatArray");
            storedRiwayat = storedRiwayat ? JSON.parse(storedRiwayat) : [];
            if (storedRiwayat.length > 6) {
                storedRiwayat.shift();
            }
            const data_baru = `Kategori baru: ${namaCat}`;
            storedRiwayat.push(data_baru);
            localStorage.setItem("riwayatArray", JSON.stringify(storedRiwayat));

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

document.addEventListener("DOMContentLoaded", async () => {
    const categoryList = document.getElementById('categoryList');
    const token = localStorage.getItem('authToken');

    try {
        const res = await fetch('http://localhost:5500/api/category/getKategori', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const hasil = await res.json();
        if (res.ok) {
            for (let i=0; i<hasil.categories.length;i++) {
                const per_kategori = `
                    <div id="list_cat" dataCat_id="${hasil.categories[i].namaCategory}" class="category-item d-flex justify-content-between  align-items-center p-2 my-2 bg-white">
                        <span class="category-name">${hasil.categories[i].namaCategory}</span>
                        <div class="action-container d-flex align-items-center"> 
                            <a href="product.html" class="view-product text-decoration-none text-dark d-flex align-items-center" dataCat_id="${hasil.categories[i].namaCategory}">
                                Lihat Produk...
                            </a>
                            <img id="editCat_btn" src="image/edit_icon.svg" class="ms-2" width="25" height="25" dataCat_id="${hasil.categories[i].namaCategory}">
                            <img id="deleteCat_btn" src="image/deletecat.svg" alt="Lihat Produk Icon" class="ms-2" width="25" height="25" dataCat_id="${hasil.categories[i].namaCategory}">
                        </div>
                    </div>`;
                categoryList.insertAdjacentHTML("beforeend", per_kategori);

                document.querySelectorAll('.view-product').forEach(button => {
                    button.addEventListener('click', function (event) {
                        event.preventDefault();
                        const id = this.getAttribute('dataCat_id');
                        window.location.href = `product.html?category=${id}`
                    })
                })
                
                const deleteButton = categoryList.querySelector(`img#deleteCat_btn[dataCat_id="${hasil.categories[i].namaCategory}"]`);
                deleteButton.addEventListener("click", async (event) => {
                    PopUpKonfirmDel.style.display='flex';
                    
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

                                let storedRiwayat = localStorage.getItem("riwayatArray");
                                storedRiwayat = storedRiwayat ? JSON.parse(storedRiwayat) : [];
                                console.log(storedRiwayat);
                                if (storedRiwayat.length > 6) {
                                    storedRiwayat.shift();
                                }
                                const data_baru = `Kategori dihapus: ${id}`;
                                storedRiwayat.push(data_baru);
                                localStorage.setItem("riwayatArray", JSON.stringify(storedRiwayat));
                            } else {
                                console.error('Error: Tidak dapat menghapus data', hasil.message)
                            }
                        } catch (err) {
                            console.error('Error: Tidak dapat menghapus data')
                        }   
                    })

                    document.getElementById('batalKonfirm').addEventListener('click', async () => {
                        PopUpKonfirmDel.style.display='none';
                    })
                })

                const editCatButton = categoryList.querySelector(`img#editCat_btn[dataCat_id="${hasil.categories[i].namaCategory}"]`);
                editCatButton.addEventListener("click", (event) => {
                    id= event.target.getAttribute('dataCat_id');
                    PopupEditCat.style.display = "flex";
                    document.getElementById('batalKategori2').addEventListener("click", function() {
                        PopupEditCat.style.display = "none";
                    })
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
                            console.log(namaCat, id);
                            const hasil = await res.json();
        
                            if (res.ok) {
                                window.location.href = 'category.html'; 

                                let storedRiwayat = localStorage.getItem("riwayatArray");
                                storedRiwayat = storedRiwayat ? JSON.parse(storedRiwayat) : [];
                                console.log(storedRiwayat);
                                if (storedRiwayat.length > 6) {
                                    storedRiwayat.shift();
                                }
                                const data_baru = `Kategori diubah: ${id} menjadi ${namaCat}`;
                                storedRiwayat.push(data_baru);
                                localStorage.setItem("riwayatArray", JSON.stringify(storedRiwayat));
                            } else {
                                console.log(hasil.message);
                                console.error('Error: Tidak dapat mengubah data')
                            }
                        } catch (err) {
                            console.error(err.message)
                        }
                    })
                })

            } 
        } else {
            console.error('Error: Tidak dapat mengambil data')
        }

    } catch (err) {
        console.log('Error:', err);
    }
})

// Event listener to hide the notification when the close button is clicked
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
    (document.getElementById('main-content')).style.display='none';

    tabel_Produk.style.display='flex';
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