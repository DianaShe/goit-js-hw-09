const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

startBtn.addEventListener('click',changeBgrColor);
stopBtn.addEventListener('click',onStopBtnClick);

function onStopBtnClick() {
    clearInterval(timerId);
    startBtn.removeAttribute('disabled');
}


function changeBgrColor () {
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
      }, 1000);
    startBtn.setAttribute('disabled', 'true');
}


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }