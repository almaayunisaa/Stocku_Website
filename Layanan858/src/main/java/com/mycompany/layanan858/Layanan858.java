/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.mycompany.layanan858;

import java.util.Scanner;

/**
 *
 * @author Alma
 */
public class Layanan858 {
    
    public static void menu() {
        Scanner scan = new Scanner(System.in);
        System.out.println("USSD Code Running...");
        System.out.flush();
            
        System.out.println("Mau Motor Beat dr Ibrahim Risyad? Hub *500*339#");
        System.out.println("1. Transfer Pulsa");
        System.out.println("2. Minta Pulsa");
        System.out.println("3. Auto TP");
        System.out.println("4. Delete Auto TP");
        System.out.println("5. List Auto TP");
        System.out.println("6. Cek Kupon Undian TP");
            
        scan = new Scanner(System.in);
        int x = scan.nextInt();
            
        if (x==1) {
            System.out.flush();
            System.out.println("Silahkan masukkan nomor tujuan");
            System.out.println("Transfer Pulsa : (contoh: 08xxxx atau 628xxxx)");
            scan = new Scanner(System.in);
            String noHP = scan.nextLine();
            if (noHP=="0") { // Anggep aja tombol cancel
                System.exit(0);
            }
            transfer(noHP);
        } else if (x==2) {
            System.out.flush();
            System.out.println("Silahkan masukkan nomor tujuan");
            System.out.println("Minta Pulsa : (contoh: 08xxxx atau 628xxxx)");
            scan = new Scanner(System.in);
            String noHP = scan.nextLine();
            if (noHP=="0") { // Anggep aja tombol cancel
                System.exit(0);
            }
            minta(noHP);
        } else if (x==3) {
            System.out.flush();
            System.out.println("Silahkan masukkan nomor tujuan yg anda");
            System.out.println(" Auto Transfer Pulsa: ");
            scan = new Scanner(System.in);
            String noHP = scan.nextLine();
            if (noHP=="0") { // Anggep aja tombol cancel
                System.exit(0);
            }
            auto(noHP);
        } else if (x==4) {
            delete();
        } else if (x==5) {
            System.out.flush();
            System.out.println("Terima kasih permintaan Anda sedang diproses. Nonton Film & Series Original Maxstream di Bioskop MAXstream");
            System.out.println("Hanya 110/h slm 360hr. Mau? CS:188");
            System.out.println("1.Ya");
            System.out.println("2. Tidak");
            scan = new Scanner(System.in);
            x = scan.nextInt();
            if (x==-1) { // Anggep aja tombol cancel
                System.exit(0);
            }
                    
            if (x==1) {
                System.out.flush();
                System.out.println("Terima kasih permintaan anda sedang diproses. Tunggu SMS notifikasi sebelum penggunaan");
            } else if (x==2){
                System.out.flush();
                System.out.println("Terima Kasih");
            } else {
                System.out.flush();
                System.out.println("invalid MMI code");
            }
        } else if (x==6) {
            System.out.flush();
            System.out.println("Maaf, input tidak valid");
        } else if (x==0) { //Anggep aja tombol cancel
            System.out.flush();
        } else {
            System.out.flush();
            System.out.println("Invalid MMI code");
        }
    }
    
    public static void transfer(String noHP) {
        Scanner scan = new Scanner(System.in);
        int x;
                
        System.out.flush();
        System.out.println("Silahkan masukkan jumlah pulsa yang akan ditransfer: (min 5000, max 1 jt & tanpa . (titik) atau , (koma))");
        scan = new Scanner(System.in);
        int pulsa = scan.nextInt();
        if (pulsa==0) { // Anggep aja tombol cancel
            System.exit(0);
        }
                
        System.out.flush();
        System.out.println("Hati2 penipuan. Anda akan Transfer Pulsa " + pulsa + " ke nomor " + noHP + " ? Biaya 1850 & 1Poin undian TP iPhone14");
        System.out.println("1.Ya");
        System.out.println("9.Back");
        System.out.println("0.Home");
        scan = new Scanner(System.in);
        x = scan.nextInt();
        if (x==-1) { // Anggep aja tombol cancel
            System.exit(0);
        }
                
        if (x==1) {
            System.out.flush();
            System.out.println("Terima kasih permintaan Anda sedang diproses. Nonton Film & Series Original Maxstream di Bioskop MAXstream");
            System.out.println("Hanya 110/h slm 360hr. Mau? CS:188");
            System.out.println("1.Ya");
            System.out.println("2. Tidak");
            scan = new Scanner(System.in);
            x = scan.nextInt();
            if (x==-1) { // Anggep aja tombol cancel
                System.exit(0);
            }
                    
            if (x==1) {
                System.out.flush();
                System.out.println("Terima kasih permintaan anda sedang diproses. Tunggu SMS notifikasi sebelum penggunaan");
            } else if (x==2){
                System.out.flush();
                System.out.println("Terima Kasih");
            } else {
                System.out.flush();
                System.out.println("invalid MMI code");
            }
        } else if (x==9) {
            transfer(noHP);
        } else if (x==0) {
            System.out.flush();
            menu();
        } else {
            System.out.flush();
            System.out.println("Invalid MMI code");
        }
    }
    
