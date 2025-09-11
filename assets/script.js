/* ==============================
Fade in animation 
============================== */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ==============================
Carousel 
============================== */
(function () {
    var currentSlide = 0;
    var carouselTrack = document.getElementById('carouselTrack');
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');
    var indicatorsContainer = document.getElementById('carouselIndicators');
    var indicators = [];
    var autoPlayInterval;
    var totalSlides = 4;

    indicatorsContainer.innerHTML = '';

    for (var i = 0; i < totalSlides; i++) {
        var indicator = document.createElement('div');
        indicator.className = 'carousel-indicator';
        if (i === 0) {
            indicator.classList.add('active');
        }
        indicator.setAttribute('data-slide', i);
        indicator.addEventListener('click', function () {
            goToSlide(parseInt(this.getAttribute('data-slide')));
        });
        indicatorsContainer.appendChild(indicator);
        indicators.push(indicator);
    }

    function updateCarousel() {
        var translateX = -currentSlide * 100;
        carouselTrack.style.transform = 'translateX(' + translateX + '%)';

        for (var i = 0; i < indicators.length; i++) {
            indicators[i].classList.remove('active');
        }
        indicators[currentSlide].classList.add('active');
    }

    function goToSlide(slideIndex) {
        if (slideIndex >= 0 && slideIndex < totalSlides) {
            currentSlide = slideIndex;
            updateCarousel();
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    function startAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    var carouselWrapper = document.querySelector('.carousel-wrapper');
    if (carouselWrapper) {
        carouselWrapper.addEventListener('mouseenter', stopAutoPlay);
        carouselWrapper.addEventListener('mouseleave', startAutoPlay);

        var touchStartX = 0;
        carouselWrapper.addEventListener('touchstart', function (e) {
            touchStartX = e.touches[0].clientX;
        });
        carouselWrapper.addEventListener('touchend', function (e) {
            var touchEndX = e.changedTouches[0].clientX;
            var diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        });
    }

    updateCarousel();
    startAutoPlay();
})();

/* ==============================
Mobile Carousel
============================== */
(function () {
    var currentSlide = 0;
    var carouselTrack = document.getElementById('carouselTrack');
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');
    var indicatorsContainer = document.getElementById('carouselIndicators');
    var indicators = [];
    var autoPlayInterval;

    // Card data - total 12 cards in 4 slides, 3 cards each
    var allCatCards = [
        // Slide 1
        [
            { name: 'Adolfina', age: '1 ano', gender: 'Feminino', breed: 'Europeu Comum', image: './assets/img/Adolfina1.png' },
            { name: 'Baunilha', age: '2 anos', gender: 'Masculino', breed: 'Europeu Comum', image: './assets/img/Baunilha.png' },
            { name: 'Brownie', age: '2 anos', gender: 'Masculino', breed: 'Siamês', image: './assets/img/Brownie.png' }
        ],
        // Slide 2
        [
            { name: 'Daisy', age: '1 ano', gender: 'Feminino', breed: 'Pelo Longo', image: './assets/img/Daisy.png' },
            { name: 'Flash', age: '3 anos', gender: 'Masculino', breed: 'Pelo Longo', image: './assets/img/Flash.jpg' },
            { name: 'Gaio', age: '2 anos', gender: 'Masculino', breed: 'Chartreux', image: './assets/img/Gaio.jpg' }
        ],
        // Slide 3
        [
            { name: 'Gafanhoto', age: '1 ano', gender: 'Masculino', breed: 'Europeu Comum', image: './assets/img/Gafanhoto.jpg' },
            { name: 'Harley Quinn', age: '10 anos', gender: 'Feminino', breed: 'Calico', image: './assets/img/Harley Quinn.jpg' },
            { name: 'Isa', age: '10 meses', gender: 'Feminino', breed: 'Europeu Comum', image: './assets/img/Isa.jpg' }
        ],
        // Slide 4
        [
            { name: 'Jubileu', age: '5 anos', gender: 'Masculino', breed: 'Europeu Comum', image: './assets/img/Jubileu.jpg' },
            { name: 'Judy', age: '10 anos', gender: 'Feminino', breed: 'Europeu Comum', image: './assets/img/Judy.jpg' },
            { name: 'Kika', age: '1 ano', gender: 'Feminino', breed: 'Pelo Longo', image: './assets/img/Kika.jpg' }
        ]
    ];

    // Function to determine number of cards per slide
    function getCardsPerSlide() {
        var screenWidth = window.innerWidth;
        if (screenWidth >= 1024) {
            return 3; // 3 cards per row for large screens
        } else {
            return 1; // 1 card for mobile and tablets
        }
    }

    // Function to create card HTML
    function createCatCard(cat) {
        return `
            <div class="cat-preview-card">
                <img src="${cat.image}" alt="${cat.name}" loading="lazy">
                <div class="cat-preview-info">
                    <h3>${cat.name}</h3>
                    <p>${cat.age} • ${cat.gender} • ${cat.breed}</p>
                    <span class="cat-preview-status">Disponível</span>
                </div>
            </div>
        `;
    }

    // Function to rebuild the carousel
    function rebuildCarousel() {
        var cardsPerSlide = getCardsPerSlide();
        var allCats = allCatCards.flat(); // Flatten 2D array to 1D
        var totalSlides;
        var slidesHTML = '';

        if (cardsPerSlide === 1) {
            // For mobile: each card = separate slide
            totalSlides = allCats.length;
            allCats.forEach(function (cat) {
                slidesHTML += `
                    <div class="carousel-slide">
                        ${createCatCard(cat)}
                    </div>
                `;
            });
        } else {
            // For large screens: 3 cards per slide
            totalSlides = allCatCards.length;
            allCatCards.forEach(function (slideData) {
                var slideCardsHTML = '';
                slideData.forEach(function (cat) {
                    slideCardsHTML += createCatCard(cat);
                });
                slidesHTML += `
                    <div class="carousel-slide">
                        ${slideCardsHTML}
                    </div>
                `;
            });
        }

        // Update carousel HTML
        carouselTrack.innerHTML = slidesHTML;

        // Recreate indicators
        createIndicators(totalSlides);

        // Reset current slide
        currentSlide = 0;
        updateCarousel();

        return totalSlides;
    }

    // Function to create indicators
    function createIndicators(totalSlides) {
        indicatorsContainer.innerHTML = '';
        indicators = [];

        for (var i = 0; i < totalSlides; i++) {
            var indicator = document.createElement('div');
            indicator.className = 'carousel-indicator';
            if (i === 0) {
                indicator.classList.add('active');
            }
            indicator.setAttribute('data-slide', i);
            indicator.addEventListener('click', function () {
                goToSlide(parseInt(this.getAttribute('data-slide')));
            });
            indicatorsContainer.appendChild(indicator);
            indicators.push(indicator);
        }
    }

    // Function to update carousel position
    function updateCarousel() {
        var translateX = -currentSlide * 100;
        carouselTrack.style.transform = 'translateX(' + translateX + '%)';

        for (var i = 0; i < indicators.length; i++) {
            indicators[i].classList.remove('active');
        }
        if (indicators[currentSlide]) {
            indicators[currentSlide].classList.add('active');
        }
    }

    // Function to go to a specific slide
    function goToSlide(slideIndex) {
        var totalSlides = indicators.length;
        if (slideIndex >= 0 && slideIndex < totalSlides) {
            currentSlide = slideIndex;
            updateCarousel();
        }
    }

    // Function for next slide
    function nextSlide() {
        var totalSlides = indicators.length;
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }

    // Function for previous slide
    function prevSlide() {
        var totalSlides = indicators.length;
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    // Autoplay functions
    function startAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        });
    }

    // Stop autoplay on interaction
    var carouselWrapper = document.querySelector('.carousel-wrapper');
    if (carouselWrapper) {
        carouselWrapper.addEventListener('mouseenter', stopAutoPlay);
        carouselWrapper.addEventListener('mouseleave', startAutoPlay);

        // Touch events for mobile
        var touchStartX = 0;
        carouselWrapper.addEventListener('touchstart', function (e) {
            touchStartX = e.touches[0].clientX;
            stopAutoPlay();
        });

        carouselWrapper.addEventListener('touchend', function (e) {
            var touchEndX = e.changedTouches[0].clientX;
            var diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
            startAutoPlay();
        });
    }

    // Initialization function and window resize handling
    function handleResize() {
        rebuildCarousel();
        startAutoPlay();
    }

    // Window resize handler with debounce
    var resizeTimeout;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 250);
    });

    // Orientation change handler for mobile
    window.addEventListener('orientationchange', function () {
        setTimeout(handleResize, 500);
    });

    // Carousel initialization
    function initCarousel() {
        if (carouselTrack && indicatorsContainer) {
            rebuildCarousel();
            startAutoPlay();
        }
    }

    // Start on DOM load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCarousel);
    } else {
        initCarousel();
    }

    // Forced initialization after 1 second (in case something didn't work)
    setTimeout(function () {
        if (carouselTrack && !carouselTrack.innerHTML.trim()) {
            initCarousel();
        }
    }, 1000);
})();

