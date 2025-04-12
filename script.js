const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('toggle');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Tangkap semua tautan navigasi
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Cegah pindah halaman instan
            event.preventDefault();

            // Ambil URL tujuan
            const href = link.getAttribute('href');

            // Tambah kelas fade out
            document.body.classList.add('page-exit');

            // Hitung posisi tombol
            const rect = link.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;

            // Buat elemen burst
            const burst = document.createElement('div');
            burst.classList.add('burst');
            burst.style.left = `${x}px`;
            burst.style.top = `${y}px`;
            document.body.appendChild(burst);

            // Buat 8 partikel
            for (let i = 0; i < 8; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                particle.style.left = `${x}px`;
                particle.style.top = `${y}px`;
                // Arah acak: sudut 0-360 derajat, jarak 100-200px
                const angle = (i * 45) + (Math.random() * 20 - 10); // Sedikit variasi
                const distance = 100 + Math.random() * 100;
                const xOffset = Math.cos((angle * Math.PI) / 180) * distance;
                const yOffset = Math.sin((angle * Math.PI) / 180) * distance;
                particle.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
                document.body.appendChild(particle);
            }

            // Tunggu animasi selesai (0.5 detik)
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    });

    // Animasi masuk untuk halaman baru
    document.body.classList.add('page-enter');
    setTimeout(() => {
        document.body.classList.add('page-enter-active');
    }, 0);

    // Bersihkan kelas setelah animasi selesai (0.3 detik)
    setTimeout(() => {
        document.body.classList.remove('page-enter', 'page-enter-active');
    }, 300);

    // Bersihkan burst, partikel, dan kelas exit lama
    window.addEventListener('pageshow', () => {
        const bursts = document.querySelectorAll('.burst, .particle');
        bursts.forEach(burst => burst.remove());
        document.body.classList.remove('page-exit');
    });
});