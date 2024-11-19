const profileIcon = document.querySelector('.icon-container');
const dropdownMenu = document.createElement('div');

// Tambahkan class dan styling untuk dropdown menu
dropdownMenu.classList.add('dropdown-custom');
dropdownMenu.style.display = 'none'; // Sembunyikan menu secara default

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

// Form validation and submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const productName = document.getElementById('productName');
    const productCode = document.getElementById('productCode');
    const productStock = document.getElementById('productStock');
    const productPrice = document.getElementById('productPrice');
    const productDescription = document.getElementById('productDescription');

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
