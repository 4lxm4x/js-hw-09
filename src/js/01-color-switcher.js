let INTERVAL_ID = null;

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

refs.startBtn.addEventListener('click', onStartClick);
refs.stopBtn.addEventListener('click', onStopClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function onStartClick() {
  refs.startBtn.disabled = true;

  INTERVAL_ID = setInterval(() => {
    const currentColor = getRandomHexColor();
    document.querySelector('body').style.backgroundColor = currentColor;
  }, 1000);
}

function onStopClick() {
  clearInterval(INTERVAL_ID);
  refs.startBtn.disabled = false;
}
