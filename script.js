const subtitles = [
    "A Game Developer",
    "A problem solver.",
    "An Innovative thinker.",
    "A... cool girl?",
    "Ok, I'm running out of ideas...",
    "Uhh...",
    "You can scroll down to see my projects by the way...",
    "Seriously, my projects are really cool, go check them out!",
    "You're uh... still here...",
    "So much for being productive hmm...",
    "Ok, this has been fun, but I'm gonna restart the loop now...",
    "See ya! :)",
];

let currentIndex = 0;
const subtitleElement = document.getElementById('subtitle');
const scrollIndicator = document.querySelector('.scroll-indicator');
let isTyping = false;

function typeWriter(text, callback) {
    if (isTyping) return;
    isTyping = true;
    
    subtitleElement.textContent = '';
    let charIndex = 0;
    
    const typeInterval = setInterval(() => {
        if (charIndex < text.length) {
            subtitleElement.textContent += text.charAt(charIndex);
            charIndex++;
        } else {
            clearInterval(typeInterval);
            isTyping = false;
            
            // Show scroll indicator when the specific message is typed
            if (text === "You can scroll down to see my projects by the way...") {
                scrollIndicator.classList.add('show');
            }
            
            if (callback) callback();
        }
    }, 50);
}



function eraseText(callback) {
    if (isTyping) return;
    isTyping = true;
    
    const currentText = subtitleElement.textContent;
    let charIndex = currentText.length;
    
    const eraseInterval = setInterval(() => {
        if (charIndex > 0) {
            subtitleElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            clearInterval(eraseInterval);
            isTyping = false;
            if (callback) callback();
        }
    }, 30);
}

function changeSubtitle() {
    eraseText(() => {
        setTimeout(() => {
            typeWriter(subtitles[currentIndex], () => {
                currentIndex = (currentIndex + 1) % subtitles.length;
            });
        }, 200);
    });
}

// Start with first subtitle only if subtitle element exists
if (subtitleElement) {
    typeWriter(subtitles[0], () => {
        currentIndex = 1;
        setTimeout(changeSubtitle, 2500);
    });

    // Change subtitle every 4 seconds after initial typing
    setInterval(changeSubtitle, 4000);
}

// Real-time Portugal clock
function updatePortugalTime() {
    const now = new Date();
    const portugalTime = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Lisbon"}));
    
    // Format time as HH.MM.SS
    const timeString = portugalTime.toTimeString().slice(0, 8).replace(/:/g, ':');
    
    // Format date as DD/MM/YYYY
    const day = String(portugalTime.getDate()).padStart(2, '0');
    const month = String(portugalTime.getMonth() + 1).padStart(2, '0');
    const year = portugalTime.getFullYear();
    const dateString = `${day}/${month}/${year}`;
    
    // Update DOM elements
    document.getElementById('current-time').textContent = timeString;
    document.getElementById('current-date').textContent = dateString;
}

// Update time immediately and then every second only if clock elements exist
if (document.getElementById('current-time') && document.getElementById('current-date')) {
    updatePortugalTime();
    setInterval(updatePortugalTime, 1000);
}

// Projects Gallery Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter project cards
            filterProjects(filter);
        });
    });
    
    function filterProjects(filter) {
        projectCards.forEach(card => {
            const cardCategories = card.getAttribute('data-category').split(' ');
            
            if (filter === 'all') {
                // Show all cards
                card.classList.remove('hidden');
            } else {
                // Check if card category includes the filter
                if (cardCategories.includes(filter)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            }
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links (starting with #)
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Update active navigation state
                    navLinks.forEach(navLink => {
                        navLink.classList.remove('active');
                        navLink.querySelector('.nav-icon').src = 'Images/Unactive.png';
                    });
                    
                    this.classList.add('active');
                    this.querySelector('.nav-icon').src = 'Images/Active.png';
                    
                    // Smooth scroll to target
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});


/* ProjectSurvivalPage JS Code */

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

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.mechanic-card, .feature-item, .tech-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

/* // Video placeholder interaction
document.querySelector('.video-placeholder').addEventListener('click', function() {
    // Replace this with actual video embed logic
    alert('Video trailer would play here. Replace this placeholder with your actual video embed.');
});

*/

// Wait for DOM to be fully loaded before running our code
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM is fully loaded!');
    
    // Basic debugging - check if script is running
    console.log('Script.js is running!');

    // Scroll to top functionality
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    console.log('Looking for scroll-to-top button:', scrollToTopBtn);

    if (scrollToTopBtn) {
        console.log('Scroll to top button found!');
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        // Scroll to top when button is clicked
        scrollToTopBtn.addEventListener('click', () => {
            console.log('Button clicked! Scrolling to top...');
            try {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                console.log('Scroll command executed');
            } catch (error) {
                console.error('Scroll error:', error);
                // Fallback for older browsers
                window.scrollTo(0, 0);
            }
        });
        
        
    }
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navContainer = document.querySelector('#nav-container');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function() {
        const isOpen = navContainer.classList.contains('open');
        
        if (isOpen) {
            navContainer.classList.remove('open');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        } else {
            navContainer.classList.add('open');
            mobileMenuToggle.setAttribute('aria-expanded', 'true');
        }
    });
    
    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navContainer.classList.remove('open');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navContainer.contains(event.target);
        const isClickOnToggle = mobileMenuToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && navContainer.classList.contains('open')) {
            navContainer.classList.remove('open');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            navContainer.classList.remove('open');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

// Enhanced scroll to top functionality
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });
        
        // Smooth scroll to top
        scrollToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Enhanced filter functionality with better mobile support
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects with animation
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    // Add fade in animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});

