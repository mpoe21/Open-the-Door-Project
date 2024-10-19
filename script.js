// Element References
const door1 = document.getElementById('door1');
const door2 = document.getElementById('door2');
const door3 = document.getElementById('door3');
const startButton = document.getElementById('start');

// Door Image Paths
let botDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg";
let beachDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg";
let spaceDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg";
let closedDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg";

//new door images
let closedDoor = "file:///C:/Users/matthew.poe/Desktop/OpenDoor%20Project/images/closedDoor.svg";
let trickDoor = "file:///C:/Users/matthew.poe/Desktop/OpenDoor%20Project/images/trickDoor.svg";
let treatDoor = "file:///C:/Users/matthew.poe/Desktop/OpenDoor%20Project/images/treatDoor.svg";
let ghostDoor = "file:///C:/Users/matthew.poe/Desktop/OpenDoor%20Project/images/ghostDoor.svg";

let openDoor1;
let openDoor2;
let openDoor3;
let closedDoorsCount = 3;
let currentlyPlaying = true;

let score = 0;
let highScore = 0;
let currentStreak = document.getElementById('score-number');
let bestStreak = document.getElementById('high-score-number');
currentStreak.innerHTML = score;
bestStreak.innerHTML = highScore;

// Generate a random door
function randomDoorGenerator(){
  choreDoor = Math.floor(Math.random() * 6);
  switch (choreDoor) {
    case 0:
      openDoor1 = ghostDoor;
      openDoor2 = trickDoor;
	  openDoor3 = treatDoor;
      break;
    case 1:
      openDoor1 = trickDoor;
      openDoor2 = ghostDoor;
	  openDoor3 = treatDoor;
      break;
    case 2:
      openDoor1 = treatDoor;
      openDoor2 = ghostDoor;
	  openDoor3 = trickDoor;
      break;
    case 3:
      openDoor1 = trickDoor;
      openDoor2 = treatDoor;
	  openDoor3 = ghostDoor;
      break;
    case 4:
      openDoor1 = treatDoor;
      openDoor2 = trickDoor;
	  openDoor3 = ghostDoor;
      break;
	case 5:
	  openDoor1 = ghostDoor;
	  openDoor2 = treatDoor;
	  openDoor3 = trickDoor;
  }
}


// Handle door click
function handleDoorClick(event) {
  const door = event.target; // Get the clicked door
  if (currentlyPlaying && !isClick(door)) {
    if (door === door1) {
      door.src = openDoor1;
    } else if (door === door2) {
      door.src = openDoor2;
    } else if (door === door3) {
	  door.src = openDoor3;
	}
	evaluateDoor(door);
  }
  
}

// Check if the door is clicked
function isClick(door) {
  return door.src !== closedDoor; // Returns true if the door is not closed
}

function isGhostDoor(door) {
	return door.src === ghostDoor;
}

function evaluateDoor(door) {
	closedDoorsCount--;
	
	if (closedDoorsCount === 0) {
		endGame('win');
	} else if (isGhostDoor(door)) {
		endGame('lose')
	}
}



// Start button click functionality
function startButtonClick() {
  door1.src = closedDoor; // Reset the door
  door2.src = closedDoor;
  door3.src = closedDoor;
  closedDoorsCount = 3;
  currentlyPlaying = true;
  startButton.innerHTML = 'Good Luck!';
  randomDoorGenerator(); // Generate a new door
}

// Event Listeners
door1.onclick  = handleDoorClick;
door2.onclick  = handleDoorClick;
door3.onclick  = handleDoorClick;
startButton.onclick = startButtonClick;


//Game Over Logic
function endGame(result) {
	currentlyPlaying = false;
	
	if (result === 'win') {
		startButton.innerHTML = 'You win! Play again?';
		updateScore();
	} else {
		startButton.innerHTML = 'BOO! You lose! Play again?';
		score = 0
		currentStreak.innerHTML = score;
	}
}

//update score and high score
function updateScore() {
	score++;
	currentStreak.innerHTML = score;
	
	if (score > highScore) {
		highScore = score;
		bestStreak.innerHTML = highScore;
	}
}

//hidden instructions
document.getElementById("instructions-toggle").addEventListener("click", function() {
        var instructions = document.getElementById("instructions-content");
        if (instructions.classList.contains("hidden")) {
          instructions.classList.remove("hidden");
        } else {
          instructions.classList.add("hidden");
        }
      });
	  
// Real-time clock function
function updateClock() {
  const clockElement = document.getElementById("clock");
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  clockElement.textContent = timeString;
}

// Update clock every second
setInterval(updateClock, 1000);

// Start the clock on page load
updateClock();

// Initialize the game
startButtonClick();










