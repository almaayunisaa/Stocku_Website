CREATE DATABASE stocku;

USE stocku;

CREATE TABLE Administrator (
	username varchar(255),
    pass varchar(255),
    PRIMARY KEY (username)
);

CREATE TABLE Category (
	namaCategory varchar(255),
    PRIMARY KEY (namaCategory)
);

CREATE TABLE Product (
	ID varchar(255),
    namaCategory varchar(255),
    namaProduct varchar(255),
    Stok int,
    Deskripsi varchar(255),
    Komentar varchar(255),
    PRIMARY KEY (ID),
    FOREIGN KEY (namaCategory) REFERENCES Category(namaCategory)
);

ALTER TABLE Product ADD harga varchar(255);
ALTER TABLE Product MODIFY COLUMN harga varchar(255) AFTER Stok;

SELECT * FROM Product;

INSERT INTO Administrator (username, pass) VALUES
('vantasticMe', '#pass*'),
('manager_keren', 'hebat123');

INSERT INTO Category (namaCategory) VALUES
('Elektronik'),
('Furniture'),
('Sepatu'),
('Tas'),
('Buku'),
('Kosmetik'),
('Otomotif'),
('Mainan'),
('Alat Musik'),
('Olahraga');

SELECT * FROM Category;

INSERT INTO Product (ID, namaCategory, namaProduct, Stok, harga, Deskripsi, Komentar) VALUES
('PRD001', 'Elektronik', 'Smartphone A12', 100, '2500000', 'Smartphone layar 6 inci dengan dual kamera', NULL),
('PRD002', 'Elektronik', 'TV LED 32"', 50, '3200000', 'TV LED dengan fitur Smart TV', NULL),
('PRD003', 'Furniture', 'Sofa Minimalis', 20, '1800000', 'Sofa 2-seater berbahan kain', NULL),
('PRD004', 'Furniture', 'Lemari Pakaian', 15, '2200000', 'Lemari 3 pintu berbahan kayu', NULL),
('PRD005', 'Sepatu', 'Sneakers Hitam', 120, '450000', 'Sepatu olahraga kasual', NULL),
('PRD006', 'Sepatu', 'Sandal Gunung', 80, '300000', 'Sandal dengan sol anti-slip', NULL),
('PRD007', 'Tas', 'Ransel Laptop', 70, '550000', 'Ransel dengan kompartemen laptop 15 inci', NULL),
('PRD008', 'Tas', 'Tas Selempang', 90, '350000', 'Tas selempang kulit sintetis', NULL),
('PRD009', 'Buku', 'Novel Fiksi', 150, '75000', 'Novel bergenre misteri', NULL),
('PRD010', 'Buku', 'Komik Manga', 200, '45000', 'Komik Jepang populer', NULL),
('PRD011', 'Kosmetik', 'Lipstik Matte', 300, '120000', 'Lipstik dengan hasil akhir matte', NULL),
('PRD012', 'Kosmetik', 'Foundation Cair', 250, '180000', 'Foundation dengan SPF 15', NULL),
('PRD013', 'Otomotif', 'Oli Mesin 10W-40', 500, '75000', 'Oli mesin untuk motor', NULL),
('PRD014', 'Otomotif', 'Ban Mobil 185/70 R14', 50, '950000', 'Ban mobil untuk medan off-road', NULL),
('PRD015', 'Mainan', 'Lego Classic', 80, '850000', 'Set Lego untuk anak usia 6+', NULL),
('PRD016', 'Mainan', 'Boneka Teddy Bear', 100, '250000', 'Boneka ukuran 1 meter', NULL),
('PRD017', 'Alat Musik', 'Gitar Akustik', 30, '1500000', 'Gitar kayu dengan 6 senar', NULL),
('PRD018', 'Alat Musik', 'Keyboard Elektrik', 10, '3000000', 'Keyboard dengan 61 tuts', NULL),
('PRD019', 'Olahraga', 'Sepeda Gunung', 25, '2500000', 'Sepeda dengan 21 gear', NULL),
('PRD020', 'Olahraga', 'Matras Yoga', 100, '300000', 'Matras anti-slip', NULL);

SELECT * FROM Product;

INSERT INTO Category (namaCategory) VALUES ('Rumah Tangga');

ALTER TABLE Product 
ADD Indikator VARCHAR(10) AFTER Stok,
ADD Aksi VARCHAR(50) AFTER Indikator,
ADD Prediksi VARCHAR(50) AFTER Aksi;

ALTER TABLE Product DROP COLUMN Deskripsi;

ALTER TABLE Product 
MODIFY COLUMN Komentar VARCHAR(255) AFTER Harga;

DESCRIBE Product;

ALTER TABLE Product DROP COLUMN Komentar;
ALTER TABLE Product DROP COLUMN Prediksi;

DESCRIBE Product;

ALTER TABLE Product ADD Cek VARCHAR(255) AFTER Aksi;
ALTER TABLE Product ADD Prediksi DATE AFTER Cek;

SET SQL_SAFE_UPDATES = 0;
DELETE FROM Product;

Select * From Product;

ALTER TABLE Product MODIFY COLUMN ID VARCHAR(255) AFTER namaProduct;
ALTER TABLE Product CHANGE COLUMN namaProduct Produk varchar(255);
ALTER TABLE Product CHANGE COLUMN harga Harga varchar(255);
ALTER TABLE Category DROP COLUMN Rumah_Tangga;

SELECT * FROM Category;

INSERT INTO Category (namaCategory) VALUES ('Rumah_Tangga');

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

SELECT * FROM Product;

ALTER TABLE Product DROP COLUMN Aksi;
ALTER TABLE Product DROP COLUMN Indikator;

ALTER TABLE Administrator ADD email VARCHAR(255);

SELECT * FROM Administrator;

SET SQL_SAFE_UPDATES = 0;
DELETE FROM Administrator WHERE email='mancool@mail.com';
SET SQL_SAFE_UPDATES = 1;

UPDATE Administrator 
SET email = 'mancool@mail.com' 
WHERE username = 'manager_keren';

UPDATE Administrator 
SET email = 'funplayer@mail.com' 
WHERE username = 'vantasticMe';

CREATE TABLE oldProduct (
	ID VARCHAR(255),
    Stok INT,
    Harga VARCHAR(255),
    PRIMARY KEY (ID)
);
