document.addEventListener('DOMContentLoaded', function() {
    // --- 1. Hamburger Menu ---
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const icon = menuToggle ? menuToggle.querySelector('i') : null;

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (icon) { icon.classList.remove('fa-times'); icon.classList.add('fa-bars'); }
        });
    });

    // --- 2. Navbar scroll effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // --- 3. Scroll Reveal ---
    const revealEls = document.querySelectorAll('.stat-box, .price-card, .portfolio-item, .brand-chip, .contact-card, .terms-card, .payment-box, .addons-container, .section-title, .section-subtitle');
    revealEls.forEach(el => el.classList.add('reveal'));

    function reveal() {
        document.querySelectorAll('.reveal').forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < window.innerHeight - 60) el.classList.add('active');
        });
    }
    window.addEventListener('scroll', reveal);
    reveal();

    // --- 4. Floating particles ---
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const p = document.createElement('div');
            const size = Math.random() * 6 + 3;
            Object.assign(p.style, {
                position: 'absolute',
                width: size + 'px', height: size + 'px',
                background: `rgba(232, 98, 140, ${Math.random() * 0.15 + 0.03})`,
                borderRadius: '50%',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animation: `floatParticle ${Math.random() * 8 + 6}s ease-in-out infinite`,
                animationDelay: Math.random() * 5 + 's'
            });
            particlesContainer.appendChild(p);
        }
        const style = document.createElement('style');
        style.textContent = `@keyframes floatParticle { 0%,100%{transform:translate(0,0) scale(1);opacity:0.5} 25%{transform:translate(${Math.random()*30-15}px,${Math.random()*-40}px) scale(1.2);opacity:0.8} 50%{transform:translate(${Math.random()*60-30}px,${Math.random()*-80}px) scale(0.8);opacity:0.3} 75%{transform:translate(${Math.random()*30-15}px,${Math.random()*-40}px) scale(1.1);opacity:0.6} }`;
        document.head.appendChild(style);
    }

    // --- 5. Typewriter ---
    const typeEl = document.getElementById('typewriter');
    const words = ["Content Creator", "Beauty Enthusiast", "TikTok Influencer", "Brand Partner"];
    let wi = 0, ci = 0, deleting = false;

    function typeWrite() {
        const word = words[wi];
        if (deleting) { typeEl.textContent = word.substring(0, --ci); }
        else { typeEl.textContent = word.substring(0, ++ci); }

        if (!deleting && ci === word.length) {
            deleting = true; setTimeout(typeWrite, 2000);
        } else if (deleting && ci === 0) {
            deleting = false; wi = (wi + 1) % words.length; setTimeout(typeWrite, 400);
        } else {
            setTimeout(typeWrite, deleting ? 80 : 160);
        }
    }
    if (typeEl) typeWrite();

    // --- 6. Active nav highlight ---
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 100;
        sections.forEach(sec => {
            const top = sec.offsetTop, h = sec.offsetHeight, id = sec.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (link) {
                if (scrollY >= top && scrollY < top + h) link.classList.add('active-link');
                else link.classList.remove('active-link');
            }
        });
    });
});

// --- WhatsApp Order ---
function pesanWhatsApp(layanan, harga) {
    const nomorWA = "6282140305590";
    const pesan = `Halo Kak Novi, saya tertarik untuk kerja sama.\n\nSaya ingin memesan paket:\n*${layanan}* seharga *${harga}*\n\nMohon info ketersediaan jadwalnya. Terima kasih!`;
    window.open(`https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`, '_blank');
}

// --- Copy Rekening ---
function copyRekening() {
    const btn = document.querySelector('.btn-copy');
    const icon = btn.querySelector('i');
    const text = btn.querySelector('.copy-text');

    navigator.clipboard.writeText("1921306470").then(() => {
        icon.classList.replace('fa-copy', 'fa-check');
        text.innerText = "Disalin!";
        btn.style.background = "#25D366";
        btn.style.borderColor = "#25D366";
        setTimeout(() => {
            icon.classList.replace('fa-check', 'fa-copy');
            text.innerText = "Salin";
            btn.style.background = "rgba(255,255,255,0.2)";
            btn.style.borderColor = "rgba(255,255,255,0.3)";
        }, 2000);
    }).catch(() => alert("Gagal menyalin. Silakan salin manual."));
}
