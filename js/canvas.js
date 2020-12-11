import { distance } from './util.js';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight /2,
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

window.addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

window.addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

class Circle {
  constructor (x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, 0, Math.PI * 2, false);
    context.fillStyle= this.color;
    context.fill();
    context.closePath();
  }
}

const circleList = [];

const init = () => {
  for (let i = 0; i < 100; i++) {
    circleList.push(new Circle());
  }
};

const animate = () => {
  requestAnimationFrame(animate);

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
};

init();
animate();
