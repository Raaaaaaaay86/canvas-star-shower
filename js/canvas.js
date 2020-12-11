import { distance } from './util.js';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

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
