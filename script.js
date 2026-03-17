// ===== VHS/CRT EFFECTS =====

// VHS timestamp in footer
document.addEventListener('DOMContentLoaded', () => {
    const ts = document.getElementById('timestamp');
    if (ts) {
        const updateTimestamp = () => {
            const now = new Date();
            const h = String(now.getHours()).padStart(2, '0');
            const m = String(now.getMinutes()).padStart(2, '0');
            const s = String(now.getSeconds()).padStart(2, '0');
            ts.textContent = `${h}:${m}:${s}`;
        };
        updateTimestamp();
        setInterval(updateTimestamp, 1000);
    }

    // Random VHS glitch on title
    const title = document.querySelector('.hero-title');
    if (title) {
        setInterval(() => {
            if (Math.random() < 0.1) {
                title.style.transform = `translate(${(Math.random() - 0.5) * 4}px, ${(Math.random() - 0.5) * 2}px)`;
                setTimeout(() => {
                    title.style.transform = 'translate(0, 0)';
                }, 50);
            }
        }, 200);
    }

    // Card hover sound effect (visual glitch)
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.filter = `hue-rotate(${Math.random() * 20 - 10}deg)`;
            setTimeout(() => {
                card.style.filter = '';
            }, 150);
        });
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Intersection observer for fade-in
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .shop-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s, transform 0.6s';
        observer.observe(el);
    });
});
