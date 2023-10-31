// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import BSN from 'bootstrap.native';
let INTERVAL_ID = null; //глобальная переменная для доступа к интервалу

const refs = {
  dateInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start'),
  days: document.querySelector('span[data-days'),
  hrs: document.querySelector('span[data-hours'),
  mins: document.querySelector('span[data-minutes'),
  secs: document.querySelector('span[data-seconds'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < options.defaultDate.getTime()) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    refs.startBtn.disabled = false;
  },
};
refs.startBtn.addEventListener('click', onStartClick);
let fp = flatpickr(refs.dateInput, options);

function onStartClick() {
  // ========= кусок кода для сброса таймера ===================
  if (timer.isActive) {
    timer.stop();
    refs.days.textContent = addLeadingZero(0);
    refs.hrs.textContent = addLeadingZero(0);
    refs.mins.textContent = addLeadingZero(0);
    refs.secs.textContent = addLeadingZero(0);
    timer.isActive = false;
    refs.startBtn.textContent = 'Start';
    refs.startBtn.disabled = true;
    fp = flatpickr(refs.dateInput, options);

    return;
  }
  Notify.info('Таймер запущен');
  // ============================
  const selectedDate = fp.selectedDates[0].getTime();
  timer.start(selectedDate);
}

const timer = {
  isActive: false,
  start(date) {
    INTERVAL_ID = setInterval(
      () => {
        const delta = date - Date.now();
        const formattedTime = convertMs(delta);
        refs.days.textContent = addLeadingZero(formattedTime.days);
        refs.hrs.textContent = addLeadingZero(formattedTime.hours);
        refs.mins.textContent = addLeadingZero(formattedTime.minutes);
        refs.secs.textContent = addLeadingZero(formattedTime.seconds);
      },
      1000,
      date
    );

    refs.startBtn.textContent = 'Stop/Reset';
    this.isActive = true;
    refs.dateInput.disabled = true;
  },
  stop() {
    clearInterval(INTERVAL_ID);
    this.isActive = false;
    refs.dateInput.disabled = false;
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
