# 🌌 Fili — Cosmic Aurora Portfolio
## ✨ Tentang Proyek

Website portfolio ini dirancang dan dibangun dengan konsep visual **Cosmic Aurora** — memadukan nuansa luar angkasa (*deep starry night nebula*), pendaran cahaya aurora borealis berwarna *cyan-magenta*, tipografi modern monospaced yang futuristik, dan interaksi web yang mulus.

Dibangun menggunakan teknologi web murni (**Vanilla HTML5, CSS3, & JavaScript**) yang ringan, responsif, dan optimal untuk di-deploy langsung melalui **GitHub Pages**.

---

## 🚀 Fitur Utama & Visual Highlights

- 🌌 **Cosmic Starfield & Aurora Ribbons**:
  - Efek taburan bintang dinamis yang berkedip (*twinkling stars*) menggunakan HTML5 Canvas 2D.
  - Pita aurora ganda mengambang (*floating aurora ribbons*) dengan animasi gelombang halus dan efek *mouse parallax*.
- 🪐 **Transparent Glass Navigation Bar**:
  - Menu horizontal desktop transparan dengan efek teks aktif berpendar putih murni (`#ffffff glow`).
  - Fitur **ScrollSpy** otomatis yang menyinkronkan status menu aktif dengan section yang sedang dilihat.
  - Menu navigasi laci responsif (*drawer hamburger menu*) pada perangkat mobile dan tablet.
- 🎨 **Minimalist Profile Section (About)**:
  - Tata letak bersih bergaya kartu visual dengan avatar putih minimalis dan tipografi modern (*Roboto Mono* & *Outfit*).
- 🎠 **Interactive Project Carousel**:
  - Carousel kartu portofolio yang dapat digeser menggunakan tombol kontrol (*prev/next*), titik paginasi, *touch swipe* pada smartphone, maupun *drag-to-scroll* dengan mouse.
- 🧭 **Visual Journey Timeline**:
  - Garis waktu vertikal berpendar (*glowing milestone line*) yang mendokumentasikan perjalanan karir dan pencapaian desain.
- 📬 **Interactive Wireframe Contact Box**:
  - Formulir pengiriman pesan kosmik bergaya *wireframe* dengan validasi input dan integrasi email langsung.

---

## 🛠️ Tech Stack

| Komponen | Teknologi | Keterangan |
| :--- | :--- | :--- |
| **Markup** | HTML5 | Struktur semantik dan aksesibilitas ramah pembaca layar |
| **Styling** | Vanilla CSS3 | Modern CSS Variables, Flexbox, CSS Grid, Glassmorphism & Keyframe Animations |
| **Scripting** | Vanilla JavaScript (ES6+) | Canvas rendering, carousel logic, ScrollSpy, dan interaksi sentuh/mouse |
| **Typography**| Google Fonts | *Roboto Mono* (Heading & Logo), *Outfit / Clother* (Body Text) |
| **Hosting** | GitHub Pages | Static web hosting cepat & bebas dependensi |

---

## 📁 Struktur Direktori

```text
tugas_web/
├── index.html              # Halaman utama aplikasi portofolio
├── README.md               # Dokumentasi lengkap proyek
└── assets/                 # Direktori aset statis
    ├── css/
    │   └── style.css       # Seluruh aturan desain, animasi, dan breakpoint responsif
    ├── js/
    │   └── script.js       # Logika canvas bintang, carousel, dan interaksi UI
    └── images/             # Asset visual kosmik & aurora
        ├── aurora 1.png    # Aset pita aurora kiri
        ├── aurora 2.png    # Aset pita aurora kanan
        ├── aurora 3.png    # Varian resolusi tinggi aurora kiri
        ├── aurora 4.png    # Varian resolusi tinggi aurora kanan
        ├── background1.png # Background nebula kosmik
        └── background-nebula.png
