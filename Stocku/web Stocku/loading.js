document.addEventListener("DOMContentLoaded", () => {
    const loadingIcon = document.getElementById("loading-icon");
    const rotatingCircle = document.getElementById("rotating-circle");

    // Setelah 10 detik, ganti loading icon dengan notif icon
    setTimeout(() => {
        // Ganti icon loading menjadi notif dan terapkan ukuran notif
        loadingIcon.src = "image/notif berhasil masuk.svg";
        loadingIcon.classList.add("notif-icon");
        rotatingCircle.style.display = 'none'; // Hentikan animasi putar
    }, 10000);

    // Setelah 15 detik (10 detik loading + 5 detik notif), navigasi ke home.html
    setTimeout(() => {
        window.location.href = "home.html";
    }, 12000);
});
