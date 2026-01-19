/**
 * Haunted House Publishing - Main JavaScript
 * https://tobiaswade.com
 *
 * Performance-optimized, accessible carousel and navigation system
 */

(function() {
    'use strict';

    // ============================================
    // CONFIGURATION
    // ============================================
    const CONFIG = {
        carousel: {
            autoPlayInterval: 7800,
            glitchDuration: 2000,
            dissolveDuration: 1500,
            staggerDelay: 1950,
            baseDelay: 1000,
            glitchCooldown: 10000
        }
    };

    // ============================================
    // BOOK DATA - Centralized for programmatic SEO
    // ============================================
    const BOOK_DATA = {
        sleepless: [
            {
                img: '51-Sleepless.jpg',
                title: '51 Sleepless Nights',
                link: 'https://geni.us/51SleeplessNights',
                desc: 'The original collection of terrifying short stories that started it all.',
                genre: 'Horror Short Stories'
            },
            {
                img: '52-Sleepless-768x1229.jpg',
                title: '52 Sleepless Nights',
                link: 'https://geni.us/52SleeplessNights',
                desc: 'More spine-chilling tales to keep you up at night.',
                genre: 'Horror Short Stories'
            },
            {
                img: '53-Sleepless-768x1229.jpg',
                title: '53 Sleepless Nights',
                link: 'https://geni.us/53Sleepless',
                desc: 'The terror continues with fresh nightmares.',
                genre: 'Horror Short Stories'
            },
            {
                img: '54-Sleepless-768x1229.jpg',
                title: '54 Sleepless Nights',
                link: 'https://geni.us/54Sleepless',
                desc: 'The latest installment in the bestselling series.',
                genre: 'Horror Short Stories'
            }
        ],
        fantasy: [
            {
                img: 'Psychic-Curse.jpg',
                title: 'Psychic Curse',
                link: 'https://www.amazon.com/dp/B0G52ZP2B2',
                desc: "Martin gains psychic powers from a medical experiment enabling mind-reading. He's perpetually aware of never being fully alone.",
                genre: 'Dark Fantasy'
            },
            {
                img: 'Road-from-Death-1.jpg',
                title: 'Road From Death',
                link: 'https://www.amazon.com/Road-Death-School-Rebirth-Reincarnation-ebook/dp/B07TDBPJ76',
                desc: 'An undead school promises spirits a chance to return. Will they risk their souls for rebirth?',
                genre: 'Dark Fantasy'
            },
            {
                img: 'Last-Man-1.jpg',
                title: 'The Last Man',
                link: 'https://www.amazon.com/Last-Man-Spiritual-Enlightenment-Complete-ebook/dp/B00KMFBKAC',
                desc: 'An adventure through seven surreal worlds, each representing enlightenment aspects.',
                genre: 'Philosophical Fantasy'
            }
        ],
        anthologies: [
            {
                img: 'Monster-Monster.jpg',
                title: 'Monstromonicon',
                link: 'http://geni.us/Monstro',
                desc: '100 Monster stories from around the world',
                genre: 'Horror Anthology'
            },
            {
                img: 'Trees-Have-Eyes-1.jpg',
                title: 'The Trees Have Eyes',
                link: 'http://geni.us/QrPv',
                desc: '22 horror authors exploring forest terror',
                genre: 'Horror Anthology'
            },
            {
                img: 'Alphabet-Soup.jpg',
                title: 'Alphabet Soup',
                link: 'http://geni.us/jFVIxs',
                desc: 'Original horror stories A-Z',
                genre: 'Horror Anthology'
            },
            {
                img: 'Brutal-Bedtime-768x1229.jpg',
                title: 'Brutal Bedtime Stories',
                link: 'http://geni.us/BrutalBS',
                desc: 'Full-page illustrations included',
                genre: 'Illustrated Horror'
            },
            {
                img: 'Cure-for-Chaos-768x1229.jpg',
                title: 'A Cure For Chaos',
                link: 'http://geni.us/NosleepAuthors',
                desc: 'Hospital-based horror narratives',
                genre: 'Medical Horror'
            },
            {
                img: 'Love-Death-768x1229.jpg',
                title: 'Love, Death, and Other Inconveniences',
                link: 'http://geni.us/Lovedeath',
                desc: 'Horror stories of love and loss',
                genre: 'Dark Romance Horror'
            }
        ],
        misc: [
            {
                img: 'Rhyming-Collection-768x1229.jpg',
                title: 'Graphic Novels',
                link: 'https://www.amazon.com/dp/B0DD8MQKW6',
                desc: 'Horror stories told in poetic verse with full illustrations',
                genre: 'Graphic Novel'
            },
            {
                img: 'Integration-6.jpg',
                title: 'Philosophy',
                link: 'https://www.amazon.com/dp/B0FYRKZHG3',
                desc: 'Exploring consciousness, reality, and the nature of existence',
                genre: 'Philosophy'
            }
        ]
    };

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================
    const utils = {
        /**
         * Debounce function for performance
         */
        debounce(fn, delay) {
            let timeoutId;
            return (...args) => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => fn.apply(this, args), delay);
            };
        },

        /**
         * Safely query selector with null check
         */
        $(selector, context = document) {
            return context.querySelector(selector);
        },

        /**
         * Safely query all selectors
         */
        $$(selector, context = document) {
            return context.querySelectorAll(selector);
        }
    };

    // ============================================
    // MOBILE NAVIGATION
    // ============================================
    function initMobileNavigation() {
        const navToggle = utils.$('.nav-toggle');
        const navMenu = utils.$('.nav-menu');

        if (!navToggle || !navMenu) return;

        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking links
        utils.$$('a', navMenu).forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.focus();
            }
        });
    }

    // ============================================
    // SMOOTH SCROLL
    // ============================================
    function initSmoothScroll() {
        utils.$$('a[href^="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                const target = utils.$(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Update focus for accessibility
                    target.setAttribute('tabindex', '-1');
                    target.focus({ preventScroll: true });
                }
            });
        });
    }

    // ============================================
    // GLITCH CAROUSEL
    // ============================================
    function initCarousels() {
        const carousels = utils.$$('.glitch-carousel');
        let carouselIndex = 0;

        carousels.forEach(carouselEl => {
            initSingleCarousel(carouselEl, carouselIndex++);
        });
    }

    function initSingleCarousel(carouselEl, index) {
        const carouselName = carouselEl.dataset.carousel;
        const data = BOOK_DATA[carouselName];

        if (!data || data.length === 0) return;

        const { autoPlayInterval, glitchDuration, dissolveDuration, staggerDelay, baseDelay, glitchCooldown } = CONFIG.carousel;
        const myStaggerDelay = baseDelay + (index * staggerDelay);

        // State
        let currentIndex = 0;
        let isAnimating = false;
        let glitchDisabledUntil = 0;
        let isPaused = false;
        let lastGlitchTime = 0;
        let autoPlayTimeout = null;

        // Cache DOM elements
        const elements = {
            slide: utils.$('.glitch-carousel-slide', carouselEl),
            img: utils.$('.glitch-carousel-slide img', carouselEl),
            title: utils.$('.glitch-carousel-title', carouselEl),
            desc: utils.$('.carousel-description', carouselEl),
            indicators: utils.$$('.carousel-indicator', carouselEl),
            prevArrow: utils.$('.carousel-prev', carouselEl),
            nextArrow: utils.$('.carousel-next', carouselEl)
        };

        // Functions
        function updateIndicators(newIndex) {
            elements.indicators.forEach((ind, i) => {
                const isActive = i === newIndex;
                ind.classList.toggle('active', isActive);
                ind.setAttribute('aria-selected', isActive);
            });
        }

        function updateContent(newIndex) {
            const book = data[newIndex];
            elements.img.src = book.img;
            elements.img.alt = `${book.title} book cover - ${book.genre} by Tobias Wade`;
            elements.slide.href = book.link;
            elements.slide.setAttribute('aria-label', `${book.title} - ${book.genre}`);
            elements.title.textContent = book.title;
            if (elements.desc) elements.desc.textContent = book.desc || '';
            currentIndex = newIndex;
            updateIndicators(currentIndex);
        }

        function transitionTo(newIndex) {
            if (isAnimating || newIndex === currentIndex) return;
            isAnimating = true;
            lastGlitchTime = Date.now();

            const useDissolve = Date.now() < glitchDisabledUntil;
            const animClass = useDissolve ? 'dissolving' : 'glitching';
            const duration = useDissolve ? dissolveDuration : glitchDuration;
            const swapTime = useDissolve ? 750 : 1300;

            carouselEl.classList.add(animClass);

            // Preload next image
            const nextImg = new Image();
            nextImg.src = data[newIndex].img;

            setTimeout(() => updateContent(newIndex), swapTime);
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

        // Event handlers
        if (elements.prevArrow) {
            elements.prevArrow.addEventListener('click', () => {
                glitchDisabledUntil = Date.now() + glitchCooldown;
                prevSlide();
            });
        }

        if (elements.nextArrow) {
            elements.nextArrow.addEventListener('click', () => {
                glitchDisabledUntil = Date.now() + glitchCooldown;
                nextSlide();
            });
        }

        elements.indicators.forEach((indicator, i) => {
            indicator.addEventListener('click', () => {
                if (i !== currentIndex) {
                    glitchDisabledUntil = Date.now() + glitchCooldown;
                    transitionTo(i);
                }
            });
        });

        // Keyboard navigation for accessibility
        carouselEl.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                glitchDisabledUntil = Date.now() + glitchCooldown;
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                glitchDisabledUntil = Date.now() + glitchCooldown;
                nextSlide();
            }
        });

        // Pause on hover/focus
        carouselEl.addEventListener('mouseenter', () => {
            isPaused = true;
            clearTimeout(autoPlayTimeout);
        });

        carouselEl.addEventListener('mouseleave', () => {
            isPaused = false;
            const elapsed = Date.now() - lastGlitchTime;
            const remaining = Math.max(100, autoPlayInterval - elapsed);
            autoPlayTimeout = setTimeout(() => {
                nextSlide();
                scheduleNext();
            }, remaining);
        });

        carouselEl.addEventListener('focusin', () => {
            isPaused = true;
            clearTimeout(autoPlayTimeout);
        });

        carouselEl.addEventListener('focusout', (e) => {
            if (!carouselEl.contains(e.relatedTarget)) {
                isPaused = false;
                scheduleNext();
            }
        });

        // Start carousel with staggered delay
        setTimeout(() => {
            lastGlitchTime = Date.now();
            nextSlide();
            scheduleNext();
        }, myStaggerDelay);
    }

    // ============================================
    // LAZY LOADING ENHANCEMENT
    // ============================================
    function initLazyLoading() {
        if ('loading' in HTMLImageElement.prototype) {
            // Native lazy loading supported
            return;
        }

        // Fallback for older browsers
        const lazyImages = utils.$$('img[loading="lazy"]');
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        imageObserver.unobserve(img);
                    }
                });
            });

            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }

    // ============================================
    // INITIALIZATION
    // ============================================
    function init() {
        initMobileNavigation();
        initSmoothScroll();
        initCarousels();
        initLazyLoading();
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export book data for programmatic use
    window.HauntedHousePublishing = {
        BOOK_DATA,
        CONFIG
    };

})();
