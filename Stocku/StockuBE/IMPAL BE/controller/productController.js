const product = require('../models/product');
// cek lagi untuk form fe sesuai atau tidak

const cariProduk = (req, res) => {
    try {
        const {namaProduk} = req.query;

        const produk = product.findName(namaProduk);

        if (produk.length===0) {
            return res.status(404).json({message : 'Ups! Barang yang Anda cari Tidak dapat ditemukan'});
        }

        res.json(produk);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const tambahProduk = (req, res) => {
    try {
        const {namaProduk, id, stok, harga, deskripsi} = req.query;
        const namaCat = req.params.namaCat || "defaultCategory";
        const cek = null;
        const prediksi = null;

        if (!namaProduk || !stok || !id || !harga || !deskripsi) {
            return res.status(400).json({ message: "Silahkan lengkapi semua bidang" });
        }

        const produk = product.create(namaCat, produk, id, stok, harga, cek, prediksi, deskripsi);

        res.status(201).json({
            message: "Yey Barang Anda Berhasil ditambahkan!",
            produk,
        });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const hapusProduk = (req, res) => {
    try {
        const {id} = req.params;

        const produk = product.delete(id);

        if (produk.length===0) {
            return res.status(404).json({message : 'Barang tidak ada'});
        }

        res.status(200).json({
            message: 'Produk berhasil dihapus',
        });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const editNama = (req, res) => {
    try {
        const {id} = req.params;
        const {namaProduk} = req.query;

        const produk = product.editNama(id, namaProduk);

        if (produk.length===0) {
            return res.status(404).json({message : 'Produk Tidak Valid'});
        }

        res.status(200).json({ message: 'Berhasil di perbarui' });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const editStok = (req, res) => {
    try {
        const {id} = req.params;
        const {stok} = req.query;

        const produk = product.editStok(id, stok);

        if (produk.length===0) {
            return res.status(404).json({message : 'Produk Tidak Valid'});
        }

        res.status(200).json({ message: 'Berhasil di perbarui' });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const editHarga = (req, res) => {
    try {
        const {id} = req.params;
        const {harga} = req.query;

        const produk = product.editHarga(id, harga);

        if (produk.length===0) {
            return res.status(404).json({message : 'Produk Tidak Valid'});
        }

        res.status(200).json({ message: 'Berhasil di perbarui' });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const editPrediksi = (req, res) => {
    try {
        const {id} = req.params;
        // const {prediksi}
        // nanti tambahkan algo AI untuk prediksi
        const produk = product.editPrediksi(id, prediksi);

        if (produk.length===0) {
            return res.status(404).json({message : 'Produk Tidak Valid'});
        }

        res.status(200).json({ message: 'Berhasil di perbarui' });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const editCek = (req, res) => {
    try {
        const {id} = req.params;
        const {cek} = req.query;
        const produk = product.editCek(id, cek);

        if (produk.length===0) {
            return res.status(404).json({message : 'Produk Tidak Valid'});
        }

        res.status(200).json({ message: 'Berhasil di perbarui' });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const editDes = (req, res) => {
    try {
        const {id} = req.params;
        const {deskripsi} = req.query;
        const produk = product.editDes(id, deskripsi);

        if (produk.length===0) {
            return res.status(404).json({message : 'Produk Tidak Valid'});
        }

        res.status(200).json({ message: 'Berhasil di perbarui' });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

module.exports={cariProduk, tambahProduk, hapusProduk, editNama, editStok, editHarga, editPrediksi, editCek, editDes};