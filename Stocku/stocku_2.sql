use stocku;

INSERT INTO Product (namaCategory, Produk, ID, Stok, Indikator, Aksi, Prediksi, Harga) VALUES
('Elektronik', 'Smartphone A12', 'PRD001', 100, 'Hijau', 'Edit', NULL, 'Rp2.500.000,-'),
('Elektronik', 'TV LED 32"', 'PRD002', 50, 'Merah', 'Edit', NULL, 'Rp3.200.000,-'),
('Furniture', 'Sofa Minimalis', 'PRD003', 20, 'Merah', 'Edit', NULL, 'Rp1.800.000,-'),
('Furniture', 'Lemari Pakaian', 'PRD004', 15, 'Merah', 'Edit', NULL, 'Rp2.200.000,-'),
('Sepatu', 'Sneakers Hitam', 'PRD005', 120, 'Hijau', 'Edit', NULL, 'Rp450.000,-'),
('Sepatu', 'Sandal Gunung', 'PRD006', 80, 'Hijau', 'Edit', NULL, 'Rp300.000,-'),
('Tas', 'Ransel Laptop', 'PRD007', 70, 'Hijau', 'Edit', NULL, 'Rp550.000,-'),
('Tas', 'Tas Selempang', 'PRD008', 90, 'Hijau', 'Edit', NULL, 'Rp350.000,-'),
('Buku', 'Novel Fiksi', 'PRD009', 150, 'Hijau', 'Edit', NULL, 'Rp75.000,-'),
('Buku', 'Komik Manga', 'PRD010', 200, 'Hijau', 'Edit', NULL, 'Rp45.000,-'),
('Kosmetik', 'Lipstik Matte', 'PRD011', 300, 'Hijau', 'Edit', NULL, 'Rp120.000,-'),
('Kosmetik', 'Foundation Cair', 'PRD012', 250, 'Hijau', 'Edit', NULL, 'Rp180.000,-'),
('Otomotif', 'Oli Mesin 10W-40', 'PRD013', 500, 'Hijau', 'Edit', NULL, 'Rp75.000,-'),
('Otomotif', 'Ban Mobil 185/70 R14', 'PRD014', 50, 'Merah', 'Edit', NULL, 'Rp950.000,-'),
('Mainan', 'Lego Classic', 'PRD015', 80, 'Hijau', 'Edit', NULL, 'Rp850.000,-'),
('Mainan', 'Boneka Teddy Bear', 'PRD016', 100, 'Hijau', 'Edit', NULL, 'Rp250.000,-'),
('Alat Musik', 'Gitar Akustik', 'PRD017', 30, 'Merah', 'Edit', NULL, 'Rp1.500.000,-'),
('Alat Musik', 'Keyboard Elektrik', 'PRD018', 10, 'Merah', 'Edit', NULL, 'Rp3.000.000,-'),
('Olahraga', 'Sepeda Gunung', 'PRD019', 25, 'Merah', 'Edit', NULL, 'Rp2.500.000,-'),
('Olahraga', 'Matras Yoga', 'PRD020', 100, 'Hijau', 'Edit', NULL, 'Rp300.000,-'),
('Rumah_Tangga', 'Sunlight', 'PRD021', 150, 'Hijau', 'Edit', NULL, 'Rp25.000,-'),
('Rumah_Tangga', 'Rinso', 'PRD022', 200, 'Hijau', 'Edit', NULL, 'Rp30.000,-'),
('Rumah_Tangga', 'Tessa', 'PRD023', 180, 'Hijau', 'Edit', NULL, 'Rp20.000,-'),
('Rumah_Tangga', 'Vixal', 'PRD024', 160, 'Hijau', 'Edit', NULL, 'Rp22.000,-'),
('Rumah_Tangga', 'Baygon', 'PRD025', 140, 'Merah', 'Edit', NULL, 'Rp40.000,-'),
('Rumah_Tangga', 'Downy', 'PRD026', 130, 'Hijau', 'Edit', NULL, 'Rp35.000,-');


INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD003-1', 14, 1000000, 'PRD003', '2024-01-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD003-2', 9, 1000000, 'PRD003', '2024-02-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD003-3', 50, 1000000, 'PRD003', '2024-03-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD003-4', 11, 1000000, 'PRD003', '2024-04-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD003-5', 40, 1000000, 'PRD003', '2024-05-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD003-6', 30, 1000000, 'PRD003', '2024-06-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD003-7', 19, 1000000, 'PRD003', '2024-07-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD003-8', 20, 1000000, 'PRD003', '2024-08-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD003-9', 22, 1000000, 'PRD003', '2024-09-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD003-10', 30, 1000000, 'PRD003', '2024-10-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD003-11', 35, 1000000, 'PRD003', '2024-11-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD003-12', 10, 1000000, 'PRD003', '2024-12-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD004-1', 9, 2200000, 'PRD004', '2024-01-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD004-2', 14, 2200000, 'PRD004', '2024-02-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD004-3', 20, 2200000, 'PRD004', '2024-03-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD004-4', 25, 2200000, 'PRD004', '2024-04-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD004-5', 30, 2200000, 'PRD004', '2024-05-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD004-6', 34, 2200000, 'PRD004', '2024-06-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD004-7', 40, 2200000, 'PRD004', '2024-07-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD004-8', 44, 2200000, 'PRD004', '2024-08-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD004-9', 29, 2200000, 'PRD004', '2024-09-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD004-10', 30, 2200000, 'PRD004', '2024-10-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD004-11', 33, 2200000, 'PRD004', '2024-11-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD004-12', 25, 2200000, 'PRD004', '2024-12-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD013-1', 80, 75000, 'PRD013', '2024-01-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD013-2', 20, 75000, 'PRD013', '2024-02-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD013-3', 70, 75000, 'PRD013', '2024-03-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD013-4', 60, 75000, 'PRD013', '2024-04-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD013-5', 50, 75000, 'PRD013', '2024-05-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD013-6', 40, 75000, 'PRD013', '2024-06-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD013-7', 10, 75000, 'PRD013', '2024-07-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD013-8', 90, 75000, 'PRD013', '2024-08-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD013-9', 100, 75000, 'PRD013', '2024-09-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD013-10', 88, 75000, 'PRD013', '2024-10-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD013-11', 80, 75000, 'PRD013', '2024-11-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD013-12', 88, 75000, 'PRD013', '2024-12-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD014-1', 100, 950000, 'PRD014', '2024-01-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD014-2', 70, 950000, 'PRD014', '2024-02-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD014-3', 78, 950000, 'PRD014', '2024-03-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD014-4', 24, 950000, 'PRD014', '2024-04-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD014-5', 56, 950000, 'PRD014', '2024-05-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD014-6', 78, 950000, 'PRD014', '2024-06-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD014-7', 90, 950000, 'PRD014', '2024-07-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD014-8', 13, 950000, 'PRD014', '2024-08-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD014-9', 40, 950000, 'PRD014', '2024-09-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD014-10', 20, 950000, 'PRD014', '2024-10-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD014-11', 70, 950000, 'PRD014', '2024-11-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD014-12', 90, 950000, 'PRD014', '2024-12-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD015-1', 77, 850000, 'PRD015', '2024-01-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD015-2', 70, 850000, 'PRD015', '2024-02-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD015-3', 60, 850000, 'PRD015', '2024-03-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD015-4', 67, 850000, 'PRD015', '2024-04-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD015-5', 70, 850000, 'PRD015', '2024-05-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD015-6', 100, 850000, 'PRD015', '2024-06-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD015-7', 58, 850000, 'PRD015', '2024-07-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD015-8', 90, 850000, 'PRD015', '2024-08-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD015-9', 100, 850000, 'PRD015', '2024-09-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD015-10', 87, 850000, 'PRD015', '2024-10-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD015-11', 90, 850000, 'PRD015', '2024-11-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD015-12', 67, 850000, 'PRD015', '2024-12-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD016-1', 90, 250000, 'PRD016', '2024-01-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD016-2', 70, 250000, 'PRD016', '2024-02-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD016-3', 54, 250000, 'PRD016', '2024-03-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD016-4', 78, 250000, 'PRD016', '2024-04-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD016-5', 89, 250000, 'PRD016', '2024-05-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD016-6', 90, 250000, 'PRD016', '2024-06-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD016-7', 76, 250000, 'PRD016', '2024-07-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD016-8', 190, 250000, 'PRD016', '2024-08-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD016-9', 87, 250000, 'PRD016', '2024-09-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD016-10', 80, 250000, 'PRD016', '2024-10-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD016-11', 178, 250000, 'PRD016', '2024-11-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD016-12', 98, 250000, 'PRD016', '2024-12-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD020-1', 67, 300000, 'PRD020', '2024-01-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD020-2', 98, 300000, 'PRD020', '2024-02-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD020-3', 90, 300000, 'PRD020', '2024-03-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD020-4', 55, 300000, 'PRD020', '2024-04-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD020-5', 77, 300000, 'PRD020', '2024-05-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD020-6', 78, 300000, 'PRD020', '2024-06-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD020-7', 50, 300000, 'PRD020', '2024-07-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD020-8', 55, 300000, 'PRD020', '2024-08-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD020-9', 54, 300000, 'PRD020', '2024-09-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD020-10', 34, 300000, 'PRD020', '2024-10-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD020-11', 89, 300000, 'PRD020', '2024-11-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD020-12', 44, 300000, 'PRD020', '2024-12-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD021-1', 89, 25000, 'PRD021', '2024-01-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD021-2', 90, 25000, 'PRD021', '2024-02-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD021-3', 18, 25000, 'PRD021', '2024-03-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD021-4', 40, 25000, 'PRD021', '2024-04-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD021-5', 80, 25000, 'PRD021', '2024-05-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD021-6', 70, 25000, 'PRD021', '2024-06-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD021-7', 70, 25000, 'PRD021', '2024-07-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD021-8', 89, 25000, 'PRD021', '2024-08-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD021-9', 100, 25000, 'PRD021', '2024-09-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD021-10', 50, 25000, 'PRD021', '2024-10-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD021-11', 100, 25000, 'PRD021', '2024-11-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD021-12', 76, 25000, 'PRD021', '2024-12-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD022-1', 79, 30000, 'PRD022', '2024-01-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD022-2', 98, 30000, 'PRD022', '2024-02-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD022-3', 67, 30000, 'PRD022', '2024-03-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD022-4', 60, 30000, 'PRD022', '2024-04-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD022-5', 56, 30000, 'PRD022', '2024-05-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD022-6', 80, 30000, 'PRD022', '2024-06-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD022-7', 97, 30000, 'PRD022', '2024-07-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD022-8', 90, 30000, 'PRD022', '2024-08-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD022-9', 90, 30000, 'PRD022', '2024-09-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD022-10', 76, 30000, 'PRD022', '2024-10-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD022-11', 67, 30000, 'PRD022', '2024-11-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD022-12', 87, 30000, 'PRD022', '2024-12-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD023-1', 89, 20000, 'PRD023', '2024-01-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD023-2', 100, 20000, 'PRD023', '2024-02-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD023-3', 78, 20000, 'PRD023', '2024-03-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD023-4', 99, 20000, 'PRD023', '2024-04-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD023-5', 176, 20000, 'PRD023', '2024-05-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD023-6', 89, 20000, 'PRD023', '2024-06-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD023-7', 90, 20000, 'PRD023', '2024-07-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD023-8', 93, 20000, 'PRD023', '2024-08-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD023-9', 97, 20000, 'PRD023', '2024-09-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD023-10', 100, 20000, 'PRD023', '2024-10-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD023-11', 101, 20000, 'PRD023', '2024-11-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD023-12', 89, 20000, 'PRD023', '2024-12-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD024-1', 78, 22000, 'PRD024', '2024-01-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD024-2', 16, 22000, 'PRD024', '2024-02-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD024-3', 98, 22000, 'PRD024', '2024-03-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD024-4', 56, 22000, 'PRD024', '2024-04-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD024-5', 87, 22000, 'PRD024', '2024-05-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD024-6', 66, 22000, 'PRD024', '2024-06-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD024-7', 78, 22000, 'PRD024', '2024-07-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD024-8', 90, 22000, 'PRD024', '2024-08-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD024-9', 97, 22000, 'PRD024', '2024-09-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD024-10', 198, 22000, 'PRD024', '2024-10-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD024-11', 87, 22000, 'PRD024', '2024-11-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD024-12', 98, 22000, 'PRD024', '2024-12-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD025-1', 178, 40000, 'PRD025', '2024-01-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD025-2', 100, 40000, 'PRD025', '2024-02-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD025-3', 78, 40000, 'PRD025', '2024-03-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD025-4', 98, 40000, 'PRD025', '2024-04-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD025-5', 190, 40000, 'PRD025', '2024-05-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD025-6', 190, 40000, 'PRD025', '2024-06-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD025-7', 176, 40000, 'PRD025', '2024-07-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD025-8', 86, 40000, 'PRD025', '2024-08-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD025-9', 98, 40000, 'PRD025', '2024-09-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD025-10', 46, 40000, 'PRD025', '2024-10-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD025-11', 156, 40000, 'PRD025', '2024-11-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD025-12', 98, 40000, 'PRD025', '2024-12-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD026-1', 178, 35000, 'PRD026', '2024-01-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD026-2', 198, 35000, 'PRD026', '2024-02-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD026-3', 90, 35000, 'PRD026', '2024-03-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD026-4', 78, 35000, 'PRD026', '2024-04-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD026-5', 90, 35000, 'PRD026', '2024-05-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD026-6', 34, 35000, 'PRD026', '2024-06-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD026-7', 56, 35000, 'PRD026', '2024-07-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD026-8', 98, 35000, 'PRD026', '2024-08-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD026-9', 99, 35000, 'PRD026', '2024-09-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD026-10', 70, 35000, 'PRD026', '2024-10-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD026-11', 77, 35000, 'PRD026', '2024-11-01');
INSERT INTO oldproduct (ID, Stok, Harga, IDProduk, tanggal_habis) VALUES ('PRD026-12', 88, 35000, 'PRD026', '2024-12-01');

SET SQL_SAFE_UPDATES = 1;
DELETE FROM oldproduct WHERE ID="PRD003-13";

