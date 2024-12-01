const kategori = require('../models/kategori');

const tambahKategori = async (req, res) => {
    try {
        const {namaKategori} = req.body;

        if (!namaKategori) {
            return res.status(400).json({ message: "Silahkan lengkapi semua bidang" });
        }

        const cariCat = await kategori.find(namaKategori);

        if (cariCat.length>0) {
            return res.status(401).json({ message: 'Kategori sama silahkan input kembali' });
        }

        const cat = await kategori.create(namaKategori);

        if (!cat) {
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

const editCategory = async (req, res) => {
    try {
        const {namaKategori} = req.params;
        const {editNama} = req.body;

        if (!editNama) {
            return res.status(400).json({ message: "Silahkan lengkapi semua bidang" });
        }

        const cariCat = await kategori.find(namaKategori);

        if (cariCat.length===0) {
            return res.status(401).json({ message: 'Kategori tidak ada Silahkan coba lagi' });
        }

        const cat = await kategori.edit(namaKategori, editNama);

        if (cat.affectedRows === 0) {
            return res.status(404).json({message : 'Kategori invalid'});
        }

        res.status(200).json({
            message: "Yey Kategori Berhasil diubah!",
            cat
        });

    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const hapusKategori = async (req, res) => {
    try {
        const {namaKategori} = req.params;

        if (!(kategori.find(namaKategori))) {
            return res.status(404).json({ message: "Kategori tidak ditemukan" });
        }

        const cariCat = await kategori.find(namaKategori);

        if (cariCat.length===0) {
            return res.status(401).json({ message: 'Kategori tidak ada Silahkan coba lagi' });
        }

        const cat = await kategori.delete(namaKategori);

        if (!cat) {
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