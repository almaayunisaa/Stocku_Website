// Import model kategori untuk berinteraksi dengan database
const kategori = require('../models/kategori');

/**
 * Fungsi untuk menambahkan kategori baru ke database.
 * @param {Object} req - Objek request dari client.
 * @param {Object} res - Objek response untuk mengirimkan respons ke client.
 */
const tambahKategori = async (req, res) => {
    try {
        const { namaKategori } = req.body;
        console.log(namaKategori);

        // Validasi apakah nama kategori telah diisi
        if (!namaKategori) {
            return res.status(400).json({ message: "Silahkan lengkapi semua bidang" });
        }

        // Cek apakah kategori sudah ada
        const cariCat = await kategori.find(namaKategori);
        if (cariCat.length > 0) {
            return res.status(401).json({ message: 'Kategori sama silahkan input kembali' });
        }

        // Tambahkan kategori ke database
        const cat = await kategori.create(namaKategori);
        if (!cat) {
            return res.status(404).json({ message: 'Kategori invalid' });
        }

        res.status(201).json({
            message: "Yey Kategori Berhasil ditambahkan!",
            cat,
        });

    } catch (err) {
        // Tangani error internal server
        res.status(500).json({ error: err.message });
    }
}

/**
 * Fungsi untuk mengubah nama kategori yang ada.
 * @param {Object} req - Objek request dari client.
 * @param {Object} res - Objek response untuk mengirimkan respons ke client.
 */
const editCategory = async (req, res) => {
    try {
        const { namaKategori } = req.params;
        const { editNama } = req.body;

        // Validasi apakah nama kategori baru telah diisi
        if (!editNama) {
            return res.status(400).json({ message: "Silahkan lengkapi semua bidang" });
        }

        // Cek apakah kategori yang akan diubah ada
        const cariCat = await kategori.find(namaKategori);
        if (cariCat.length === 0) {
            return res.status(401).json({ message: 'Kategori tidak ada Silahkan coba lagi' });
        }

        // Lakukan pengubahan nama kategori
        const cat = await kategori.edit(namaKategori, editNama);
        if (cat.affectedRows === 0) {
            return res.status(404).json({ message: 'Kategori invalid' });
        }

        res.status(200).json({
            message: "Yey Kategori Berhasil diubah!",
            cat
        });

    } catch (err) {
        // Tangani error internal server
        res.status(500).json({ error: err.message });
    }
}

/**
 * Fungsi untuk menghapus kategori berdasarkan nama.
 * @param {Object} req - Objek request dari client.
 * @param {Object} res - Objek response untuk mengirimkan respons ke client.
 */
const hapusKategori = async (req, res) => {
    try {
        const { namaKategori } = req.params;

        // Validasi apakah kategori ditemukan
        if (!(kategori.find(namaKategori))) {
            return res.status(404).json({ message: "Kategori tidak ditemukan" });
        }

        // Cek apakah kategori ada di database
        const cariCat = await kategori.find(namaKategori);
        if (cariCat.length === 0) {
            return res.status(401).json({ message: 'Kategori tidak ada Silahkan coba lagi' });
        }

        // Hapus kategori dari database
        const cat = await kategori.delete(namaKategori);
        if (!cat) {
            return res.status(404).json({ message: 'Kategori invalid' });
        }

        res.status(200).json({
            message: "Kategori berhasil dihapus!",
        });

    } catch (err) {
        // Tangani error internal server
        res.status(500).json({ error: err.message });
    }
}

/**
 * Fungsi untuk mengambil daftar semua kategori.
 * @param {Object} req - Objek request dari client.
 * @param {Object} res - Objek response untuk mengirimkan respons ke client.
 */
const ambilKategori = async (req, res) => {
    try {
        // Ambil daftar kategori dari database
        const category_list = await kategori.get();
        if (category_list.length === 0) {
            return res.status(401).json({ message: 'Kategori tidak ada Silahkan coba lagi' });
        }

        return res.status(200).json({ categories: category_list });
    } catch (err) {
        // Tangani error internal server
        res.status(500).json({ error: err.message });
    }
}

// Ekspor fungsi-fungsi agar bisa digunakan di router atau modul lainnya
module.exports = { tambahKategori, hapusKategori, editCategory, ambilKategori };
