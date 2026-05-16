// Loading animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.classList.add('fade-out');
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
});

// Navigation highlighting
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });
};

// Menu icon toggle
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            // Animate every time it scrolls into view
            entry.target.classList.remove('show');
        }
    });
}, observerOptions);

// Observe all elements that have the scroll-animate class
setTimeout(() => {
    const hiddenElements = document.querySelectorAll('.scroll-animate');
    hiddenElements.forEach((el) => observer.observe(el));
}, 100);

// Custom Cursor
const cursor = document.querySelector('.custom-cursor');

if(cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, .btn, .skill-box, .project-item, .ui-video-item, .figma-skills, .figma-video').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// Matrix Background Animation
const canvas = document.getElementById('matrixCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Characters to display (Katakana + Latin + Numerals)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    const fontSize = 16;
    let columns = canvas.width / fontSize;
    
    // Array to store the vertical position of each column
    let drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        // Black background with slight opacity to create the fading trail effect
        ctx.fillStyle = 'rgba(3, 5, 12, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'rgba(0, 255, 238, 0.15)'; // Dim cyan color for the rain
        ctx.font = fontSize + 'px "Fira Code", monospace';
        
        for (let i = 0; i < drops.length; i++) {
            // Pick a random character
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            
            // Draw the character
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // Randomly reset the drop to the top to create the staggered effect
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            // Move drop down
            drops[i]++;
        }
    }
    
    // Run animation
    setInterval(draw, 50);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = canvas.width / fontSize;
        drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
    });
}