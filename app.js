var end = new Date('2021-10-30T23:47:00');

var units = ['day', 'hour', 'minute', 'second'];

var second = 1000;
var minute = second * 60;
var hour = minute * 60;
var day = hour * 24;
var timer;

let prevDate = [00, 00, 00, 00];

function showRemaining() {
  var now = new Date();
  var distance = end - now;

  if (distance < 0) {
    clearInterval(timer);
    document.querySelector('h1').innerHTML = 'Visit our site';
    return;
  }

  var days = Math.floor(distance / day);
  var hours = Math.floor((distance % day) / hour);
  var minutes = Math.floor((distance % hour) / minute);
  var seconds = Math.floor((distance % minute) / second);

  addZero([days, hours, minutes, seconds]);
}

function addZero(array) {
  for (i = 0; i < array.length; i++) {
    if (array[i] < 10) {
      array[i] = '0' + array[i];
    }
  }

  updateDisplay(array);
}

function updateDisplay(array) {
  for (i = 0; i < array.length; i++) {
    if (array[i] != prevDate[i]) {
      animate(units[i], prevDate[i], array[i]);
    } else {
      document.querySelector(`#${units[i]} .top-front span`).innerHTML =
        array[i];
      document.querySelector(`#${units[i]} .bottom-front span`).innerHTML =
        array[i];
      document.querySelector(`#${units[i]} .top-back span`).innerHTML =
        array[i];
      document.querySelector(`#${units[i]} .bottom-back span`).innerHTML =
        array[i];
    }
  }
  prevDate = array;
}

function animate(unit, prev, value) {
  document.querySelector(`#${unit} .top-front span`).innerHTML = prev;
  document.querySelector(`#${unit} .bottom-front span`).innerHTML = prev;
  document.querySelector(`#${unit} .top-back span`).innerHTML = value;
  document.querySelector(`#${unit} .bottom-back span`).innerHTML = value;

  var topFront = document.querySelector(`#${unit} .top-front`);
  topFront.classList.add('flipped-top');
  var bottomBack = document.querySelector(`#${unit} .bottom-back`);
  bottomBack.classList.add('flipped-bottom');

  bottomBack.addEventListener('transitionend', () => {
    topFront.classList.remove('flipped-top');
    bottomBack.classList.remove('flipped-bottom');
    document.querySelector(`#${unit} .top-front span`).innerHTML = value;
    document.querySelector(`#${unit} .bottom-front span`).innerHTML = value;
  });
}

timer = setInterval(showRemaining, 1000);
