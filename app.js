var year = new Date().getFullYear();
var newDate = '';
var newName = '';

let birthdays = [
  {
    year: year,
    name: 'Tara',
    date: `${this.year}-01-19T00:00:00`,
  },
  {
    year: year,
    name: 'Dusan(Avala)',
    date: `${this.year}-02-27T00:00:00`,
  },
  {
    year: year,
    name: 'Natalija',
    date: `${this.year}-03-29T00:00:00`,
  },
  {
    year: year,
    name: 'Vladan',
    date: `${this.year}-04-10T00:00:00`,
  },
  {
    year: year,
    name: 'Jana',
    date: `${this.year}-08-01T00:00:00`,
  },
  {
    year: year,
    name: 'Filip',
    date: `${this.year}-08-20T00:00:00`,
  },
  {
    year: year,
    name: 'Nixa',
    date: `${this.year}-09-02T00:00:00`,
  },
  {
    year: year,
    name: 'Alex',
    date: `${this.year}-10-16T00:00:00`,
  },
  {
    year: year,
    name: 'Tonic',
    date: `${this.year}-10-21T00:00:00`,
  },
  {
    year: year,
    name: 'Flora',
    date: `${this.year}-11-28T00:00:00`,
  },
  {
    year: year,
    name: 'Dimi',
    date: `${this.year}-12-04T00:00:00`,
  },
  {
    year: year,
    name: 'Dusan(Souly) and Toza',
    date: `${this.year}-12-12T00:00:00`,
  },
];

var counter = 0;
//IF COUNTER IS EQUALS TO NUMBER OF BIRTHDAYS, THAT MEANS
//THERE ARE NO BIRTHDAYS LEFT THIS YEAR.
//IN THAT CASE WE NEED TO CHANGE CURRENT YEAR SO THE PROGRAM
//CAN CHECK NEXT BIRTHDAY IN THE BEGGINING OF THE NEXT YEAR.
function getBirthday(array) {
  loopDates(array);
  if (counter == array.length) {
    year++;
    let newArray = changeYear([...array]);
    loopDates(newArray);
  }
}
getBirthday(birthdays);

//THIS CHECKS IF BIRTHAY HAS PASSED, IF YES, IT ADDS 1 TO COUNTER
//IF NOT, IT MEANS THAT BIRTHDAY IS NEXT UP.
function loopDates(dateArray) {
  var today = new Date();
  for (let i = 0; i < dateArray.length; i++) {
    var checkDate = new Date(dateArray[i].date);
    var choosenName = dateArray[i].name;
    if (checkDate > today) {
      newDate = checkDate;
      newName = choosenName;
      break;
    } else {
      counter++;
    }
  }
}

//THIS FUNCTION MAKES NEW ARRAY WITH ALL DATES WITH NEW YEAR.
function changeYear(oldArray) {
  for (let i = 0; i < oldArray.length; i++) {
    var newDate = year + oldArray[i].date.slice(-15);
    oldArray[i].date = newDate;
    oldArray[i].year = year;
  }
  return oldArray;
}

document.querySelector('h1').innerHTML = `It's ${newName}'s birthday soon`;
var end = new Date(newDate);
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
