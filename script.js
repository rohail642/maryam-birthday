const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let petals = [];
let hearts = [];

class Petal {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -50;
    this.size = Math.random() * 5 + 5;
    this.speedY = Math.random() * 1 + 0.5;
    this.speedX = Math.random() * 1 - 0.5;
    this.opacity = Math.random() * 0.5 + 0.5;
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    if (this.y > canvas.height) {
      this.y = 0;
      this.x = Math.random() * canvas.width;
    }
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 192, 203, ${this.opacity})`;
    ctx.ellipse(this.x, this.y, this.size, this.size * 1.5, Math.PI / 4, 0, 2 * Math.PI);
    ctx.fill();
  }
}

class Heart {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 20;
    this.size = Math.random() * 15 + 10;
    this.speedY = Math.random() * 1 + 0.5;
    this.opacity = Math.random() * 0.5 + 0.5;
  }
  update() {
    this.y -= this.speedY;
    if (this.y < -20) {
      this.y = canvas.height + 20;
      this.x = Math.random() * canvas.width;
    }
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(this.size/30, this.size/30);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(0, -3, -5, -15, -15, -15);
    ctx.bezierCurveTo(-35, -15, -35, 10, -35, 10);
    ctx.bezierCurveTo(-35, 25, -20, 40, 0, 50);
    ctx.bezierCurveTo(20, 40, 35, 25, 35, 10);
    ctx.bezierCurveTo(35, 10, 35, -15, 15, -15);
    ctx.bezierCurveTo(5, -15, 0, -3, 0, 0);
    ctx.fillStyle = `rgba(255, 105, 180, ${this.opacity})`;
    ctx.fill();
    ctx.restore();
  }
}

function init() {
  for (let i = 0; i < 50; i++) {
    petals.push(new Petal());
  }
  for (let i = 0; i < 30; i++) {
    hearts.push(new Heart());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  petals.forEach(petal => {
    petal.update();
    petal.draw();
  });
  hearts.forEach(heart => {
    heart.update();
    heart.draw();
  });
  requestAnimationFrame(animate);
}

init();
animate();


window.addEventListener('load', () => {
  const intro = document.getElementById('intro');
  setTimeout(() => {
    intro.style.opacity = '0';
    setTimeout(() => {
      intro.style.display = 'none';
    }, 1000); // matches CSS transition time
  }, 4000); // Total time before fade out (cake + text)
});

const envelope = document.getElementById('envelope');
const letter = document.getElementById('letter');

envelope.addEventListener('click', () => {
  envelope.querySelector('.flap').style.transform = 'rotateX(-180deg)';
  setTimeout(() => {
    letter.style.display = 'block';
    letter.style.animation = 'fadeIn 1s ease forwards';
  }, 800);
});

window.addEventListener('load', () => {
  const intro = document.getElementById('intro');
  const music = document.getElementById('bg-music');

  setTimeout(() => {
    intro.style.opacity = '0';
    setTimeout(() => {
      intro.style.display = 'none';

      // Try to play music after intro fade
      const playPromise = music.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Music started!');
          })
          .catch((error) => {
            console.log('Autoplay blocked — will wait for click');
            // Fallback — start on first click if autoplay blocked
            document.body.addEventListener('click', () => {
              music.play();
            }, { once: true });
          });
      }
    }, 1000);
  }, 4000);
});


music.volume = 0;
music.play();
let fadeAudio = setInterval(() => {
  if (music.volume < 1) {
    music.volume += 0.05;
  } else {
    clearInterval(fadeAudio);
  }
}, 200);



