const buttonGenerate = document.getElementById('button-generate');
const paragraphPoints = document.getElementById('points');

buttonGenerate.addEventListener('click', () => {
   let points = generateNewPoints();
   let string = '';
   for (let point of points) {
      string = string + `(${point.x}:${point.y})`;
   }
   paragraphPoints.innerText = string;

   draw(points);
});
