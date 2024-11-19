const kategori = require('../models/kategori');
// cek di form asli di fe

const tambahKategori = (req, res) => {
    try {
        const {namaKategori} = req.query;

        if (!namaKategori) {
            return res.status(400).json({ message: "Silahkan lengkapi semua bidang" });
        }

        const cat = kategori.create(namaKategori);

        if (produk.length===0) {
            return res.status(404).json({message : 'Kategori invalid'});
        }

        res.status(201).json({
            message: "Yey Kategori Berhasil ditambahkan!",
            cat,
        });

    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const editCategory = (req, res) => {
    try {
        const {namaKategori} = req.query;

        if (!namaKategori) {
            return res.status(400).json({ message: "Silahkan lengkapi semua bidang" });
        }

        const cat = kategori.edit(namaKategori);

        if (produk.length===0) {
            return res.status(404).json({message : 'Kategori invalid'});
        }

        res.status(200).json({
            message: "Yey Kategori Berhasil diubah!",
        });

    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const hapusKategori = (req, res) => {
    try {
        const {namaKategori} = req.params;

        const cat = kategori.delete(namaKategori);

        if (produk.length===0) {
            return res.status(404).json({message : 'Kategori invalid'});
        }

        res.status(200).json({
            message: "Kategori berhasil dihapus!",
        });

    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

module.exports={tambahKategori, hapusKategori, editCategory};