/* ==============================
Stats card
============================== */
function animateCounters() {
    var counters = document.querySelectorAll('.stat-number');
    for (var i = 0; i < counters.length; i++) {
        var counter = counters[i];
        var target = counter.textContent;
        var isNumber = !isNaN(parseInt(target));

        if (isNumber) {
            animateCounter(counter, parseInt(target));
        }
    }
}

function animateCounter(element, endValue) {
    var startValue = 0;
    var duration = 2000;
    var step = endValue / (duration / 16);
    var current = startValue;

    var timer = setInterval(function () {
        current += step;
        if (current >= endValue) {
            current = endValue;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Checking element visibility
function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Animation of the appearance of elements
function checkFadeIn() {
    var fadeElements = document.querySelectorAll('.fade-in');
    for (var i = 0; i < fadeElements.length; i++) {
        var element = fadeElements[i];
        if (isElementInViewport(element)) {
            element.classList.add('visible');
        }
    }
}

// Checking the visibility of statistics
var statsAnimated = false;
function checkStats() {
    if (statsAnimated) return;

    var statsSection = document.querySelector('.stats');
    if (statsSection && isElementInViewport(statsSection)) {
        setTimeout(function () {
            animateCounters();
        }, 500);
        statsAnimated = true;
    }
}

// Launch on page load
window.addEventListener('load', function () {
    checkFadeIn();
    checkStats();
});

// Launch on scroll
window.addEventListener('scroll', function () {
    checkFadeIn();
    checkStats();
});

// Launch on window resize
window.addEventListener('resize', function () {
    checkFadeIn();
    checkStats();
});

/* ==============================
FAQ Section
============================== */
document.addEventListener('DOMContentLoaded', function () {
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            // Close all items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

/* ==============================
Contact Section
============================== */
// Contact Form JavaScript for GitHub Pages
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const form = this;
            const formData = new FormData(form);
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;

            // Show loading state
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;

            // Remove any existing messages
            const existingMessage = form.querySelector('.form-message');
            if (existingMessage) {
                existingMessage.remove();
            }

            // For GitHub Pages, you'll need to replace this URL with your actual form service
            // Options: Formspree, Netlify Forms, EmailJS, etc.
            fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        // Show success message
                        const successMessage = document.createElement('div');
                        successMessage.className = 'form-message success';
                        successMessage.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
                        form.insertBefore(successMessage, form.firstChild);

                        // Reset form
                        form.reset();
                    } else {
                        throw new Error('Erro no envio');
                    }
                })
                .catch(error => {
                    // Show error message
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'form-message error';
                    errorMessage.textContent = 'Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente.';
                    form.insertBefore(errorMessage, form.firstChild);
                })
                .finally(() => {
                    // Reset button
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
});

// Alternative: Simple mailto fallback for GitHub Pages
function sendEmailFallback() {
    const firstName = document.getElementById('firstName')?.value || '';
    const lastName = document.getElementById('lastName')?.value || '';
    const email = document.getElementById('email')?.value || '';
    const phone = document.getElementById('phone')?.value || '';
    const subject = document.getElementById('subject')?.value || '';
    const message = document.getElementById('message')?.value || '';

    const emailSubject = subject ? `[${subject}] Contato do site` : 'Contato do site';
    const emailBody = `Nome: ${firstName} ${lastName}
        Email: ${email}
        Telefone: ${phone}
        Assunto: ${subject}

        Mensagem:
        ${message}`;

    const mailtoLink = `mailto:info@amigatosdamilkinha.pt?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
}

// To use mailto fallback instead of Formspree, uncomment the lines below:
/*
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) { 
            e.preventDefault(); 
            sendEmailFallback(); 
        });
    }
});
*/

/* ==============================
Mobile Nav. menu 
============================== */
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuButton = document.getElementById('mobileMenu');
    const navigationMenu = document.querySelector('.nav-links');
    const navButtons = document.querySelector('.nav-buttons');
    const languageSwitcher = document.querySelector('.language-switcher');

    // Create mobile overlay
    let mobileOverlay = document.querySelector('.mobile-overlay');
    if (!mobileOverlay) {
        mobileOverlay = document.createElement('div');
        mobileOverlay.className = 'mobile-overlay';
        document.body.appendChild(mobileOverlay);
    }

    // Check if elements exist
    if (!mobileMenuButton || !navigationMenu) {
        console.error('Mobile menu elements not found');
        return;
    }

    // Toggle mobile menu
    function toggleMobileMenu(e) {
        e.preventDefault();
        e.stopPropagation();

        const isOpen = navigationMenu.classList.contains('mobile-active');

        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    // Open mobile menu
    function openMobileMenu() {
        // Сначала показываем overlay
        mobileOverlay.style.display = 'block';
        mobileOverlay.classList.add('active');

        // Затем активируем меню
        navigationMenu.classList.add('mobile-active');
        mobileMenuButton.classList.add('active');

        // Show buttons and language switcher on mobile
        if (navButtons) {
            navButtons.classList.add('mobile-active');
        }
        if (languageSwitcher) {
            languageSwitcher.classList.add('mobile-active');
        }

        // Prevent background scroll
        document.body.style.overflow = 'hidden';
    }

    // Close mobile menu
    function closeMobileMenu() {
        navigationMenu.classList.remove('mobile-active');
        mobileMenuButton.classList.remove('active');
        mobileOverlay.classList.remove('active');

        // Hide buttons and language switcher
        if (navButtons) {
            navButtons.classList.remove('mobile-active');
        }
        if (languageSwitcher) {
            languageSwitcher.classList.remove('mobile-active');
        }

        // Restore background scroll
        document.body.style.overflow = '';

        // Hide overlay after animation
        setTimeout(() => {
            if (!mobileOverlay.classList.contains('active')) {
                mobileOverlay.style.display = 'none';
            }
        }, 300);
    }

    // Event listeners
    mobileMenuButton.addEventListener('click', toggleMobileMenu);

    // Close menu when clicking on navigation links
    navigationMenu.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
            closeMobileMenu();
        }
    });

    // Close menu when clicking on nav buttons
    if (navButtons) {
        navButtons.addEventListener('click', function (e) {
            if (e.target.tagName === 'A') {
                closeMobileMenu();
            }
        });
    }

    // Close menu when clicking on overlay
    mobileOverlay.addEventListener('click', closeMobileMenu);

    // Close menu on window resize to desktop
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });

    // Handle escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navigationMenu.classList.contains('mobile-active')) {
            closeMobileMenu();
        }
    });

    // Ensure overlay is properly hidden on page load
    mobileOverlay.style.display = 'none';
});

// Navbar scroll effect (keep existing)
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});
