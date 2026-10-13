const KEY = 'quitVapingStart';

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const sinceEl = document.getElementById('since');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');

function getStart() {
    try {
        const value = Number(localStorage.getItem(KEY));
        return value > 0 ? value : null;
    } catch {
        return null;
    }
}

function start() {
    try {
        localStorage.setItem(KEY, String(Date.now()));
    } catch {
        alert('Could not save — localStorage is unavailable in this browser.');
    }
    render();
}

function reset() {
    if (!confirm('Reset the counter? This clears your saved time.')) return;
    try {
        localStorage.removeItem(KEY);
    } catch {}
    render();
}

function render() {
    const startTime = getStart();

    if (startTime === null) {
        daysEl.textContent = 0;
        hoursEl.textContent = 0;
        minutesEl.textContent = 0;
        secondsEl.textContent = 0;
        sinceEl.textContent = "Press start when you've had your last vape.";
        startBtn.hidden = false;
        resetBtn.hidden = true;
        return;
    }

    const diff = Math.max(0, Date.now() - startTime);
    daysEl.textContent = Math.floor(diff / 86400000);
    hoursEl.textContent = Math.floor(diff / 3600000) % 24;
    minutesEl.textContent = Math.floor(diff / 60000) % 60;
    secondsEl.textContent = Math.floor(diff / 1000) % 60;
    sinceEl.textContent = 'Since ' + new Date(startTime).toLocaleString();
    startBtn.hidden = true;
    resetBtn.hidden = false;
}

startBtn.addEventListener('click', start);
resetBtn.addEventListener('click', reset);
document.addEventListener('visibilitychange', render);
setInterval(render, 1000);
render();
