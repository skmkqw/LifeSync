var isTaskChosen = localStorage.getItem('isTaskChosen') === 'true';

if (isTaskChosen == null){
    isTaskChosen = false;

    updateTaskDisplay();
}

function endGoingTask(){
    isTaskChosen = !isTaskChosen;
    updateTaskDisplay();
    localStorage.setItem('isTaskChosen', isTaskChosen);
}

function updateTaskDisplay() {
    var currentTaskElement = document.getElementById('currentTask');
    var taskListElement = document.getElementById('taskList');

    if (isTaskChosen) {
        currentTaskElement.style.display = 'block';
    } else {
        currentTaskElement.style.display = 'none';
    }
}

updateTaskDisplay();


var timerElement = document.getElementById('timer');
var countdownInterval;

function startTimer(durationInSeconds) {
    var timer = durationInSeconds;

    countdownInterval = setInterval(function () {
        var hours = Math.floor(timer / 3600);
        var minutes = Math.floor((timer % 3600) / 60);
        var seconds = timer % 60;

        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        timerElement.textContent = hours + ':' + minutes + ':' + seconds;
            if (--timer < 0) {
                clearInterval(countdownInterval);
                alert("Time's up!");
            }
    }, 1000);
}

let loadedUser = User.loadFromLocalStorage();

if (!loadedUser) {
    const new_user = new User('@jnkjn', 'John Doe', 'john@example.com', '123-456-7890', 'Premium', 100);
    new_user.saveToLocalStorage();
    loadedUser = new_user;
}


function displayBalance(balance) {
    const balanceDisplay = document.querySelector('.profile-title-coins-text');
    if (balanceDisplay) {
        balanceDisplay.textContent = balance;
    }
}

// Display the balance
displayBalance(loadedUser.balance);
insertUserData(loadedUser)

function endGoingTask() {
    clearInterval(countdownInterval);
    loadedUser.updateBalance(10)
    loadedUser.saveToLocalStorage()
    alert("Earned 10 coins!")
    displayBalance(loadedUser.balance)

    isTaskChosen = false;
    localStorage.setItem('isTaskChosen', isTaskChosen);
    updateTaskDisplay();
    localStorage.removeItem('currentTaskData');
}
