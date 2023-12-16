// Зчитування значення isTaskChosen з локального сховища
var isTaskChosen = localStorage.getItem('isTaskChosen') === 'true';

if (isTaskChosen == null){
    isTaskChosen = false;

    updateTaskDisplay();
}

function endGoingTask(){
    isTaskChosen = !isTaskChosen;
    updateTaskDisplay();
    // Збереження нового значення в локальному сховищі
    localStorage.setItem('isTaskChosen', isTaskChosen);
}

// Функція для відображення або приховування елементів в залежності від значення isTaskChosen
function updateTaskDisplay() {
    var currentTaskElement = document.getElementById('currentTask');
    var taskListElement = document.getElementById('taskList');

    if (isTaskChosen) {
        currentTaskElement.style.display = 'block';
    } else {
        currentTaskElement.style.display = 'none';
    }
}

// Викликати функцію для встановлення початкового стану
updateTaskDisplay();


///timer
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

function endGoingTask() {
    clearInterval(countdownInterval);
    // Додайте код, який буде виконуватися при завершенні завдання
    alert('Task completed!');
    // Очищення попереднього інтервалу та інших необхідних дій
    isTaskChosen = false;
    localStorage.setItem('isTaskChosen', isTaskChosen);
    updateTaskDisplay();
    // Очищення локального сховища для демонстрації
    localStorage.removeItem('currentTaskData');
}
