document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menuBtn");
    const navDrawer = document.getElementById("navDrawer");
    const card = document.querySelector(".card");
    const brandTitle = document.querySelector(".brand-title");

    if (menuBtn) {
        menuBtn.innerHTML = `
            <svg class="menu-logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12 2.5C12 2.5 5.5 10.2 5.5 14.8C5.5 18.39 8.41 21.3 12 21.3C15.59 21.3 18.5 18.39 18.5 14.8C18.5 10.2 12 2.5 12 2.5Z" fill="currentColor"/>
                <circle cx="10" cy="15" r="1.4" fill="#0f766e"/>
                <circle cx="13.8" cy="13.2" r="1.1" fill="#0f766e"/>
            </svg>
        `;
        menuBtn.setAttribute("title", "Buka Menu Navigasi");
        menuBtn.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
    }

    if (navDrawer) {
        navDrawer.classList.remove("active");
    }

    let backdrop = document.querySelector(".nav-backdrop");
    if (!backdrop && navDrawer) {
        backdrop = document.createElement("div");
        backdrop.className = "nav-backdrop";
        document.body.appendChild(backdrop);
    }

    function setMenuOpen(isOpen) {
        if (!navDrawer || !menuBtn) return;
        navDrawer.classList.toggle("active", isOpen);
        menuBtn.classList.toggle("is-open", isOpen);
        menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
        if (backdrop) {
            backdrop.classList.toggle("active", isOpen);
        }
    }

    if (menuBtn && navDrawer) {
        menuBtn.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            const isOpen = navDrawer.classList.contains("active");
            setMenuOpen(!isOpen);
        });

        if (backdrop) {
            backdrop.addEventListener("click", function () {
                setMenuOpen(false);
            });
        }

        navDrawer.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                setMenuOpen(false);
            });
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                setMenuOpen(false);
            }
        });
    }

    const namaWeb = brandTitle && brandTitle.textContent.trim()
        ? brandTitle.textContent.trim()
        : "Edukasi Kolera";

    if (card && !card.querySelector(".kolera-tag")) {
        const pageLabels = {
            "index.html": "Beranda • " + namaWeb,
            "profil.html": "Profil Penyakit • Vibrio cholerae",
            "gejala.html": "Gejala Klinis • Tanda Dehidrasi",
            "penyebab.html": "Penyebab & Penularan • Sanitasi",
            "pencegahan.html": "Pencegahan • Air Aman & PHBS",
            "penanganan.html": "Penanganan Medis • Rehidrasi",
            "konsultasi.html": "Konsultasi • Formulir Tanya Jawab",
            "kontak.html": "Kontak & Referensi • " + namaWeb
        };

        const rawFile = window.location.pathname.split("/").pop();
        const fileName = rawFile && rawFile.trim() !== "" ? rawFile : "index.html";
        const tag = document.createElement("div");
        tag.className = "kolera-tag";
        tag.textContent = pageLabels[fileName] || namaWeb;
        card.prepend(tag);
    }

    const formKonsultasi = document.getElementById("formKonsultasi");
    if (formKonsultasi) {
        formKonsultasi.addEventListener("submit", function (event) {
            event.preventDefault();

            let isValid = true;

            const nama = document.getElementById("nama");
            const email = document.getElementById("email");
            const telepon = document.getElementById("telepon");
            const pesan = document.getElementById("pesan");

            const errNama = document.getElementById("errNama");
            const errEmail = document.getElementById("errEmail");
            const errTelepon = document.getElementById("errTelepon");
            const errPesan = document.getElementById("errPesan");
            const successBanner = document.getElementById("successBanner");

            [errNama, errEmail, errTelepon, errPesan].forEach(function (el) {
                if (el) el.style.display = "none";
            });
            if (successBanner) successBanner.style.display = "none";

            if (!nama || nama.value.trim().length < 3) {
                if (errNama) {
                    errNama.textContent = "Nama lengkap wajib diisi (minimal 3 karakter).";
                    errNama.style.display = "block";
                }
                isValid = false;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailPattern.test(email.value.trim())) {
                if (errEmail) {
                    errEmail.textContent = "Masukkan alamat email yang valid (contoh: nama@email.com).";
                    errEmail.style.display = "block";
                }
                isValid = false;
            }

            const phonePattern = /^[0-9]{10,15}$/;
            if (!telepon || !phonePattern.test(telepon.value.trim())) {
                if (errTelepon) {
                    errTelepon.textContent = "Nomor telepon harus berupa angka (10–15 digit).";
                    errTelepon.style.display = "block";
                }
                isValid = false;
            }

            if (!pesan || pesan.value.trim().length < 10) {
                if (errPesan) {
                    errPesan.textContent = "Pesan atau keluhan wajib diisi minimal 10 karakter.";
                    errPesan.style.display = "block";
                }
                isValid = false;
            }

            if (isValid && successBanner) {
                successBanner.innerHTML =
                    "<strong>Terima kasih, " +
                    nama.value.trim() +
                    "!</strong> Pertanyaan konsultasi Anda pada " +
                    namaWeb +
                    " telah tercatat.";
                successBanner.style.display = "block";
                formKonsultasi.reset();
            }
        });
    }
});