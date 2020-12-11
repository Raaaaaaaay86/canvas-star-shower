const randomIntFromRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomColor = (colorList) => {
  return colorList[Math.round(Math.random() * colorList.length)];
};

const distance = (x1, x2, y1, y2) => {
  const xDist = x2 - x1;
  const yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
};

export {
  randomIntFromRange,
  randomColor,
  distance,
};