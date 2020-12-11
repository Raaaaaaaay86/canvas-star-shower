import { randomIntFromRange } from './util.js';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;
const groundHeight = 100;

const backgroundGradient = context.createLinearGradient(0, 0, 0, canvas.height);
backgroundGradient.addColorStop(0, '#171e26');
backgroundGradient.addColorStop(1, '#3f586b');

const starList = [];
const backgroundStarList = [];
const miniStarList = [];

class Star {
  constructor (x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.friction = 0.8;
    this.gravity = 1;
  }

  draw() {
    context.save();
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle= this.color;
    context.shadowColor= '#E3EAEF';
    context.shadowBlur= 20;
    context.fill();
    context.closePath();
    context.restore();
  }

  update() {
    this.draw();

    if (this.y + this.radius + this.velocity.y > canvas.height - groundHeight) { // 改變力量方向的瞬間
      this.velocity.y = -this.velocity.y * this.friction;
      this.shatter();
    } else {
      this.velocity.y += this.gravity; // 依照力量方向持續加速
    }

    if (this.x + this.radius + this.velocity.x > canvas.width
      || this.x - this.radius + this.velocity.x < 0) {
      this.velocity.x = -this.velocity.x;
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y; // 更新加速後的位置
  }

  shatter() {
    this.radius -= 6;

    for (let i = 0; i < 8; i++) {
      const velocity = {
        x: randomIntFromRange(-5, 5),
        y: randomIntFromRange(-15, 15),
      }
      miniStarList.push(new MiniStar(this.x, this.y, 2, 1, velocity));
    }
  }
}

class MiniStar extends Star{
  constructor(x, y, radius, opacity, velocity) {
    super()
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocity = velocity;
    this.opacity = opacity;
    super.gravity = 0.8;
    this.timeToDelete = 100;
  }

  draw() {
    context.save();
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle= `rgba(227, 234, 239, ${this.opacity})`;
    context.shadowColor= '#E3EAEF';
    context.shadowBlur= 20;
    context.fill();
    context.closePath();
    context.restore();
  }

  update() {
    this.draw();

    if (this.y + this.radius + this.velocity.y > canvas.height - groundHeight) {
      this.velocity.y = -this.velocity.y * this.friction;
    } else {
      this.velocity.y += this.gravity;
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.timeToDelete -= 0.8;
    this.opacity -= 1/ this.timeToDelete;
  }
}

const createMoitainRange = (mountainAmount, height, color) => {
  for (let i = 0; i < mountainAmount; i++) {
    context.beginPath();
    const mountainWidth = canvas.width / mountainAmount;
    context.moveTo(i * mountainWidth, canvas.height);

    context.lineTo(i * mountainWidth + mountainWidth + 325, canvas.height);
    context.lineTo(i * mountainWidth + mountainWidth / 2, canvas.height - height);
    context.lineTo(i * mountainWidth - 325, canvas.height);
    context.lineTo(0, canvas.height);

    context.fillStyle= color;
    context.fill();
    context.closePath();
  }
};

const init = () => {
  const x = canvas.width / 2;
  const y = 30;
  const radius = 30;
  const color = '#E3EAEF';

  // for (let i = 0; i < 1; i++) {
  //   starList.push(new Star(x, y, radius, color, { x:0, y:1 }));
  // }

  for (let i = 0; i < 150; i++) {
    const x = randomIntFromRange(0, canvas.width);
    const y = randomIntFromRange(0, canvas.height);
    const radius = randomIntFromRange(0, 3);
    backgroundStarList.push(new Star(x, y, radius, 'white'));
  }
};

let ticker = 0;
let randomSpawnRate = 75;
const animate = () => {
  requestAnimationFrame(animate);

  context.fillStyle = backgroundGradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  backgroundStarList.forEach((backgroundStar) => {
    backgroundStar.draw();
  })

  createMoitainRange(1, canvas.height - 50, '#384551');
  createMoitainRange(2, canvas.height - 100, '#2B3843');
  createMoitainRange(3, canvas.height - 300, '#26333E');
  context.fillStyle= '#182028';
  context.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);

  starList.forEach((star, index) => {
    star.update();
    if (star.radius === 0) {
      starList.splice(index, 1);
    }
  });

  miniStarList.forEach((miniStar, index) => {
    miniStar.update();
    if (miniStar.timeToDelete === 0) {
      miniStarList.splice(index, 1);
    }
  });

  ticker += 1;
  if (ticker % randomSpawnRate === 0) {
    const radius = 18;
    const x = randomIntFromRange(0, canvas.width) - radius;
    const velocity = {
      x: randomIntFromRange(-20, 20),
      y: 1,
    }
    starList.push(new Star(x, -100, radius, 'white', velocity));
    randomSpawnRate = randomIntFromRange(50, 200);
  }
};

init();
animate();

window.addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});