    public static void minta(String noHP){
        Scanner scan = new Scanner(System.in);
        int x;
                
        System.out.flush();
        System.out.println("Silahkan masukkan jumlah pulsa yang akan diminta: (min 5000, max 1 jt & tanpa . (titik) atau , (koma))");
        scan = new Scanner(System.in);
        int pulsa = scan.nextInt();
        if (pulsa==0) { // Anggep aja tombol cancel
            System.exit(0);
        }
                
        System.out.flush();
        System.out.println("Hati2 penipuan. Anda akan meminta pulsa " + pulsa + " ke nomor " + noHP + " ? Biaya Rp.100");
        System.out.println("1.Ya");
        System.out.println("9.Back");
        System.out.println("0.Home");
        scan = new Scanner(System.in);
        x = scan.nextInt();
        if (x==-1) { // Anggep aja tombol cancel
            System.exit(0);
        }
                
        if (x==1) {
            System.out.flush();
            System.out.println("Terima kasih permintaan Anda sedang diproses. Nonton Film & Series Original Maxstream di Bioskop MAXstream");
            System.out.println("Hanya 110/h slm 360hr. Mau? CS:188");
            System.out.println("1.Ya");
            System.out.println("2. Tidak");
            scan = new Scanner(System.in);
            x = scan.nextInt();
            if (x==-1) { // Anggep aja tombol cancel
                System.exit(0);
            }
                    
            if (x==1) {
                System.out.flush();
                System.out.println("Terima kasih permintaan anda sedang diproses. Tunggu SMS notifikasi sebelum penggunaan");
            } else if (x==2){
                System.out.flush();
                System.out.println("Terima Kasih");
            } else {
                System.out.flush();
                System.out.println("invalid MMI code");
            }
            
        } else if (x==9) {
            minta(noHP);
        } else if (x==0) {
            System.out.flush();
            menu();
        } else {
            System.out.flush();
            System.out.println("Invalid MMI code");
        }
    }
    
    public static void auto(String noHP){
        Scanner scan = new Scanner(System.in);
        int x;
                
        System.out.flush();
        System.out.println("Silahkan masukkan jumlah pulsa yang akan ditransfer: (min 5000, max 1 jt & tanpa . (titik) atau , (koma))");
        scan = new Scanner(System.in);
        int pulsa = scan.nextInt();
        if (pulsa==0) { // Anggep aja tombol cancel
            System.exit(0);
        }
        
        System.out.flush();
        System.out.println("Silahkan masukkan tanggal trasnfer, (cth: 15)");
        scan = new Scanner(System.in);
        int tanggal = scan.nextInt();
        if (tanggal==0) { // Anggep aja tombol cancel
            System.exit(0);
        }
                
        System.out.flush();
        System.out.println("Hati2 penipuan. Anda akan Transfer Pulsa " + pulsa + " ke nomor " + noHP + "setiap tanggal "+ tanggal + "? Biaya Rp.1850 & 1Poin undian TP iPhone14");
        System.out.println("1.Ya");
        System.out.println("9.Back");
        System.out.println("0.Home");
        scan = new Scanner(System.in);
        x = scan.nextInt();
        if (x==-1) { // Anggep aja tombol cancel
            System.exit(0);
        }
                
        if (x==1) {
            System.out.flush();
            System.out.println("Terima kasih permintaan Anda sedang diproses. Nonton Film & Series Original Maxstream di Bioskop MAXstream");
            System.out.println("Hanya 110/h slm 360hr. Mau? CS:188");
            System.out.println("1.Ya");
            System.out.println("2. Tidak");
            scan = new Scanner(System.in);
            x = scan.nextInt();
            if (x==-1) { // Anggep aja tombol cancel
                System.exit(0);
            }
                    
            if (x==1) {
                System.out.flush();
                System.out.println("Terima kasih permintaan anda sedang diproses. Tunggu SMS notifikasi sebelum penggunaan");
            } else if (x==2){
                System.out.flush();
                System.out.println("Terima Kasih");
            } else {
                System.out.flush();
                System.out.println("invalid MMI code");
            }
        } else if (x==9) {
            auto(noHP);
        } else if (x==0) {
            System.out.flush();
            menu();
        } else {
            System.out.flush();
            System.out.println("Invalid MMI code");
        }
    }
    
    public static void delete(){
        Scanner scan = new Scanner(System.in);
        int x;
        
        System.out.flush();
        System.out.println("Silahkan masukkan nomor tujuan yang akan dihapus dari list Auto Transfer");
        scan = new Scanner(System.in);
        String noHP = scan.nextLine();
        if (noHP=="0") { // Anggep aja tombol cancel
            System.exit(0);
        }
                
        System.out.flush();
        System.out.println("Anda akan menghapus nomor " + noHP + " dari daftar Auto TP Anda?");
        System.out.println("1.Setuju");
        System.out.println("9.Back");
        System.out.println("0.Home");
        scan = new Scanner(System.in);
        x = scan.nextInt();
        if (x==-1) { // Anggep aja tombol cancel
            System.exit(0);
        }
                
        if (x==1) {
            System.out.flush();
            System.out.println("Terima kasih permintaan Anda sedang diproses. Nonton Film & Series Original Maxstream di Bioskop MAXstream");
            System.out.println("Hanya 110/h slm 360hr. Mau? CS:188");
            System.out.println("1.Ya");
            System.out.println("2. Tidak");
            scan = new Scanner(System.in);
            x = scan.nextInt();
            if (x==-1) { // Anggep aja tombol cancel
                System.exit(0);
            }
                    
            if (x==1) {
                System.out.flush();
                System.out.println("Terima kasih permintaan anda sedang diproses. Tunggu SMS notifikasi sebelum penggunaan");
            } else if (x==2){
                System.out.flush();
                System.out.println("Terima Kasih");
            } else {
                System.out.flush();
                System.out.println("invalid MMI code");
            }
        } else if (x==9) {
            delete();
        } else if (x==0) {
            System.out.flush();
            menu();
        } else {
            System.out.flush();
            System.out.println("Invalid MMI code");
        }
    }

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        String call=scan.nextLine();
        
        if ("*858#".equals(call)) {
            menu();
        }
    }
    
}
