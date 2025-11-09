const button = document.querySelector('.celebrate-button');
const note = document.querySelector('.love-note');
const photo = document.querySelector('.photo');
const canvas = document.getElementById('balloons');
const ctx = canvas.getContext('2d');
const music = document.getElementById('music'); // new line for music

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

class Balloon {
  constructor() {
    this.x = random(0, canvas.width);
    this.y = canvas.height + 50;
    this.size = random(20, 50);
    this.color = `hsl(${random(0, 360)}, 80%, 60%)`;
    this.speed = random(1, 3);
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.y -= this.speed;
    this.draw();
  }
}

let balloons = [];

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  balloons.forEach((b, i) => {
    b.update();
    if (b.y + b.size < 0) balloons.splice(i, 1);
  });
  requestAnimationFrame(animate);
}

button.addEventListener('click', () => {
  alert("🎉 Time to celebrate Bubuuu! 🎈");
  photo.style.display = 'block';
  note.style.display = 'block';
  for (let i = 0; i < 50; i++) balloons.push(new Balloon());
  animate();
  music.currentTime = 0;  // start from beginning
  music.play();           // play music when button is clicked
});
