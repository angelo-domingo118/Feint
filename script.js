// Theme Switch Functionality
function generateRandomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
}

function generateRandomPalette() {
    // Generate a random base hue
    const baseHue = Math.floor(Math.random() * 360);
    
    // Create a high-contrast color palette
    return {
        bgColor: `hsl(${baseHue}, 15%, 15%)`,  // Dark background
        textColor: `hsl(${baseHue}, 10%, 95%)`,  // Very light text for contrast
        secondaryColor: `hsl(${baseHue}, 15%, 75%)`,  // Light secondary color
        accentColor: `hsl(${(baseHue + 180) % 360}, 70%, 65%)`  // Complementary accent color
    };
}

function setTheme(theme) {
    const root = document.documentElement;
    
    if (theme === 'random') {
        const palette = generateRandomPalette();
        root.style.setProperty('--bg-color', palette.bgColor);
        root.style.setProperty('--text-color', palette.textColor);
        root.style.setProperty('--secondary-color', palette.secondaryColor);
        root.style.setProperty('--accent-color', palette.accentColor);
    } else {
        root.style.removeProperty('--bg-color');
        root.style.removeProperty('--text-color');
        root.style.removeProperty('--secondary-color');
        root.style.removeProperty('--accent-color');
        root.setAttribute('data-theme', theme);
    }
    localStorage.setItem('theme', theme);
}

// Initialize theme
const savedTheme = localStorage.getItem('theme') || 'dark';
document.querySelector(`#${savedTheme}`).checked = true;
setTheme(savedTheme);

// Add event listeners for theme switches
document.querySelectorAll('.theme-switch-container input[type="radio"]').forEach(input => {
    input.addEventListener('change', (e) => {
        setTheme(e.target.value);
        
        // If random theme is selected, change colors periodically
        if (e.target.value === 'random') {
            setInterval(() => {
                if (document.querySelector('#random').checked) {
                    setTheme('random');
                }
            }, 10000); // Change colors every 10 seconds
        }
    });
});

// Smooth scroll handling for all navigation links and contact button
document.querySelectorAll('nav a[href^="#"], .contact-btn').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Remove active class from all links
            document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
            // Add active class to clicked link if it's a nav link
            if (this.parentElement.tagName === 'NAV') {
                this.classList.add('active');
            }
            
            // Smooth scroll to target
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update active section on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add hover effect to social icons
const socialLinks = document.querySelectorAll('.social-sidebar a');
socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateX(5px)';
    });
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateX(0)';
    });
});

// Intersection Observer for Section Animations
const sections = document.querySelectorAll('.section');
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    sectionObserver.observe(section);
});

// Dynamic Timeline Loading
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    timelineObserver.observe(item);
});

// Skill Progress Animation
const skillItems = document.querySelectorAll('.skill-item');
const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'scale(1)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

skillItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'scale(0.8)';
    item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    skillObserver.observe(item);
});
