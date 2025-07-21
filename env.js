const envelope = document.getElementById('envelope');
const letter = document.getElementById('letter');
const heartsContainer = document.getElementById('hearts');
const clickInstruction = document.getElementById('clickInstruction');
let isOpened = false;

envelope.addEventListener('click', (e) => {
    if (!isOpened) {
        isOpened = true;
        envelope.classList.add('opened');
        clickInstruction.style.opacity = '0';
        
        // Create sparkle effect on click
        createSparkles(e.clientX, e.clientY);
        
        setTimeout(() => {
            letter.classList.add('show');
            createFloatingHearts();
        }, 1000);
    }
});

function createSparkles(x, y) {
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = (x - 4) + 'px';
        sparkle.style.top = (y - 4) + 'px';
        sparkle.style.animationDelay = (i * 0.1) + 's';
        
        const angle = (360 / 8) * i;
        const distance = 30 + Math.random() * 20;
        const finalX = x + Math.cos(angle * Math.PI / 180) * distance - 4;
        const finalY = y + Math.sin(angle * Math.PI / 180) * distance - 4;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.style.left = finalX + 'px';
            sparkle.style.top = finalY + 'px';
        }, 10);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
}

function createFloatingHearts() {
    const heartSymbols = ['💖', '💕', '💗', '💝', '🌹', '✨'];
    
    function createHeart() {
        if (!isOpened) return;
        
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.animationDuration = (4 + Math.random() * 4) + 's';
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }
    
    // Create initial burst of hearts
    for (let i = 0; i < 6; i++) {
        setTimeout(createHeart, i * 200);
    }
    
    // Continue creating hearts periodically
    const heartInterval = setInterval(() => {
        if (Math.random() < 0.3) {
            createHeart();
        }
    }, 1000);
    
    // Stop after 30 seconds
    setTimeout(() => {
        clearInterval(heartInterval);
    }, 30000);
}

// Add some subtle mouse movement effects
document.addEventListener('mousemove', (e) => {
    if (!isOpened) {
        const rect = envelope.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) / 50;
        const deltaY = (e.clientY - centerY) / 50;
        
        envelope.style.transform = `translateY(-10px) rotateY(${deltaX}deg) rotateX(${-deltaY}deg)`;
    }
});

document.addEventListener('mouseleave', () => {
    if (!isOpened) {
        envelope.style.transform = '';
    }
});
