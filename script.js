// Corrected selector (use # for ID instead of . for class)
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

// Only run if elements exist
if (menuIcon && navbar && sections && navLinks) {
    window.onscroll = () => {
        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Only try to add active class if selector matches
                let matchingLink = document.querySelector(`header nav a[href*="${id}"]`);
                if (matchingLink) {
                    matchingLink.classList.add('active');
                }
            }
        });
    };

    // Corrected onclick (lowercase c)
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };
}