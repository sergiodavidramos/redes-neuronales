const tam = 45;
var lienzo = new Array(10);
let lineas = [];
let pintarLineas = false;
var context;
const canvas = document.getElementById("canvas");
var run = [];
let res = [];

function generaLienzo() {
  canvas.width = 6 * tam;
  canvas.height = 10 * tam;
  context = canvas.getContext("2d");
  context.clearRect(0, 0, tam * 10, tam * 6);
  for (var i = 0; i < 10; i++) {
    lienzo[i] = new Array(6);
    for (var j = 0; j < 6; j++) {
      lienzo[i][j] = 0;
    }
  }
}

generaLienzo();

function restart() {
  res = [];
  console.log(lienzo, run);
  lienzo = new Array();
  run = [];
  generaLienzo();
  lineas = [];
  // console.log(lineas);
  grid();
  document.getElementById("res").innerHTML = ``;
}

function grid() {
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 6; j++) {
      context.beginPath();
      context.strokeStyle = "black";
      context.lineWidth = 2;
      context.lineCap = "round";
      context.fillStyle = "white";
      context.fillRect(j * tam, i * tam, tam, tam);
      context.rect(j * tam, i * tam, tam, tam);
      context.stroke();
    }
  }
}
grid();
canvas.addEventListener("mousedown", empezarNumero, false);
canvas.addEventListener("mousemove", dibujarNumero, false);
canvas.addEventListener("mouseup", pararNumero, false);

// let lineas = [];
function pararNumero() {
  pintarLineas = false;

  let arrayLienzo = [];
  lienzo.forEach((dato) => {
    arrayLienzo = arrayLienzo.concat(dato);
  });

  run = new runIa(arrayLienzo);
  console.log("Lienzo de pararNumero", lienzo);
  document.getElementById("res").innerHTML = `
  <p id="resul1">Resultados:</p>
  <b>${run[0]}</b>
  <p id="resul2">Tambien puede ser un:</p>
  <b>${run[1]}</b>
  `;
}

function empezarNumero(event) {
  pintarLineas = true;
  lineas.push([]);
}
function dibujarNumero(event) {
  event.preventDefault();
  if (pintarLineas) {
    context.lineWidth = 40;
    context.strokeStyle = "black";
    let nuevaPosicionX = event.layerX;
    let nuevaPosicionY = event.layerY;

    if (event.layerX)
      lineas[lineas.length - 1].push({
        x: nuevaPosicionX,
        y: nuevaPosicionY,
      });
    //------------**************--------
    let pos = {
      x: Math.floor((event.clientX - canvas.offsetLeft) / tam),
      y: Math.floor(
        (event.clientY - canvas.offsetTop + window.pageYOffset) / tam
      ),
    };
    lienzo[pos.y][pos.x] = 1;
    // Redibuja todas las lineas guardadas
    context.beginPath();
    lineas.forEach(function (segmento) {
      context.moveTo(segmento[0].x, segmento[0].y);
      segmento.forEach(function (punto, index) {
        context.lineTo(punto.x, punto.y);
      });
    });
    context.stroke();
  }
}
