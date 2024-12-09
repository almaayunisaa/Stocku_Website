const profileIcon = document.querySelector('.icon-container');
const dropdownMenu = document.createElement('div');
const tambahPopup= document.getElementById('tambahPopup');
const PopupAddCat = document.getElementById('PopupAddCat');
const PopupEditCat = document.getElementById('PopupEditCat');
const simpanKategori = document.getElementById('simpanKategori');
const batalKategori = document.getElementById('batalKategori');

// Tambahkan class dan styling untuk dropdown menu
dropdownMenu.classList.add('dropdown-custom');
dropdownMenu.style.display = 'none'; // Sembunyikan menu secara default
PopupAddCat.style.display = "none";
PopupEditCat.style.display = "none";

// Tambahkan opsi sesuai gambar
dropdownMenu.innerHTML = `
    <div class="dropdown-header">
        <span class="email-label">Email :</span>
        <span class="email-address">admin@gmail.com</span>
    </div>
    <div class="dropdown-item">
        <img src="image/ubah email icon.svg" class="dropdown-icon" alt="Eye Icon">
        Ubah email
    </div>
    <div class="dropdown-item">
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
                const per_kategori = 
                `<div id="list_cat" dataCat_id="${hasil.categories[i].namaCategory}" class="category-item d-flex justify-content-between align-items-center p-2 my-2 bg-warning">
                        <span class="category-name">${hasil.categories[i].namaCategory}</span>
                        <a href="product.html" class="view-product text-decoration-none text-dark d-flex align-items-center" dataCat_id="${hasil.categories[i].namaCategory}">
                            Lihat Produk...
                        </a>
                        <img id="editCat_btn" src="image/edit_icon.svg" class="ms-2" width="25" height="25" dataCat_id="${hasil.categories[i].namaCategory}">
                        <img id="deleteCat_btn" src="image/deletecat.svg" alt="Lihat Produk Icon" class="ms-2" width="25" height="25" dataCat_id="${hasil.categories[i].namaCategory}">
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
                        } else {
                            console.error('Error: Tidak dapat menghapus data')
                        }
                    } catch (err) {
                        console.error('Error: Tidak dapat menghapus data')
                    }   
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