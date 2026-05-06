// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth Scrolling
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

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animate Skill Bars
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            });
        }
    });
}, observerOptions);

// Observe skills section
const skillsSection = document.querySelector('#skills');
observer.observe(skillsSection);

// Animate Stats
function animateStats() {
    const stats = document.querySelectorAll('.stat h3');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stats.forEach(stat => {
                    const target = parseInt(stat.textContent);
                    let count = 0;
                    const increment = target / 100;
                    
                    const updateCount = () => {
                        if (count < target) {
                            count += increment;
                            stat.textContent = Math.floor(count) + '+';
                            requestAnimationFrame(updateCount);
                        } else {
                            stat.textContent = target + '+';
                        }
                    };
                    updateCount();
                });
                observer.unobserve(entry.target);
            }
        });
    });
    
    const aboutSection = document.querySelector('#about');
    observer.observe(aboutSection);
}

animateStats();

// Form Submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulate form submission
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    
    btn.textContent = 'Sending...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.textContent = 'Message Sent!';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            this.reset();
        }, 2000);
    }, 1500);
});

// Parallax Effect for Hero Image
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        profileImg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});