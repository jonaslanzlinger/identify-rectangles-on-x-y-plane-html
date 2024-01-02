const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const WIDTH = 800;
const HEIGHT = 400;
const GRID_SIZE = 10;
const NUMBER_OF_POINTS = 120;
const POINT_RADIUS = 2;

canvas.width = WIDTH;
canvas.height = HEIGHT;

function generateNewPoints() {
   let points = [];
   for (let i = 0; i < NUMBER_OF_POINTS; i++) {
      let point = {
         x: Math.floor((Math.random() * (WIDTH - GRID_SIZE)) / GRID_SIZE) + 1,
         y: Math.floor((Math.random() * (HEIGHT - GRID_SIZE)) / GRID_SIZE) + 1,
      };
      points.push(point);
   }
   return points;
}

function draw(points) {
   ctx.fillStyle = '#111111';
   ctx.fillRect(0, 0, WIDTH, HEIGHT);

   // Rectangle for testing purposes
   // points = [
   //    {
   //       x: 10,
   //       y: 5,
   //    },
   //    {
   //       x: 10,
   //       y: 8,
   //    },
   //    {
   //       x: 15,
   //       y: 5,
   //    },
   //    {
   //       x: 15,
   //       y: 8,
   //    },
   // ];

   for (let point of points) {
      ctx.beginPath();
      ctx.arc(
         point.x * GRID_SIZE,
         point.y * GRID_SIZE,
         POINT_RADIUS,
         0,
         Math.PI * 2
      );
      ctx.fillStyle = '#00FF00';
      ctx.fill();
      ctx.closePath();
   }

   let edges = [];
   for (let i of points) {
      for (let j of points) {
         if (i.x === j.x && i.y < j.y) {
            edges.push({ point1: i, point2: j });

            // Draw Lines as a pre-step
            ctx.strokeStyle = '#FF000044';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(i.x * GRID_SIZE, i.y * GRID_SIZE);
            ctx.lineTo(j.x * GRID_SIZE, j.y * GRID_SIZE);
            ctx.stroke();
            ctx.closePath();
         }
      }
   }

   for (let edge1 of edges) {
      for (let edge2 of edges) {
         if (
            edge1 !== edge2 &&
            edge1.point1.x !== edge2.point1.x &&
            edge1.point1.y === edge2.point1.y &&
            edge1.point2.y === edge2.point2.y
         ) {
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(edge1.point1.x * GRID_SIZE, edge1.point1.y * GRID_SIZE);
            ctx.lineTo(edge1.point2.x * GRID_SIZE, edge1.point2.y * GRID_SIZE);
            ctx.lineTo(edge2.point2.x * GRID_SIZE, edge2.point2.y * GRID_SIZE);
            ctx.lineTo(edge2.point1.x * GRID_SIZE, edge2.point1.y * GRID_SIZE);
            ctx.lineTo(edge1.point1.x * GRID_SIZE, edge1.point1.y * GRID_SIZE);
            ctx.stroke();
            ctx.closePath();
         }
      }
   }
}
