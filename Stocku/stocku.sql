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