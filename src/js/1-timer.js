import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const countDays = document.querySelector('[data-days]');
const countHours = document.querySelector('[data-hours]');
const countMinutes = document.querySelector('[data-minutes]');
const countSeconds = document.querySelector('[data-seconds]');

startBtn.addEventListener('click', onClick);

startBtn.disabled = true;
let currentDay;
let userSelectedDate;
let deltaTime;
let intervalID;
let timerTime;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    currentDay = Date.now();
    userSelectedDate = selectedDates[0].getTime();
    deltaTime = userSelectedDate - currentDay;

    if (deltaTime > 0) {
      startBtn.disabled = false;
    } else {
      startBtn.disabled = true;
      iziToast.error({
        message: `Please choose a date in the future`,
        backgroundColor: '#ef4040',
        messageColor: '#fff',
        messageSize: '16px',
        position: 'topRight',
        maxWidth: '383px',
        close: false,
      });
    }
  },
};

flatpickr(inputDate, options);

function onClick() {
  intervalID = setInterval(() => {
    currentDay = Date.now();
    deltaTime = userSelectedDate - currentDay;
    timerTime = convertMs(deltaTime);

    const { days, hours, minutes, seconds } = timerTime;

    if (deltaTime < 0) {
      clearInterval(intervalID);
      inputDate.disabled = false;
    } else {
      startBtn.disabled = true;
      inputDate.disabled = true;

      countDays.textContent = days;
      countHours.textContent = hours;
      countMinutes.textContent = minutes;
      countSeconds.textContent = seconds;
    }
  }, 1000);
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
  return value.toString().padStart(2, '0');
}
