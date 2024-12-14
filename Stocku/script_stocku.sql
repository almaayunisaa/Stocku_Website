CREATE DATABASE stocku;

USE stocku;

CREATE TABLE Administrator (
	username varchar(255),
    pass varchar(255),
    email varchar(255),
    PRIMARY KEY (username)
);

CREATE TABLE Category (
	namaCategory varchar(255),
    PRIMARY KEY (namaCategory)
);

CREATE TABLE Product (
	namaCategory varchar(255),
    Produk varchar(255),
    ID varchar(255),
    Stok int,
    harga varchar(255),
    Cek varchar(255),
    Prediksi date,
    deskripsi varchar(700),
    PRIMARY KEY (ID),
    FOREIGN KEY (namaCategory) REFERENCES Category(namaCategory) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE oldproduct (
	ID varchar(255),
    Stok int,
    Harga varchar(255),
    IDProduk varchar(255),
    tanggal_habis date,
    PRIMARY KEY (ID)
);

SET SQL_SAFE_UPDATES = 0;
SET FOREIGN_KEY_CHECKS = 0;