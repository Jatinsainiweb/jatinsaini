// Initialize AOS
AOS.init({
    duration: 1000,
    once: false,
    mirror: true
});

// Loader Animation
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1500);
    }
});

// Floating Hearts Animation
function createHeart(side) {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerHTML = '❤️';
    
    // Random horizontal position within the container
    heart.style.left = Math.random() * 100 + '%';
    
    // Random size
    const size = Math.random() * 20 + 10;
    heart.style.fontSize = size + 'px';
    
    // Random opacity
    heart.style.opacity = Math.random() * 0.5 + 0.3;
    
    // Add to the correct container
    document.querySelector(`.${side}-hearts`).appendChild(heart);
    
    // Remove the heart after animation
    setTimeout(() => {
        heart.remove();
    }, 4000);
}

// Create hearts at different intervals for each side
setInterval(() => createHeart('left'), 500);
setInterval(() => createHeart('right'), 500);

// Mini Gifts Functionality
const gifts = [
    {
        element: document.getElementById('miniGift1'),
        icon: document.querySelector('#miniGift1 .gift-icon'),
        video: document.querySelector('#miniGift1 video'),
        isOpen: false
    },
    {
        element: document.getElementById('miniGift2'),
        icon: document.querySelector('#miniGift2 .gift-icon'),
        video: document.querySelector('#miniGift2 video'),
        isOpen: false
    }
];

// Function to close all gifts
function closeAllGifts() {
    gifts.forEach(gift => {
        if (gift.isOpen) {
            gift.element.classList.remove('active');
            if (gift.video) {
                gift.video.pause();
            }
            gift.isOpen = false;
        }
    });
}

// Add click handlers for each gift
gifts.forEach(gift => {
    gift.icon.addEventListener('click', (e) => {
        e.stopPropagation();
        
        if (!gift.isOpen) {
            closeAllGifts(); // Close other gifts first
            gift.element.classList.add('active');
            if (gift.video) {
                gift.video.currentTime = 0;
                gift.video.play();
            }
        } else {
            gift.element.classList.remove('active');
            if (gift.video) {
                gift.video.pause();
            }
        }
        gift.isOpen = !gift.isOpen;
    });
});

// Close gifts when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.mini-gift')) {
        closeAllGifts();
    }
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Gallery Image Hover Effect
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = item.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        
        const move = 10;
        const rotateX = (0.5 - y) * move;
        const rotateY = (x - 0.5) * move;
        
        item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// Surprise Modal Functionality
const surpriseBtn = document.getElementById('surpriseBtn');
const surpriseModal = document.getElementById('surpriseModal');
const closeModal = document.querySelector('.close-modal');
const modalVideo = document.querySelector('.video-container video');

surpriseBtn.addEventListener('click', () => {
    surpriseModal.style.display = 'flex';
    if (modalVideo) {
        modalVideo.currentTime = 0;
        modalVideo.play();
    }
});

closeModal.addEventListener('click', () => {
    surpriseModal.style.display = 'none';
    if (modalVideo) {
        modalVideo.pause();
    }
});

window.addEventListener('click', (e) => {
    if (e.target === surpriseModal) {
        surpriseModal.style.display = 'none';
        if (modalVideo) {
            modalVideo.pause();
        }
    }
});

// Add periodic animation to surprise button
setInterval(() => {
    surpriseBtn.classList.add('pulse');
    setTimeout(() => {
        surpriseBtn.classList.remove('pulse');
    }, 1000);
}, 5000);

// Timeline Animation on Scroll
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineAnimation = () => {
    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight * 0.8) {
            item.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', timelineAnimation);
window.addEventListener('load', timelineAnimation);
