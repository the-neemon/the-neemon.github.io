/**
 * Interactive Background and UI Effects
 */

// Create interactive particles 




// Create animated backgrounds




// Wave effect function - removed
/*
function createWaveEffect() {
    const wave = document.createElement('div');
    wave.className = 'wave-container';
    
    for (let i = 1; i <= 3; i++) {
        const wavePath = document.createElement('div');
        wavePath.className = `wave wave-${i}`;
        wave.appendChild(wavePath);
    }
    
    document.body.appendChild(wave);
}
*/

// Interactive section animations on scroll
function initScrollAnimations() {
    // Add fade-in class to sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });
    
    // Handle scroll animations
    const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight * 0.85;
        
        // Animate sections when they come into view
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            
            if (scrollPosition > sectionTop) {
                section.classList.add('visible');
            }
        });
        
        // Animate other elements when they come into view
        const animatableElements = document.querySelectorAll('.skill-tag, .timeline-entry, .project-card, .education-card');
        animatableElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top + window.scrollY;
            
            if (scrollPosition > elementTop) {
                element.classList.add('visible');
                
                // Add staggered animation to skill tags
                if (element.classList.contains('skill-tag')) {
                    const index = Array.from(element.parentNode.children).indexOf(element);
                    element.style.transitionDelay = `${index * 0.05}s`;
                }
            }
        });
    };
    
    // Initial check
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
}

// Interactive hover effects for sections

// Initialize mobile menu functionality
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('menu');
    const overlay = document.getElementById('overlay');
    
    if (mobileMenuToggle && menu && overlay) {
        mobileMenuToggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        overlay.addEventListener('click', () => {
            menu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    }
    
    // Handle active state for navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove active class from all links
            navLinks.forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Close mobile menu if open
            menu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // Set active link based on scroll position
    window.addEventListener('scroll', () => {
        let currentSection = '';
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

// Make background more interactive with mouse movement

// Create enhanced particles with different properties
function createEnhancedParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'interactive-particles';
    document.body.appendChild(particleContainer);
    
    // Create particles with varying properties
    const numberOfParticles = window.innerWidth < 768 ? 15 : 30;
    
    for (let i = 0; i < numberOfParticles; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random size between 6 and 24 pixels
            const size = Math.random() * 18 + 6;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random starting position across the screen width
            const startingX = Math.random() * window.innerWidth;
            particle.style.left = `${startingX}px`;
            particle.style.bottom = '0';
            
            // Randomize opacity
            const opacity = Math.random() * 0.5 + 0.2;
            particle.style.opacity = opacity;
            
            // Random color tint (light blues to whites)
            const hue = Math.random() * 40 + 200; // Blue range
            const saturation = Math.random() * 40 + 10; // Low to moderate saturation
            const lightness = Math.random() * 20 + 80; // High lightness for bright particles
            particle.style.backgroundColor = `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`;
            
            // Randomize animation properties
            const duration = Math.random() * 15 + 15; // 15-30 seconds
            const delay = Math.random() * 15; // 0-15 seconds delay
            
            // Custom animation timing function for more natural movement
            const timingFunctions = [
                'cubic-bezier(0.47, 0, 0.745, 0.715)', // Sine In
                'cubic-bezier(0.39, 0.575, 0.565, 1)', // Sine Out
                'cubic-bezier(0.445, 0.05, 0.55, 0.95)', // Sine In Out
                'cubic-bezier(0.55, 0.085, 0.68, 0.53)', // Quad In
                'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Quad Out
            ];
            
            const randomTimingFunction = timingFunctions[Math.floor(Math.random() * timingFunctions.length)];
            particle.style.animation = `float ${duration}s ${randomTimingFunction} ${delay}s infinite`;
            
            // Add particle to the container
            particleContainer.appendChild(particle);
            
            // Remove particle after animation to prevent memory issues
            setTimeout(() => {
                if (particle.parentNode === particleContainer) {
                    particleContainer.removeChild(particle);
                }
            }, (duration + delay) * 1000);
        }, i * 400); // Staggered creation
    }
    
    // Set interval to continually create new particles
    setInterval(() => {
        if (particleContainer.childElementCount < numberOfParticles) {
            createParticle(particleContainer);
        }
    }, 2000);
}

// Add hometown gallery scrolling functionality
function initHometownGalleryScroll() {
    const gallery = document.getElementById('hometown-gallery');
    const container = document.querySelector('.hometown-gallery-container');
    const leftIndicator = document.querySelector('.left-indicator');
    const rightIndicator = document.querySelector('.right-indicator');
    
    if (!gallery || !container) return;
    
    // Add GPU acceleration hint for smoother scrolling
    gallery.style.transform = 'translateZ(0)';
    gallery.style.willChange = 'scroll-position';
    
    // Update indicator visibility based on scroll position
    function updateIndicators() {
        if (gallery.scrollLeft <= 20) {
            leftIndicator.classList.add('faded');
        } else {
            leftIndicator.classList.remove('faded');
        }
        
        if (gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 20) {
            rightIndicator.classList.add('faded');
        } else {
            rightIndicator.classList.remove('faded');
        }
    }
    
    // Initialize indicators
    updateIndicators();
    
    // Handle manual indicator clicks with faster scrolling
    leftIndicator.addEventListener('click', () => {
        gallery.scrollBy({ left: -600, behavior: 'smooth' });
    });
    
    rightIndicator.addEventListener('click', () => {
        gallery.scrollBy({ left: 600, behavior: 'smooth' });
    });
    
    // Handle scroll events to update indicators with debounce
    let scrollTimeout;
    gallery.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateIndicators, 10);
    });
    
    // Add improved touch scrolling for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;
    let lastTouchTime = 0;
    
    gallery.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        lastTouchTime = Date.now();
    }, { passive: true });
    
    gallery.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const touchDuration = Date.now() - lastTouchTime;
        handleSwipe(touchDuration);
    }, { passive: true });
    
    function handleSwipe(duration) {
        const swipeDistance = touchStartX - touchEndX;
        const velocity = Math.abs(swipeDistance) / duration; // Calculate velocity
        
        if (Math.abs(swipeDistance) > 30) {
            // Apply scrolling with momentum based on velocity
            const momentum = Math.min(velocity * 200, 1200); // Cap maximum momentum
            gallery.scrollBy({
                left: swipeDistance * (1 + momentum/500),
                behavior: 'smooth'
            });
        }
    }
}

