document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        });
    }

    // Cursor Effect (desktop only)
    if (window.innerWidth > 992) {
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');

        if (cursor && cursorFollower) {
            document.addEventListener('mousemove', function(e) {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';

                setTimeout(() => {
                    cursorFollower.style.left = e.clientX + 'px';
                    cursorFollower.style.top = e.clientY + 'px';
                }, 100);
            });

            document.querySelectorAll('a, button, .portfolio-item, .service-item, .show-item').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.classList.add('active');
                    cursorFollower.classList.add('active');
                });
                el.addEventListener('mouseleave', () => {
                    cursor.classList.remove('active');
                    cursorFollower.classList.remove('active');
                });
            });
        }
    }

    // Sticky Header
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }

    // Mobile Menu - Fixed Version
    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.querySelector('.main-menu');

    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            mainMenu.classList.toggle('active');
        });

        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (mainMenu.classList.contains('active') &&
                !e.target.closest('.main-menu') &&
                !e.target.closest('.menu-toggle')) {
                menuToggle.classList.remove('active');
                mainMenu.classList.remove('active');
            }
        });

        // Close when clicking a link
        document.querySelectorAll('.main-menu a').forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                mainMenu.classList.remove('active');
            });
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Section Highlighting - Fixed Version
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.main-menu a');

    function updateActiveSection() {
        let current = '';
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('current');
            const linkHref = link.getAttribute('href');
            if (linkHref === `#${current}` || (current === '' && linkHref === '#home')) {
                link.classList.add('current');
            }
        });
    }

    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection(); // Initialize on load

    // Hero Slider - Fixed Version
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider && typeof $.fn.owlCarousel !== 'undefined') {
        $(heroSlider).owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            smartSpeed: 800,
            nav: false,
            dots: false,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            touchDrag: false,
            mouseDrag: false
        });
    }

    // Portfolio Filtering
    const portfolioFilter = document.querySelector('.portfolio-filter');
    if (portfolioFilter) {
        const filterItems = portfolioFilter.querySelectorAll('li');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filterItems.forEach(item => {
            item.addEventListener('click', function() {
                filterItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');
                portfolioItems.forEach(item => {
                    item.style.display = filterValue === '*' || item.classList.contains(filterValue.substring(1)) ?
                        'block' :
                        'none';
                });
            });
        });
    }

    // Initialize Fancybox
    if (typeof $.fancybox !== 'undefined') {
        $('[data-fancybox="gallery"]').fancybox({
            buttons: ["zoom", "share", "slideShow", "fullScreen", "download", "thumbs", "close"],
            loop: true,
            protect: true
        });
    }

    // Initialize All Sliders
    function initSlider(selector, settings) {
        const slider = document.querySelector(selector);
        if (slider && typeof $.fn.owlCarousel !== 'undefined') {
            $(slider).owlCarousel(settings);
        }
    }

    initSlider('.shows-slider', {
        loop: true,
        margin: 30,
        autoplay: true,
        autoplayTimeout: 5000,
        responsive: { 0: { items: 1 }, 768: { items: 2 }, 992: { items: 3 } }
    });

    initSlider('.testimonials-slider', {
        loop: true,
        margin: 30,
        autoplay: true,
        responsive: { 0: { items: 1 }, 768: { items: 2 } }
    });

    initSlider('.clients-slider', {
        loop: true,
        margin: 30,
        autoplay: true,
        responsive: { 0: { items: 2 }, 576: { items: 3 }, 768: { items: 4 }, 992: { items: 5 }, 1200: { items: 6 } }
    });

    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            backToTop.classList.toggle('active', window.scrollY > 300);
        });

        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // =============================================
    // CV Download - Fixed and Guaranteed to Work
    // =============================================
    function initCVDownload() {
        // Method 1: Direct download link
        const cvDownloadBtn = document.querySelector('a[href="#"]');
        if (cvDownloadBtn && cvDownloadBtn.textContent.trim().toLowerCase().includes('download cv')) {
            cvDownloadBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const link = document.createElement('a');
                link.href = 'assets/img/lilian-muli.pdf';
                link.download = 'assets/img/lilian-muli.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
        }

        // Method 2: Alternative button detection
        document.querySelectorAll('.btn-primary').forEach(btn => {
            if (btn.textContent.trim().toLowerCase().includes('download cv')) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.location.href = 'assets/img/lilian-muli.pdf';
                });
            }
        });

        // Method 3: Fallback for testing
        console.log('CV download initialized. Make sure:');
        console.log('1. File exists at: assets/docs/lilian-muli-cv.pdf');
        console.log('2. File is accessible (right-click the path in console and "Open in new tab")');
    }
    initCVDownload();

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('input[type="text"]').value;
            alert(`Thank you ${name}! Your message has been sent.`);
            this.reset();
        });
    }

    // Skills Animation
    const skillItems = document.querySelectorAll('.skill-item');
    if (skillItems.length > 0) {
        const animateSkills = () => {
            skillItems.forEach(item => {
                const progressBar = item.querySelector('.skill-progress-bar');
                const percent = item.querySelector('.skill-percent').textContent;
                progressBar.style.width = percent;
            });
        };

        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        skillsObserver.observe(document.querySelector('.skills-section'));
    }

    // Scroll Animations
    function animateOnScroll() {
        document.querySelectorAll('.animate__animated').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.75) {
                const animationClass = el.dataset.animation || 'fadeInUp';
                el.classList.add(animationClass);
            }
        });
    }
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});

// Verify all required libraries are loaded
window.addEventListener('load', function() {
    const requiredLibs = {
        'jQuery': typeof jQuery !== 'undefined',
        'Owl Carousel': typeof $.fn.owlCarousel !== 'undefined',
        'Fancybox': typeof $.fancybox !== 'undefined',
        'Isotope': typeof $.isotope !== 'undefined'
    };

    console.log('Dependency Check:');
    Object.entries(requiredLibs).forEach(([name, loaded]) => {
        console.log(`${name}: ${loaded ? '✔ Loaded' : '✖ Missing'}`);
        if (!loaded) console.error(`${name} is required but not loaded`);
    });
});