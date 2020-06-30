function setup() {
  let width = windowWidth * 0.8;
  let height = windowHeight * 0.5;
  const canvas = createCanvas(width, height);
  canvas.parent("canvas_container");
}

function draw() {
  background(220);
  line(15, height - 15, width - 15, height - 15);
  line(15, height - 15, 15, 15);
  let charts = [];
  let number = parseInt(n_toggle.value) + 1;

  let space = Math.round((width - 30) / number);

  for (let i = 0; i < number; i++) {
    let rh = calcHeight(n_toggle.value, p_toggle.value, i) * zoom.value;
    charts.push(new Chart(15 + space * i, height - rh - 15, space, rh));
    charts[i].show();
    charts.slice(i, 1);
  }
}

function Chart(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;

  this.show = function () {
    fill("lightblue");
    rect(x, y, w, h);
  };
}

function calcHeight(n, p, k) {
  let rh = 0;
  rh = normalBinomial(n, p, k);
  if (rh !== NaN || rh !== Infinity) {
    rh = Math.ceil(map(rh, 0, 1, 0, height - 30));
  } else {
    rh = 1;
  }

  return rh;
}