// Initialize all interactive elements when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Replace original createParticles with enhanced version
    initScrollAnimations();
    // initHoverEffects();
    initMobileMenu();
    // initInteractiveBackground(); // Add the new interactive background
    
    // Initialize hometown gallery scrolling
    initHometownGalleryScroll();
    
    // Make sure all sections are visible initially if JavaScript is disabled
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(el => {
            if (!el.classList.contains('visible')) {
                el.classList.add('visible');
            }
        });
    }, 200);
});

// Enhance text analyzer experience
document.addEventListener('DOMContentLoaded', function() {
    const analyzeBtn = document.getElementById('analyze-btn');
    const sampleTextBtn = document.getElementById('sample-text-btn');
    const clearTextBtn = document.getElementById('clear-text-btn');
    const textInput = document.getElementById('text-input');
    
    if (analyzeBtn) {
        analyzeBtn.addEventListener('mouseenter', () => {
            analyzeBtn.classList.add('pulse');
        });
        
        analyzeBtn.addEventListener('mouseleave', () => {
            analyzeBtn.classList.remove('pulse');
        });
        
        // Add loading state visual feedback
        analyzeBtn.addEventListener('click', function() {
            if (textInput && textInput.value.trim().split(/\s+/).length >= 10000) {
                this.classList.add('loading');
                this.disabled = true;
                
                // Reset state after analysis completes
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.disabled = false;
                }, 1500); // This should match the analysis time in text-analyzer.js
            }
        });
    }
    
    // Enhanced sample text button interaction
    if (sampleTextBtn) {
        sampleTextBtn.addEventListener('click', function() {
            // Show feedback animation
            this.classList.add('active');
            setTimeout(() => {
                this.classList.remove('active');
            }, 500);
        });
    }
    
    // Enhanced clear button interaction
    if (clearTextBtn) {
        clearTextBtn.addEventListener('click', function() {
            // Add a shake animation when clearing
            if (textInput && textInput.value.trim()) {
                textInput.classList.add('shake-subtle');
                setTimeout(() => {
                    textInput.classList.remove('shake-subtle');
                }, 500);
            }
        });
    }
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.button-group button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Enhance text analyzer experience
document.addEventListener('DOMContentLoaded', function() {
    const analyzeBtn = document.getElementById('analyze-btn');
    const sampleTextBtn = document.getElementById('sample-text-btn');
    
    if (analyzeBtn) {
        analyzeBtn.addEventListener('mouseenter', () => {
            analyzeBtn.classList.add('pulse');
        });
        
        analyzeBtn.addEventListener('mouseleave', () => {
            analyzeBtn.classList.remove('pulse');
        });
    }
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('button, .cv-link');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

