// Mobile Navigation
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');

if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburgerMenu.classList.toggle('active');
    });
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger-menu');
const mobileNav = document.querySelector('.mobile-nav');
const header = document.querySelector('.header');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
    }
});

// Close mobile menu when clicking on a link
mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
    });
});

// Header scroll behavior
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scrolling down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scrolling up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburgerMenu.classList.remove('active');
            }
        }
    });
});

// Header Scroll Effect
// Removed this section as it has been replaced with the new header scroll behavior

// Testimonials Data
const testimonials = [
    {
        text: "King of Clean DC transformed my Airbnb experience! Their attention to detail is remarkable, and my guest reviews have never been better.",
        author: "Sarah M.",
        role: "Airbnb Superhost",
        icon: "fas fa-user-circle"
    },
    {
        text: "Professional, reliable, and thorough. They've been cleaning my vacation rental for months, and I couldn't be happier with their service.",
        author: "Michael R.",
        role: "Property Manager",
        icon: "fas fa-user-circle"
    },
    {
        text: "Outstanding service! They go above and beyond to ensure my property is spotless for every guest. Highly recommended!",
        author: "Jennifer L.",
        role: "VRBO Host",
        icon: "fas fa-user-circle"
    }
];

// Generate Testimonials
function generateTestimonials() {
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    if (!testimonialCarousel) return;

    testimonials.forEach(testimonial => {
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'testimonial-card';
        
        testimonialCard.innerHTML = `
            <i class="${testimonial.icon} fa-3x"></i>
            <p class="testimonial-text">${testimonial.text}</p>
            <div class="testimonial-author">
                <strong>${testimonial.author}</strong>
                <span>${testimonial.role}</span>
            </div>
        `;
        
        testimonialCarousel.appendChild(testimonialCard);
    });
}

// Initialize Testimonials
generateTestimonials();

// Form Submission
const quoteForm = document.getElementById('quote-form');

if (quoteForm) {
    quoteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(quoteForm);
        const submitButton = quoteForm.querySelector('button[type="submit"]');
        
        // Disable submit button during submission
        submitButton.disabled = true;
        submitButton.innerHTML = 'Sending...';
        
        try {
            // Here you would typically send the form data to your server
            // For now, we'll simulate a submission
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show success message
            alert('Thank you for your inquiry! We will contact you soon.');
            quoteForm.reset();
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting your form. Please try again.');
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.innerHTML = 'Request Quote';
        }
    });
}

// Intersection Observer for Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing once animation is triggered
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.querySelectorAll('.feature-card, .comparison-item, .testimonial-card').forEach(element => {
    observer.observe(element);
});

// Hero Video Handling
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
    // Handle video loading
    heroVideo.addEventListener('loadeddata', () => {
        heroVideo.play().catch(error => {
            console.warn('Auto-play was prevented:', error);
        });
    });

    // Handle video errors
    heroVideo.addEventListener('error', (e) => {
        console.error('Error loading video:', e);
        heroVideo.closest('.hero-video-container').style.backgroundImage = 
            `url(${heroVideo.getAttribute('poster')})`;
    });

    // Pause video when not visible to save resources
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                heroVideo.play().catch(() => {});
            } else {
                heroVideo.pause();
            }
        });
    }, { threshold: 0.1 });

    observer.observe(heroVideo);
}

// Handle form input validation
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('invalid', (e) => {
        e.preventDefault();
        input.classList.add('invalid');
    });
    
    input.addEventListener('input', () => {
        if (input.classList.contains('invalid')) {
            input.classList.remove('invalid');
        }
    });
});

// Hero Slider
const heroSlider = {
    currentSlide: 0,
    slides: document.querySelectorAll('.hero-slide'),
    dots: document.querySelectorAll('.slider-dot'),
    videos: document.querySelectorAll('.hero-video'),
    autoplayInterval: null,
    
    init() {
        // Add click events to arrows
        document.querySelector('.slider-arrow.prev').addEventListener('click', () => this.prevSlide());
        document.querySelector('.slider-arrow.next').addEventListener('click', () => this.nextSlide());
        
        // Add click events to dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Initialize videos
        this.videos.forEach(video => {
            video.addEventListener('loadeddata', () => {
                if (video.closest('.hero-slide').classList.contains('active')) {
                    video.play().catch(error => {
                        console.warn('Auto-play was prevented:', error);
                    });
                }
            });
            
            video.addEventListener('error', (e) => {
                console.error('Error loading video:', e);
                video.closest('.hero-video-container').style.backgroundImage = 
                    `url(${video.getAttribute('poster')})`;
            });
        });
        
        // Start autoplay
        this.startAutoplay();
        
        // Pause autoplay when user interacts with controls
        document.querySelector('.hero-slider-controls').addEventListener('mouseenter', () => {
            this.stopAutoplay();
        });
        
        document.querySelector('.hero-slider-controls').addEventListener('mouseleave', () => {
            this.startAutoplay();
        });
    },
    
    goToSlide(index) {
        // Remove active class from current slide and dot
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');
        
        // Pause current video
        this.videos[this.currentSlide].pause();
        
        // Update current slide index
        this.currentSlide = index;
        
        // Add active class to new slide and dot
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
        
        // Play new video
        this.videos[this.currentSlide].play().catch(() => {});
    },
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    },
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    },
    
    startAutoplay() {
        if (this.autoplayInterval) return;
        this.autoplayInterval = setInterval(() => this.nextSlide(), 6000);
    },
    
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
};

// Initialize hero slider
if (document.querySelector('.hero-slider')) {
    heroSlider.init();
}

// Initialize any third-party components or libraries here
document.addEventListener('DOMContentLoaded', () => {
    // Add any initialization code for third-party libraries
});
