// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    createDataViz();
    initNavigation();
    initSmoothScrolling();
    initCarousel();
    initModals();
});

// Animated data visualization in hero
function createDataViz() {
    const dataViz = document.getElementById('dataViz');
    if (!dataViz) return;
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Create data nodes
    for (let i = 0; i < 20; i++) {
        const node = document.createElement('div');
        node.className = 'data-node';
        node.style.left = Math.random() * width + 'px';
        node.style.top = Math.random() * height + 'px';
        node.style.animationDelay = Math.random() * 3 + 's';
        dataViz.appendChild(node);
    }
    
    // Create flowing lines
    for (let i = 0; i < 8; i++) {
        const line = document.createElement('div');
        line.className = 'data-line';
        line.style.top = Math.random() * height + 'px';
        line.style.width = (200 + Math.random() * 300) + 'px';
        line.style.animationDelay = Math.random() * 4 + 's';
        dataViz.appendChild(line);
    }
}

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (!navbar) return;
    
    // Navbar scroll effects
    window.addEventListener('scroll', () => {
        // Add scrolled class
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const scrollPosition = window.scrollY + 200;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        // Special case for last section when at bottom of page
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        if (window.scrollY + windowHeight >= documentHeight - 50) {
            const lastSection = sections[sections.length - 1];
            current = lastSection.getAttribute('id');
        }
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Smooth scrolling
function initSmoothScrolling() {
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
}

// Carousel functionality
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn--left');
    const nextBtn = document.querySelector('.carousel-btn--right');
    
    if (!track || !slides.length) return;
    
    let currentIndex = 0;
    
    function updateCarousel() {
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    });
    
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    });
    
    // Update on window resize
    window.addEventListener('resize', updateCarousel);
}

// Modal functionality
function initModals() {
    const modalBtns = document.querySelectorAll('.view-details-btn');
    const modals = document.querySelectorAll('.modal');
    const closeBtns = document.querySelectorAll('.modal-close');
    
    // Open modal
    modalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const modalId = btn.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close on background click
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.classList.remove('active');
            });
            document.body.style.overflow = 'auto';
        }
    });
}