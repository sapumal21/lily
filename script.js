/* ==========================================================================
   HAPPY BIRTHDAY WEBSITE - JAVASCRIPT LOGIC
   Dual Sinhala & English Modal Note + Clean Typography
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------------------
    // 1. CUSTOM MOUSE CURSOR TRAIL
    // ----------------------------------------------------------------------
    const cursorDot = document.getElementById('cursor-dot');
    if (cursorDot) {
        window.addEventListener('mousemove', (e) => {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
        });
    }

    // ----------------------------------------------------------------------
    // 2. CATEGORIZED PHOTO DATA
    // ----------------------------------------------------------------------
    const galleryPhotos = [
        // Category 1: Her Personal Photos 👑
        {
            src: 'assets/508832500_122135962466708216_6534865170912289865_n.jpg',
            caption: 'Precious Smile & Beautiful Moments 💖',
            category: 'personal',
            categoryName: '👑 Her Moments'
        },
        {
            src: 'assets/585095088_122152551320708216_8948264330331204382_n.jpg',
            caption: 'Cozy Days & Wonderful Sunshine ☀️',
            category: 'personal',
            categoryName: '👑 Her Moments'
        },
        {
            src: 'assets/FB_IMG_1790041809355.jpg',
            caption: 'Lost in the World of Stories 📚',
            category: 'personal',
            categoryName: '👑 Her Moments'
        },
        {
            src: 'assets/FB_IMG_1790041988421.jpg',
            caption: 'Warm Smiles & Sweet Energy ✨',
            category: 'personal',
            categoryName: '👑 Her Moments'
        },
        {
            src: 'assets/FB_IMG_1790042484660.jpg',
            caption: 'Simple Joys of Life 🍃',
            category: 'personal',
            categoryName: '👑 Her Moments'
        },
        {
            src: 'assets/IMG-20260718-WA0034.jpg',
            caption: 'Special Birthday Celebration 🎂',
            category: 'personal',
            categoryName: '👑 Her Moments'
        },

        // Category 2: Things She Loves (Avocado & Pumpkin) 🥑🎃
        {
            src: 'assets/Cute Pumpkin Illustration.jpg',
            caption: 'Cute Pumpkin Patch Vibe 🎃',
            category: 'favorites',
            categoryName: '🥑🎃 Avocados & Pumpkins'
        },
        {
            src: 'assets/Pumpkin Spice Latte Phone Background.jpg',
            caption: 'Pumpkin Spice Cozy Warmth ☕',
            category: 'favorites',
            categoryName: '🥑🎃 Avocados & Pumpkins'
        },
        {
            src: 'assets/download (1).jpg',
            caption: 'Fresh Avocado Delight 🥑',
            category: 'favorites',
            categoryName: '🥑🎃 Avocados & Pumpkins'
        },

        // Category 3: Cozy Book & Library Aesthetics 📚
        {
            src: 'assets/olga-tutunaru-JMATuFkXeHU-unsplash.jpg',
            caption: 'A Magical Library of Dreams ✨',
            category: 'books',
            categoryName: '📚 Cozy Books'
        },
        {
            src: 'assets/sincerely-media-nGrfKmtwv24-unsplash.jpg',
            caption: 'Peaceful Reading Nook 📖',
            category: 'books',
            categoryName: '📚 Cozy Books'
        },
        {
            src: 'assets/download.jpg',
            caption: 'Vintage Books & Warm Aesthetics ☕',
            category: 'books',
            categoryName: '📚 Cozy Books'
        }
    ];

    // ----------------------------------------------------------------------
    // 3. BACKGROUND PARTICLES CANVAS
    // ----------------------------------------------------------------------
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const particleTypes = ['🥑', '🎃', '📚', '✨', '🍂', '💖'];
        const particles = Array.from({ length: 22 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 16 + 14,
            speedY: Math.random() * 0.8 + 0.3,
            speedX: Math.sin(Math.random() * Math.PI) * 0.5,
            icon: particleTypes[Math.floor(Math.random() * particleTypes.length)],
            opacity: Math.random() * 0.5 + 0.2,
            rotation: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 0.8
        }));

        function animateParticles() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.y += p.speedY;
                p.x += Math.sin(p.y * 0.01) * p.speedX;
                p.rotation += p.rotSpeed;

                if (p.y > height + 40) {
                    p.y = -40;
                    p.x = Math.random() * width;
                }

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.globalAlpha = p.opacity;
                ctx.font = `${p.size}px serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(p.icon, 0, 0);
                ctx.restore();
            });

            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    // ----------------------------------------------------------------------
    // 4. AUDIO SYNTHESIZER & MUSIC ENGINE
    // ----------------------------------------------------------------------
    let audioCtx = null;
    let isPlaying = false;
    let synthTimer = null;
    const musicBtn = document.getElementById('music-toggle');

    function initAudio() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    const melodyNotes = [
        261.63, 261.63, 293.66, 261.63, 349.23, 329.63,
        261.63, 261.63, 293.66, 261.63, 392.00, 349.23,
        261.63, 261.63, 523.25, 440.00, 349.23, 329.63, 293.66,
        466.16, 466.16, 440.00, 349.23, 392.00, 349.23
    ];
    let noteIdx = 0;

    function playCozyNote(freq) {
        if (!audioCtx || audioCtx.state === 'suspended') return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 1.3);
    }

    function toggleMusic() {
        initAudio();
        if (audioCtx.state === 'suspended') audioCtx.resume();

        if (isPlaying) {
            clearInterval(synthTimer);
            isPlaying = false;
            if (musicBtn) musicBtn.classList.remove('playing');
        } else {
            isPlaying = true;
            if (musicBtn) musicBtn.classList.add('playing');
            synthTimer = setInterval(() => {
                playCozyNote(melodyNotes[noteIdx]);
                noteIdx = (noteIdx + 1) % melodyNotes.length;
            }, 600);
        }
    }

    if (musicBtn) musicBtn.addEventListener('click', toggleMusic);

    function playChimeEffect() {
        initAudio();
        if (!audioCtx) return;
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
            setTimeout(() => playCozyNote(freq), idx * 120);
        });
    }

    // ----------------------------------------------------------------------
    // 5. INTERACTIVE PROPS & WAX SEAL MODAL WITH SINHALA / ENGLISH OPTION
    // ----------------------------------------------------------------------
    const secretModal = document.getElementById('secret-modal');
    const secretIcon = document.getElementById('secret-icon');
    const secretTitle = document.getElementById('secret-title');
    const secretSi = document.getElementById('secret-si');
    const secretEn = document.getElementById('secret-en');
    const modalLangTabs = document.getElementById('modal-lang-tabs');
    const tabSi = document.getElementById('modal-tab-si');
    const tabEn = document.getElementById('modal-tab-en');
    const secretClose = document.getElementById('secret-close');

    function openSecretModal(icon, title, msgSi, msgEn) {
        if (!secretModal) return;

        if (secretIcon) secretIcon.textContent = icon;
        if (secretTitle) secretTitle.textContent = title;

        if (msgSi && msgEn) {
            if (modalLangTabs) modalLangTabs.style.display = 'flex';
            if (secretSi) {
                secretSi.textContent = msgSi;
                secretSi.style.display = 'block';
            }
            if (secretEn) {
                secretEn.textContent = msgEn;
                secretEn.style.display = 'none';
            }
            if (tabSi) tabSi.classList.add('active');
            if (tabEn) tabEn.classList.remove('active');
        } else {
            if (modalLangTabs) modalLangTabs.style.display = 'none';
            if (secretSi) secretSi.style.display = 'none';
            if (secretEn) {
                secretEn.textContent = msgEn || msgSi;
                secretEn.style.display = 'block';
            }
        }

        secretModal.classList.add('active');
        playChimeEffect();
    }

    // Modal Tab Click Events
    if (tabSi && tabEn) {
        tabSi.addEventListener('click', () => {
            tabSi.classList.add('active');
            tabEn.classList.remove('active');
            if (secretSi) secretSi.style.display = 'block';
            if (secretEn) secretEn.style.display = 'none';
        });

        tabEn.addEventListener('click', () => {
            tabEn.classList.add('active');
            tabSi.classList.remove('active');
            if (secretEn) secretEn.style.display = 'block';
            if (secretSi) secretSi.style.display = 'none';
        });
    }

    // Wax Seal Action with Both Sinhala & English Options!
    const waxSeal = document.getElementById('wax-seal');
    if (waxSeal) {
        waxSeal.addEventListener('click', () => {
            openSecretModal(
                '✉️',
                'Unsealed Birthday Note',
                'ඔයාට සුබම සුබ උපන්දිනයක් වේවා! ඔයා හරි ලස්සන, හිත හොද ගෑනු ළමයෙක්. ලැබුවා වූ මේ අලුත් අවුරුද්ද ඔයාගේ ජීවිතේ සතුටම පිරුණු අවුරුද්දක් වේවා!',
                'To an extraordinary soul: May this birthday be the start of a year filled with unforgettable stories, cozy evenings, good health, and infinite happiness!'
            );
        });
    }

    // Avocado Prop
    const propAvocado = document.getElementById('prop-avocado');
    if (propAvocado) {
        propAvocado.addEventListener('click', () => {
            openSecretModal(
                '🥑',
                'Fresh Avocado Wisdom',
                'ඔබ ඔබ වටා සිටින සැමටම නැවුම් ශක්තියක් සහ සතුටක් ගෙන දෙන අතිශය විශේෂ කෙනෙකි!',
                'Like a perfectly ripe avocado, you bring pure goodness, warmth, and joy to every single day!'
            );
        });
    }

    // Pumpkin Prop
    const propPumpkin = document.getElementById('prop-pumpkin');
    if (propPumpkin) {
        propPumpkin.addEventListener('click', () => {
            if (!isPlaying) toggleMusic();
            openSecretModal(
                '🎃',
                'Pumpkin Spice Magic',
                'ඔබගේ නව වසර අමතක නොවන සුන්දර මතකවලින් පිරේවා!',
                'Cozy vibes unlocked! Background lofi music activated. Enjoy the warm autumn glow!'
            );
        });
    }

    // Books Prop
    const bookQuotesEn = [
        "'There is no friend as loyal as a book.' - Ernest Hemingway",
        "'Fairy tales are more than true: not because they tell us that dragons exist, but because they tell us that dragons can be beaten.' - Neil Gaiman",
        "'You can never get a cup of tea large enough or a book long enough to suit me.' - C.S. Lewis"
    ];
    const bookQuotesSi = [
        "'පොත්පත් මෙන්ම විශ්වාසවන්ත තවත් මිතුරෙකු නැත.' - ර්නස්ට් හෙමිංවේ",
        "'ලෝකයේ සොඳුරුතම අත්දැකීමක් වන්නේ පොතක් අතර අතරමං වීමයි.'",
        "'ඔබේ ජීවිතයේ හැම පරිච්ඡේදයක්ම සුන්දර කතාවකින් පිරී ඉතිරී යාවා!'"
    ];

    const propBooks = document.getElementById('prop-books');
    if (propBooks) {
        propBooks.addEventListener('click', () => {
            const idx = Math.floor(Math.random() * bookQuotesEn.length);
            openSecretModal('📚', 'Bookish Quote', bookQuotesSi[idx], bookQuotesEn[idx]);
        });
    }

    if (secretClose && secretModal) {
        secretClose.addEventListener('click', () => secretModal.classList.remove('active'));
    }

    // ----------------------------------------------------------------------
    // 6. CATEGORIZED GALLERY & 3D TILT EFFECT
    // ----------------------------------------------------------------------
    const galleryGrid = document.getElementById('gallery-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCapEN = document.getElementById('lightbox-cap-en');
    const lightboxCategory = document.getElementById('lightbox-category');
    const lightboxClose = document.getElementById('lightbox-close');

    function renderGallery(filterCategory = 'all') {
        if (!galleryGrid) return;
        galleryGrid.innerHTML = '';

        const filteredPhotos = filterCategory === 'all'
            ? galleryPhotos
            : galleryPhotos.filter(p => p.category === filterCategory);

        filteredPhotos.forEach((photo) => {
            const card = document.createElement('div');
            card.className = 'polaroid-card';

            card.innerHTML = `
                <div class="polaroid-img-wrapper">
                    <img src="${photo.src}" alt="${photo.caption}" class="polaroid-img" loading="lazy" />
                </div>
                <div class="polaroid-caption">
                    <p class="caption-en">${photo.caption}</p>
                    <span class="caption-category">${photo.categoryName}</span>
                </div>
            `;

            // 3D Tilt on mousemove for desktop
            card.addEventListener('mousemove', (e) => {
                if (window.innerWidth < 768) return;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                card.style.transform = `perspective(800px) rotateX(${-y / 12}deg) rotateY(${x / 12}deg) translateY(-10px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });

            card.addEventListener('click', () => {
                if (lightbox && lightboxImg) {
                    lightboxImg.src = photo.src;
                    if (lightboxCapEN) lightboxCapEN.textContent = photo.caption;
                    if (lightboxCategory) lightboxCategory.textContent = photo.categoryName;
                    lightbox.classList.add('active');
                }
            });

            galleryGrid.appendChild(card);
        });
    }

    renderGallery('all');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');
            renderGallery(category);
        });
    });

    if (lightboxClose && lightbox) {
        lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) lightbox.classList.remove('active');
        });
    }

    // ----------------------------------------------------------------------
    // 7. CANDLE BLOWING & CONFETTI ENGINE
    // ----------------------------------------------------------------------
    const candleContainer = document.getElementById('cake-container');
    const candleFlame = document.getElementById('candle-flame');
    const blowBtn = document.getElementById('blow-candle-btn');
    const wishModal = document.getElementById('wish-modal');
    const wishModalClose = document.getElementById('wish-modal-close');

    function extinguishCandle() {
        if (!candleFlame) return;
        candleFlame.classList.add('extinguished');
        playChimeEffect();
        triggerConfetti();

        setTimeout(() => {
            if (wishModal) wishModal.classList.add('active');
        }, 600);
    }

    if (candleContainer) candleContainer.addEventListener('click', extinguishCandle);
    if (blowBtn) blowBtn.addEventListener('click', extinguishCandle);
    if (wishModalClose && wishModal) wishModalClose.addEventListener('click', () => wishModal.classList.remove('active'));

    function triggerConfetti() {
        const count = 120;
        for (let i = 0; i < count; i++) {
            const confettiEl = document.createElement('div');
            confettiEl.style.position = 'fixed';
            confettiEl.style.width = `${Math.random() * 8 + 6}px`;
            confettiEl.style.height = `${Math.random() * 14 + 8}px`;
            confettiEl.style.backgroundColor = ['#E67E22', '#5B8C5A', '#F1C40F', '#E74C3C', '#9B59B6', '#3498DB'][Math.floor(Math.random() * 6)];
            confettiEl.style.left = `${Math.random() * 100}vw`;
            confettiEl.style.top = '-20px';
            confettiEl.style.zIndex = '9999';
            confettiEl.style.pointerEvents = 'none';
            confettiEl.style.borderRadius = '2px';
            confettiEl.style.transform = `rotate(${Math.random() * 360}deg)`;

            document.body.appendChild(confettiEl);

            const fallDuration = Math.random() * 2.5 + 2;
            confettiEl.animate([
                { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
                { transform: `translateY(105vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
            ], {
                duration: fallDuration * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => confettiEl.remove();
        }
    }

    // ----------------------------------------------------------------------
    // 8. COZY NOOK MODALS
    // ----------------------------------------------------------------------
    const nookCards = document.querySelectorAll('.nook-card');
    nookCards.forEach(card => {
        card.addEventListener('click', () => {
            const icon = card.getAttribute('data-icon') || '📚';
            const title = card.getAttribute('data-title') || 'Book Lover Secret';
            const msgEn = card.getAttribute('data-msg') || 'May your life be filled with as many beautiful moments as your favorite books!';
            const msgSi = 'ඔබගේ ජීවිතයේ හැම පරිච්ඡේදයක්ම අසීමිත සතුටින් සහ සුවපහසුවෙන් පිරී ඉතිරී යාවා!';
            openSecretModal(icon, title, msgSi, msgEn);
        });
    });
});
