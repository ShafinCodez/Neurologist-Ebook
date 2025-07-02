document.addEventListener('DOMContentLoaded', () => {

    // Check which page we are on
    const isMainPage = document.getElementById('hero');
    const isThankYouPage = document.querySelector('.thankyou-page');

    // --- SHARED FUNCTIONS ---
    const setupScrollObserver = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    };

    // --- MAIN PAGE SCRIPTING ---
    if (isMainPage) {
        // Sticky Header
        const header = document.querySelector('.sticky-header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Background Particles
        if (window.CanvasParticles) {
            window.CanvasParticles.init({
                selector: '#particle-canvas',
                maxParticles: 100,
                speed: 0.4,
                color: '#6B7280',
                connectParticles: true,
                minDistance: 80,
                responsive: [
                    {
                        breakpoint: 768,
                        options: { maxParticles: 50, connectParticles: false }
                    }
                ]
            });
        }
        
        // Chapter Accordion
        const chapterHeaders = document.querySelectorAll('.chapter-card .card-header');
        chapterHeaders.forEach(clickedHeader => {
            clickedHeader.addEventListener('click', () => {
                const currentlyActive = document.querySelector('.chapter-card .card-header.active');
                
                if (currentlyActive && currentlyActive !== clickedHeader) {
                    currentlyActive.classList.remove('active');
                    currentlyActive.nextElementSibling.style.maxHeight = '0px';
                }

                clickedHeader.classList.toggle('active');
                const cardBody = clickedHeader.nextElementSibling;
                if (clickedHeader.classList.contains('active')) {
                    cardBody.style.maxHeight = cardBody.scrollHeight + "px";
                } else {
                    cardBody.style.maxHeight = '0px';
                }
            });
        });

        // Subscription Form Handling
        const subForm = document.getElementById('subscription-form');
        subForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('button[type="submit"]');

            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                window.location.href = `thankyou.html`;
            }, 1500);
        });
        
        // General Scroll Animations
        setupScrollObserver();
    }

    // --- THANK YOU PAGE SCRIPTING ---
    if (isThankYouPage) {
        // Confetti Celebration
        if (typeof confetti === 'function') {
            const duration = 5 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0, colors: ['#FBBF24', '#F59E0B', '#6B7280', '#1F2937'] };

            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }

            const interval = setInterval(function() {
                const timeLeft = animationEnd - Date.now();
                if (timeLeft <= 0) return clearInterval(interval);

                const particleCount = 50 * (timeLeft / duration);
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
            }, 250);
        }
        
        // TIMER LOGIC REMOVED
    }
});
