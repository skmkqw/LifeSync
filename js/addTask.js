const taskBtn = document.querySelector('#task-form')
const taskExit = document.querySelector('.task-exit')
const taskform = document.querySelector('.task')

if (taskform) {
	taskBtn.addEventListener('click', function () {
		taskform.classList.toggle('active')
		body.classList.add('lock')
	})
	taskExit.addEventListener('click', function () {
		taskform.classList.remove('active')
		body.classList.remove('lock')
	})
}

function saveTask() {
	event.preventDefault();
    var taskTitle = document.getElementById('taskTitle').value;
    var description = document.getElementById('description').value;
    var timeToDo = document.getElementById('timeToDo').value;

    // Перевірка чи всі поля заповнені
    if (!taskTitle) {
        alert('Please fill in the task title.');
		dataIsNormal = false;
        return;
    }

    if (!description) {
		dataIsNormal = false;
        alert('Please fill in the task description.');
        return;
    }

    if (!timeToDo) {
		dataIsNormal = false;
        alert('Please fill in the time to do.');
        return;
    }

    // Перевірка правильності формату часу (час повинен бути числом)
    if (!/^\d+$/.test(timeToDo)) {
		dataIsNormal = false;
        alert('Please enter a valid time (numeric value only).');
        return;
    }

    // Якщо досягли цього місця, значить дані є правильними і можна продовжити
    var taskData = {
        taskTitle: taskTitle,
        description: description,
        timeToDo: parseInt(timeToDo)  // Перетворити введений час у число
    };

    // Отримати раніше збережені завдання
    var savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Додати нове завдання до списку
    savedTasks.unshift(taskData);

    // Зберегти оновлений список завдань
    localStorage.setItem('tasks', JSON.stringify(savedTasks));

    // Вивести повідомлення про успішне збереження
    alert('Task saved successfully!');

    // Оновити виведення завдань на сторінці
    displaySavedTasks();

	// очищаємо інпути
	document.getElementById('taskTitle').value = '';
	document.getElementById('description').value = '';
	document.getElementById('timeToDo').value = '';

	// Закрываем меню после успешного добавления задачи
	taskExit.click();
}



function displaySavedTasks() {
    var taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Очистити список перед оновленням

    // Отримати збережені завдання
    var savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Пройтися по кожному збереженому завданню та додати його до списку
    savedTasks.forEach(function(task) {
        var listItem = document.createElement('li');
        listItem.className = 'todo-item';

        var leftDiv = document.createElement('div');
        leftDiv.className = 'todo-item-left';

        var upperDiv = document.createElement('div');
        upperDiv.className = 'todo-item-upper';

        var statusDiv = document.createElement('div');
        statusDiv.className = 'todo-item-status';

        var titleDiv = document.createElement('div');
        titleDiv.className = 'todo-item-title';
        titleDiv.textContent = task.taskTitle;

        var bottomDiv = document.createElement('div');
        bottomDiv.className = 'todo-item-bottom';

        var subtitleDiv = document.createElement('div');
        subtitleDiv.className = 'todo-item-subtitle';
        subtitleDiv.textContent = task.description;

        leftDiv.appendChild(upperDiv);
        upperDiv.appendChild(statusDiv);
        upperDiv.appendChild(titleDiv);
        leftDiv.appendChild(bottomDiv);
        bottomDiv.appendChild(subtitleDiv);

        var rightDiv = document.createElement('div');
        rightDiv.className = 'todo-item-right';

        var timerDiv = document.createElement('div');
        timerDiv.className = 'todo-item-timer';
        timerDiv.textContent = task.timeToDo;

        rightDiv.appendChild(timerDiv);

        listItem.appendChild(leftDiv);
        listItem.appendChild(rightDiv);

        taskList.appendChild(listItem);
    });
}