// Improved scroll indicator
document.addEventListener('DOMContentLoaded', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        // Show scroll indicator after page loads
        setTimeout(() => {
            scrollIndicator.classList.add('show');
        }, 2000);
        
        // Hide scroll indicator when user scrolls
        let scrollTimer = null;
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 100) {
                scrollIndicator.classList.remove('show');
            } else if (scrollTimer === null) {
                scrollTimer = setTimeout(() => {
                    if (window.pageYOffset <= 100) {
                        scrollIndicator.classList.add('show');
                    }
                    scrollTimer = null;
                }, 1000);
            }
        });
    }
});

// Touch-friendly enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add touch feedback for buttons
    const touchElements = document.querySelectorAll('.nav-link, .filter-btn, .view-details-button, .github-button, .tech-box, .view-project-btn');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.opacity = '0.8';
        });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.opacity = '';
            }, 150);
        });
        
        element.addEventListener('touchcancel', function() {
            this.style.opacity = '';
        });
    });
});

// Optimize performance for mobile
document.addEventListener('DOMContentLoaded', function() {
    // Throttle scroll events
    let ticking = false;
    
    function updateScrollElements() {
        // Update scroll-dependent elements here
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollElements);
            ticking = true;
        }
    });
    
    // Debounce resize events
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Handle resize-dependent operations here
        }, 250);
    });
});

// Simple Slideshow functionality for Project Survival VR page
let currentSlideIndex = 0;
let slides = [];
let dots = [];

function showSlide(index) {
    console.log('Showing slide:', index);
    
    // Hide all slides
    slides.forEach(slide => slide.style.display = 'none');
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide and dot
    if (slides[index]) {
        slides[index].style.display = 'block';
        console.log('Activated slide:', index);
    }
    if (dots[index]) {
        dots[index].classList.add('active');
        console.log('Activated dot:', index);
    }
}

function changeSlide(direction) {
    console.log('Changing slide by:', direction, 'from index:', currentSlideIndex);
    
    currentSlideIndex += direction;
    
    // Loop around if we go past the end or beginning
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    console.log('New slide index:', currentSlideIndex);
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index - 1; // Convert to 0-based index
    showSlide(currentSlideIndex);
}

// Auto-advance slideshow every 5 seconds
function autoAdvance() {
    changeSlide(1);
}

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing slideshow...');
    
    // Get slideshow elements
    slides = document.querySelectorAll('.slide');
    dots = document.querySelectorAll('.dot');
    
    console.log('Found slides:', slides.length);
    console.log('Found dots:', dots.length);
    
    if (slides.length === 0) {
        console.error('No slides found!');
        return;
    }
    
    // Set initial display states
    slides.forEach((slide, index) => {
        if (index === 0) {
            slide.style.display = 'block';
        } else {
            slide.style.display = 'none';
        }
        console.log(`Slide ${index} src:`, slide.src);
    });
    
    // Add event listeners to navigation buttons
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    console.log('Prev button found:', !!prevBtn);
    console.log('Next button found:', !!nextBtn);
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Prev button clicked');
            changeSlide(-1);
        });
    } else {
        console.error('Previous button not found!');
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Next button clicked');
            changeSlide(1);
        });
    } else {
        console.error('Next button not found!');
    }
    
    // Add event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Dot clicked:', index + 1);
            currentSlide(index + 1);
        });
    });
    
    // Add click event listeners to slides for image modal
    slides.forEach((slide, index) => {
        slide.addEventListener('click', function() {
            console.log('Slide clicked - Index:', index);
            console.log('Slide src:', this.src);
            console.log('Slide alt:', this.alt);
            openImageModal(this.src, this.alt);
        });
    });
    
    // Start auto-advance if slideshow exists on the page
    if (slides.length > 0) {
        console.log('Starting auto-advance...');
        setInterval(autoAdvance, 5000);
    }
    
    // Show first slide initially
    showSlide(0);
    
    console.log('Slideshow initialization complete!');
    
    // Initialize image modal functionality
    initializeImageModal();
});

// Image Modal Functionality
function openImageModal(imageSrc, imageAlt) {
    console.log('openImageModal called with:');
    console.log('  - imageSrc:', imageSrc);
    console.log('  - imageAlt:', imageAlt);
    
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.querySelector('.modal-caption');
    
    modalImage.src = imageSrc;
    modalImage.alt = imageAlt;
    modalCaption.textContent = imageAlt;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
}

function initializeImageModal() {
    const modal = document.getElementById('imageModal');
    const closeBtn = document.querySelector('.close-modal');
    
    // Close modal when clicking the close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeImageModal);
    }
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeImageModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeImageModal();
        }
    });
}