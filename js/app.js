let n = document.querySelector(".n").querySelector("input");
let n_toggle = document.querySelector(".n_toggle").querySelector("input");
let k_toggle = document.querySelector(".k_toggle").querySelector("input");
let p_toggle = document.querySelector(".p_toggle").querySelector("input");
let k_show = document.querySelectorAll(".k_show");
let n_show = document.querySelectorAll(".n_show");
let p_show = document.querySelectorAll(".p_show");

let zoom_show = document.querySelector(".zoom");
let zoom = document.querySelector(".zoom-container").querySelector("input");

let m = document.querySelector(".m_value");
let standard = document.querySelector(".standard_value");
let normal = document.querySelector(".normal_show");
let cumulated = document.querySelector(".cumulated_show");
let reverse = document.querySelector(".cumulated_reverse_show");

function calc() {
  zoom_show.innerHTML = zoom.value;

  for (let i = 0; i < n_show.length; i++) {
    n_show[i].innerHTML = n_toggle.value;
  }

  for (let i = 0; i < k_show.length; i++) {
    k_show[i].innerHTML = k_toggle.value;
  }

  for (let i = 0; i < p_show.length; i++) {
    p_show[i].innerHTML = p_toggle.value;
  }

  n_toggle.setAttribute("max", n.value);
  k_toggle.setAttribute("max", n_toggle.value);
  p_toggle.setAttribute("max", 1);

  if (n.value !== 0 && k_toggle.value !== 0 && p_toggle.value !== 0) {
    m.innerHTML = parseFloat(calcM(n_toggle.value, p_toggle.value).toFixed(6));
    standard.innerHTML = parseFloat(
      calcStandard(n_toggle.value, p_toggle.value).toFixed(6)
    );
    normal.innerHTML = parseFloat(
      normalBinomial(n_toggle.value, p_toggle.value, k_toggle.value).toFixed(6)
    );
    cumulated.innerHTML = parseFloat(
      cumulatedBinomial(n_toggle.value, p_toggle.value, k_toggle.value).toFixed(
        6
      )
    );
    reverse.innerHTML = parseFloat(
      (
        1 -
        cumulatedBinomial(n_toggle.value, p_toggle.value, k_toggle.value - 1)
      ).toFixed(6)
    );
  }
}

function calcM(n, p) {
  return n * p;
}

function calcStandard(n, p) {
  return Math.sqrt(n * p * (1 - p));
}

function calcOver(n, k) {
  return f(n) / (f(k) * f(n - k));
}

function f(num) {
  if (num < 0) return -1;
  else if (num == 0) return 1;
  else {
    return num * f(num - 1);
  }
}

function normalBinomial(n, p, k) {
  return calcOver(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

function cumulatedBinomial(n, p, k) {
  sum = 0;
  for (let i = 0; i <= k; i++) {
    sum += normalBinomial(n, p, i);
  }
  return sum;
}
