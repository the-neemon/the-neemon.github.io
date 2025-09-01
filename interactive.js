
function initScrollAnimations() {
    
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });
    
 
    const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight * 0.85;
        
   
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            
            if (scrollPosition > sectionTop) {
                section.classList.add('visible');
            }
        });
        
       
        const animatableElements = document.querySelectorAll('.skill-tag, .timeline-entry, .project-card, .education-card');
        animatableElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top + window.scrollY;
            
            if (scrollPosition > elementTop) {
                element.classList.add('visible');
                
               
                if (element.classList.contains('skill-tag')) {
                    const index = Array.from(element.parentNode.children).indexOf(element);
                    element.style.transitionDelay = `${index * 0.05}s`;
                }
            }
        });
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
}



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
    

    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            
            navLinks.forEach(item => item.classList.remove('active'));
            
            
            this.classList.add('active');
            
            
            menu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    

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


function createEnhancedParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'interactive-particles';
    document.body.appendChild(particleContainer);
    
   
    const numberOfParticles = window.innerWidth < 768 ? 15 : 30;
    
    for (let i = 0; i < numberOfParticles; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
           
            const size = Math.random() * 18 + 6;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
      
            const startingX = Math.random() * window.innerWidth;
            particle.style.left = `${startingX}px`;
            particle.style.bottom = '0';
            
           
            const opacity = Math.random() * 0.5 + 0.2;
            particle.style.opacity = opacity;
            
      
            const hue = Math.random() * 40 + 200;
            const saturation = Math.random() * 40 + 10; 
            const lightness = Math.random() * 20 + 80;
            particle.style.backgroundColor = `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`;
            

            const duration = Math.random() * 15 + 15; 
            const delay = Math.random() * 15; 
            

            const timingFunctions = [
                'cubic-bezier(0.47, 0, 0.745, 0.715)', 
                'cubic-bezier(0.39, 0.575, 0.565, 1)', 
                'cubic-bezier(0.445, 0.05, 0.55, 0.95)', 
                'cubic-bezier(0.55, 0.085, 0.68, 0.53)', 
                'cubic-bezier(0.25, 0.46, 0.45, 0.94)', 
            ];
            
            const randomTimingFunction = timingFunctions[Math.floor(Math.random() * timingFunctions.length)];
            particle.style.animation = `float ${duration}s ${randomTimingFunction} ${delay}s infinite`;
            
    
            particleContainer.appendChild(particle);
            
         
            setTimeout(() => {
                if (particle.parentNode === particleContainer) {
                    particleContainer.removeChild(particle);
                }
            }, (duration + delay) * 1000);
        }, i * 400); 
    }

    setInterval(() => {
        if (particleContainer.childElementCount < numberOfParticles) {
            createParticle(particleContainer);
        }
    }, 2000);
}


function initHometownGalleryScroll() {
    const gallery = document.getElementById('hometown-gallery');
    const container = document.querySelector('.hometown-gallery-container');
    const leftIndicator = document.querySelector('.left-indicator');
    const rightIndicator = document.querySelector('.right-indicator');
    
    if (!gallery || !container) return;

    gallery.style.transform = 'translateZ(0)';
    gallery.style.willChange = 'scroll-position';
    
   
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
    
  
    updateIndicators();
    

    leftIndicator.addEventListener('click', () => {
        gallery.scrollBy({ left: -320, behavior: 'smooth' });
    });
    
    rightIndicator.addEventListener('click', () => {
        gallery.scrollBy({ left: 320, behavior: 'smooth' });
    });
    
    
    let scrollTimeout;
    gallery.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateIndicators, 10);
    });
    
 
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
        const velocity = Math.abs(swipeDistance) / duration; 
        if (Math.abs(swipeDistance) > 30) {
        
            const momentum = Math.min(velocity * 200, 1200); 
            gallery.scrollBy({
                left: swipeDistance * (1 + momentum/500),
                behavior: 'smooth'
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initMobileMenu();
    
    
    initHometownGalleryScroll();
    
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(el => {
            if (!el.classList.contains('visible')) {
                el.classList.add('visible');
            }
        });
    }, 200);
});

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
        
        analyzeBtn.addEventListener('click', function() {
            if (textInput && textInput.value.trim().split(/\s+/).length >= 10000) {
                this.classList.add('loading');
                this.disabled = true;
                
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.disabled = false;
                }, 1500); 
            }
        });
    }
    

    if (sampleTextBtn) {
        sampleTextBtn.addEventListener('click', function() {
       
            this.classList.add('active');
            setTimeout(() => {
                this.classList.remove('active');
            }, 500);
        });
    }
    
    
    if (clearTextBtn) {
        clearTextBtn.addEventListener('click', function() {
   
            if (textInput && textInput.value.trim()) {
                textInput.classList.add('shake-subtle');
                setTimeout(() => {
                    textInput.classList.remove('shake-subtle');
                }, 500);
            }
        });
    }
    

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

