let n = document.querySelector(".n").querySelector("input");
let k = document.querySelector(".k").querySelector("input");
let p = document.querySelector(".p").querySelector("input");
let n_toggle = document.querySelector(".n_toggle").querySelector("input");
let k_toggle = document.querySelector(".k_toggle").querySelector("input");
let p_toggle = document.querySelector(".p_toggle").querySelector("input");
let k_show = document.querySelectorAll(".k_show");



let m = document.querySelector(".m_value");
let standard = document.querySelector(".standard_value");
let normal = document.querySelector(".normal_show");
let cumulated = document.querySelector(".cumulated_show");
let reverse = document.querySelector(".cumulated_reverse_show");


let data = [];
let labels = [];
let chart;


function changeNumberN() {
  n_toggle.value=n.value;
  k.setAttribute("max", n.value)
  k_toggle.setAttribute("max", n.value)

  if (n.value<k.value) {
    k.value=n.value;
    k_toggle.value=n.value;
  }

  calc();
}

function changeRangeN() {
  n.value=n_toggle.value;
  k.setAttribute("max", n.value);
  k_toggle.setAttribute("max", n.value);

  if (n.value<k.value) {
    k.value=n.value;
    k_toggle.value=n.value;
  }

  calc();
}

function changeNumberK() {
  k.setAttribute("max", n.value);
  k_toggle.setAttribute("max", n.value);
  k_toggle.value=k.value;
  calc();
}

function changeRangeK() {
  k_toggle.setAttribute("max", n.value);
  k.setAttribute("max", n.value);
  k.value=k_toggle.value;
  calc();
}

function changeNumberP() {
  p_toggle.value=p.value;
  calc();
}

function changeRangeP() {
  p.value=p_toggle.value;
  calc();
}

function calc() {
  labels=[];
  data=[];
  for (let i=0; i<=n.value; i++) {
    labels.push(i+'');
  }

  for (let i=0; i<k_show.length; i++) {
    k_show[i].innerHTML=k.value;
  }

  if (n.value !== 0 && k.value !== 0 && p.value !== 0) {
    m.innerHTML = parseFloat(calcM(n.value, p.value).toFixed(6));
    standard.innerHTML = parseFloat(
      calcStandard(n.value, p.value).toFixed(3)
    );
    normal.innerHTML = parseFloat(
      normalBinomial(n.value, p.value, k.value).toFixed(3)
    );
    cumulated.innerHTML = parseFloat(
      cumulatedBinomial(n.value, p.value, k.value).toFixed(
        3
      )
    );
    reverse.innerHTML = parseFloat(
      (
        1 -
        cumulatedBinomial(n.value, p.value, k.value - 1)
      ).toFixed(3)
    );
    for (let i=0; i<n.value; i++) {
      data[i]=normalBinomial(n.value, p.value, i);
    }
    chart = new Chart("chart", {
      label: "Binomial Distribution",
      type: "bar",
      data: {
        labels,
        datasets: [{
          data,
          label: "Binomial Distribution",
          backgroundColor: "#0000ff",
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        title: {
          display: true,
          text: 'Binomial Distribution',
        },
        legend: {
          display: false,
          position: 'left',
          align: 'start'
        },
      }
    });
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