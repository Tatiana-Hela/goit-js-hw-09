import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let chosenTime = 0;
let isAvailableDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chosenTime = selectedDates[0].getTime();
    isAvailableDate = chosenTime - Date.now();
    if (isAvailableDate <= 0) {
      Notiflix.Report.failure('Please choose a date in the future');
      return;
    }
    refs.startBtn.removeAttribute('disabled');
  },
};

flatpickr('#datetime-picker', options);

refs.startBtn.setAttribute('disabled', true);

refs.startBtn.addEventListener('click', onStartBtnClick);

const timer = {
  intervalID: null,
  isActive: false,

  onClose() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    const currentDate = Date.now();

    let counting = chosenTime - currentDate;

    this.intervalID = setInterval(() => {
      counting = counting -= 1000;
      const timerComponents = convertMs(counting);
      updateClockFace(timerComponents);
      if (counting <= 0) {
        stopInterval();
      }
    }, 1000);
  },
};
function stopInterval(timer) {
  clearInterval(this.intervalID);
  updateClockFace(0, 0, 0, 0);
}

function stopInterval() {
  clearInterval(this.intervalID);
  updateClockFace(0, 0, 0, 0);
}

function onStartBtnClick() {
  timer.onClose();
  refs.startBtn.setAttribute('disabled', true);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}
