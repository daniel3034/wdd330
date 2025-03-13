let countdownDisplay = document.getElementById("countdown");
let startButton = document.getElementById("startButton");
let pauseButton = document.getElementById("pauseButton");
let timeInput = document.getElementById("timeInput");

let countdownValue = 10; // Default starting time
let countdownInterval;
let isPaused = false;

// Function to start the countdown
function startCountdown() {
  let inputValue = parseInt(timeInput.value);
  if (!isNaN(inputValue) && inputValue > 0) {
    countdownValue = inputValue;
  }
  countdownDisplay.textContent = countdownValue;

  clearInterval(countdownInterval); // Reset if already running
  isPaused = false;

  countdownInterval = setInterval(() => {
    if (!isPaused && countdownValue > 0) {
      countdownValue--;
      countdownDisplay.textContent = countdownValue;
    }
    if (countdownValue === 0) {
      clearInterval(countdownInterval);
      setTimeout(() => {
        countdownDisplay.textContent = "Time's up!";
      }, 1000);
    }
  }, 1000);
}

// Function to pause/resume countdown
function togglePause() {
  isPaused = !isPaused;
  pauseButton.textContent = isPaused ? "Resume" : "Pause";
}

// Event Listeners
startButton.addEventListener("click", startCountdown);
pauseButton.addEventListener("click", togglePause);
