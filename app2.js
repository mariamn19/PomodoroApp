const bells = new Audio('./sounds/bell.wav'); 
const startBtn = document.querySelector('.btn-start'); 
const pauseBtn = document.querySelector('.btn-pause');
const restartBtn = document.querySelector('.btn-restart');
const session = document.querySelector('.minutes'); 
const initialSessionTime = 25; 
let myInterval; 
let state = true;
let totalSeconds; 
let isPaused = false; 

const appTimer = () => {
    if(state) {
        state = false;
        totalSeconds = initialSessionTime * 60; 

        const updateSeconds = () => {
            const minuteDiv = document.querySelector('.minutes');
            const secondDiv = document.querySelector('.seconds');

            if (!isPaused) { 
                totalSeconds--;

                let minutesLeft = Math.floor(totalSeconds / 60);
                let secondsLeft = totalSeconds % 60;

                secondDiv.textContent = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;
                minuteDiv.textContent = `${minutesLeft}`;

                if (minutesLeft === 0 && secondsLeft === 0) {
                    bells.play();
                    clearInterval(myInterval);
                }
            }
        }

        myInterval = setInterval(updateSeconds, 1000);
    } else {
        alert('Session has already started.');
    }
}

const pauseTimer = () => {
    isPaused = !isPaused; 
    pauseBtn.textContent = isPaused ? 'Resume' : 'Pause'; 
}

const restartTimer = () => {
    clearInterval(myInterval); 
    state = true; 
    isPaused = false;
    appTimer();
    pauseBtn.textContent = 'Pause';
}

startBtn.addEventListener('click', appTimer);
pauseBtn.addEventListener('click', pauseTimer);
restartBtn.addEventListener('click', restartTimer);