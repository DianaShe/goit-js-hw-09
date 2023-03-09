import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('button[data-start]');
const daysClockFace = document.querySelector('span[data-days]');
const hoursClockFace = document.querySelector('span[data-hours]');
const minClockFace = document.querySelector('span[data-minutes]');
const secClockFace = document.querySelector('span[data-seconds]');
startBtn.setAttribute('disabled', 'true');

let endDate = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0].getTime() < Date.now()) {
        Notify.failure("Please choose a date in the future");
        return;
      }
      endDate = selectedDates[0].getTime();
      startBtn.removeAttribute('disabled');
    },
  };

flatpickr("#datetime-picker", options);

const timer = {
  start(){
    intervalId = null;
    startBtn.setAttribute('disabled', 'true');
    this.intervalId = setInterval(()=> {
      const currentDate = Date.now();
      const deltaTime = endDate - currentDate;
      const timeComponents = convertMs(deltaTime);
      upddateClockFace(timeComponents);
    }, 1000);
  },

  stop(){
    clearInterval(this.intervalId);
  }
}

startBtn.addEventListener('click', timer.start.bind(timer));

function upddateClockFace({ days, hours, minutes, seconds }) {
  daysClockFace.textContent = addLeadingZero(days);
  hoursClockFace.textContent = addLeadingZero(hours);
  minClockFace.textContent = addLeadingZero(minutes);
  secClockFace.textContent = addLeadingZero(seconds);

  if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
    timer.stop();
   }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = (Math.floor(ms / day));
    // Remaining hours
    const hours = (Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = (Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = (Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }

  

