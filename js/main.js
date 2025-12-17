let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.dot');
let slideInterval;

function showSlide(index) {
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (dots[i]) {
            dots[i].classList.remove('active');
        }
    });

    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
    }
}

function moveSlide(direction) {
    showSlide(currentSlide + direction);
    resetInterval();
}

function currentSlide(index) {
    showSlide(index);
    resetInterval();
}

function autoSlide() {
    slideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 4000);
}

function resetInterval() {
    clearInterval(slideInterval);
    autoSlide();
}

document.addEventListener('DOMContentLoaded', () => {
    autoSlide();

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.category-card, .highlight-item, .intro-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

document.addEventListener('scroll', () => {
    const navbar = document.querySelector('header');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 10px rgba(135, 206, 235, 0.5)';
    } else {
        navbar.style.boxShadow = '0 2px 5px rgba(135, 206, 235, 0.3)';
    }
});
