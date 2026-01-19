// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => navMenu.classList.remove('active'));
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ============================================
    // GLITCH CAROUSEL - SIMPLIFIED
    // ============================================
    const carouselData = {
        sleepless: [
            { img: 'Assets/51-Sleepless.jpg', title: '51 Sleepless Nights', link: 'https://geni.us/51SleeplessNights', desc: 'The original collection of terrifying short stories that started it all.' },
            { img: 'Assets/52-Sleepless-768x1229.jpg', title: '52 Sleepless Nights', link: 'https://geni.us/52SleeplessNights', desc: 'The original collection of terrifying short stories that started it all.' },
            { img: 'Assets/53-Sleepless-768x1229.jpg', title: '53 Sleepless Nights', link: 'https://geni.us/53Sleepless', desc: 'The original collection of terrifying short stories that started it all.' },
            { img: 'Assets/54-Sleepless-768x1229.jpg', title: '54 Sleepless Nights', link: 'https://geni.us/54Sleepless', desc: 'The original collection of terrifying short stories that started it all.' }
        ],
        fantasy: [
            { img: 'Assets/Psychic-Curse.jpg', title: 'Psychic Curse', link: 'https://www.amazon.com/dp/B0G52ZP2B2', desc: "Martin gains psychic powers from a medical experiment enabling mind-reading. He's perpetually aware of never being fully alone." },
            { img: 'Assets/Road-from-Death-1.jpg', title: 'Road From Death', link: 'https://www.amazon.com/Road-Death-School-Rebirth-Reincarnation-ebook/dp/B07TDBPJ76', desc: 'An undead school promises spirits a chance to return. Will they risk their souls for rebirth?' },
            { img: 'Assets/Last-Man-1.jpg', title: 'The Last Man', link: 'https://www.amazon.com/Last-Man-Spiritual-Enlightenment-Complete-ebook/dp/B00KMFBKAC', desc: 'An adventure through seven surreal worlds, each representing enlightenment aspects.' }
        ],
        anthologies: [
            { img: 'Assets/Monster-Monster.jpg', title: 'Monstromonicon', link: 'http://geni.us/Monstro', desc: '100 Monster stories from around the world' },
            { img: 'Assets/Trees-Have-Eyes-1.jpg', title: 'The Trees Have Eyes', link: 'http://geni.us/QrPv', desc: '22 horror authors exploring forest terror' },
            { img: 'Assets/Alphabet-Soup.jpg', title: 'Alphabet Soup', link: 'http://geni.us/jFVIxs', desc: 'Original horror stories A-Z' },
            { img: 'Assets/Brutal-Bedtime-768x1229.jpg', title: 'Brutal Bedtime Stories', link: 'http://geni.us/BrutalBS', desc: 'Full-page illustrations included' },
            { img: 'Assets/Cure-for-Chaos-768x1229.jpg', title: 'A Cure For Chaos', link: 'http://geni.us/NosleepAuthors', desc: 'Hospital-based horror narratives' },
            { img: 'Assets/Love-Death-768x1229.jpg', title: 'Love, Death, and Other Inconveniences', link: 'http://geni.us/Lovedeath', desc: 'Horror stories of love and loss' }
        ],
        misc: [
            { img: 'Assets/Rhyming-Collection-768x1229.jpg', title: 'Graphic Novels', link: 'https://www.amazon.com/dp/B0DD8MQKW6', desc: 'Horror stories told in poetic verse with full illustrations' },
            { img: 'Assets/Integration-6.jpg', title: 'Philosophy', link: 'https://www.amazon.com/dp/B0FYRKZHG3', desc: 'Exploring consciousness, reality, and the nature of existence' }
        ]
    };

    const autoPlayInterval = 7800;
    let carouselIndex = 0;

    function initCarousel(carouselEl) {
        const carouselName = carouselEl.dataset.carousel;
        const data = carouselData[carouselName];
        if (!data) return;

        const myIndex = carouselIndex++;
        const staggerDelay = 1000 + (myIndex * 1950);

        let currentIndex = 0;
        let isAnimating = false;
        let glitchDisabledUntil = 0;
        let isPaused = false;
        let lastGlitchTime = 0;
        let autoPlayTimeout = null;
        const glitchDuration = 2000;

        // Cache all DOM elements once
        const slide = carouselEl.querySelector('.glitch-carousel-slide');
        const img = slide.querySelector('img');
        const titleEl = carouselEl.querySelector('.glitch-carousel-title');
        const descEl = carouselEl.querySelector('.carousel-description');
        const indicators = carouselEl.querySelectorAll('.carousel-indicator');
        const prevArrow = carouselEl.querySelector('.carousel-prev');
        const nextArrow = carouselEl.querySelector('.carousel-next');

        function updateIndicators(index) {
            indicators.forEach((ind, i) => ind.classList.toggle('active', i === index));
        }

        function transitionTo(newIndex) {
            if (isAnimating || newIndex === currentIndex) return;
            isAnimating = true;
            lastGlitchTime = Date.now();

            const useDissolve = Date.now() < glitchDisabledUntil;
            const animClass = useDissolve ? 'dissolving' : 'glitching';
            const duration = useDissolve ? 1500 : glitchDuration;
            const swapTime = useDissolve ? 750 : 1300;

            carouselEl.classList.add(animClass);

            setTimeout(() => {
                const newData = data[newIndex];
                img.src = newData.img;
                img.alt = newData.title;
                slide.href = newData.link;
                titleEl.textContent = newData.title;
                if (descEl) descEl.textContent = newData.desc || '';
                currentIndex = newIndex;
                updateIndicators(currentIndex);
            }, swapTime);

            setTimeout(() => {
                carouselEl.classList.remove(animClass);
                isAnimating = false;
            }, duration);
        }

        function nextSlide() {
            transitionTo((currentIndex + 1) % data.length);
        }

        function prevSlide() {
            transitionTo((currentIndex - 1 + data.length) % data.length);
        }

        function scheduleNext() {
            if (isPaused) return;
            clearTimeout(autoPlayTimeout);
            autoPlayTimeout = setTimeout(() => {
                nextSlide();
                scheduleNext();
            }, autoPlayInterval);
        }

        // Arrow navigation
        if (prevArrow) {
            prevArrow.addEventListener('click', () => {
                glitchDisabledUntil = Date.now() + 10000;
                prevSlide();
            });
        }

        if (nextArrow) {
            nextArrow.addEventListener('click', () => {
                glitchDisabledUntil = Date.now() + 10000;
                nextSlide();
            });
        }

        // Indicator navigation
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => transitionTo(index));
        });

        // Start with staggered delay
        setTimeout(() => {
            lastGlitchTime = Date.now();
            nextSlide();
            scheduleNext();
        }, staggerDelay);

        // Pause on hover - maintain timing offset
        carouselEl.addEventListener('mouseenter', () => {
            isPaused = true;
            clearTimeout(autoPlayTimeout);
        });

        carouselEl.addEventListener('mouseleave', () => {
            isPaused = false;
            // Calculate remaining time to maintain original offset
            const elapsed = Date.now() - lastGlitchTime;
            const remaining = Math.max(100, autoPlayInterval - elapsed);
            autoPlayTimeout = setTimeout(() => {
                nextSlide();
                scheduleNext();
            }, remaining);
        });
    }

    // Initialize all carousels
    document.querySelectorAll('.glitch-carousel').forEach(initCarousel);
});
