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
	var category = document.getElementById('category').value;
    if(category == 'work'){

        category = 'Work';
    }
    if(category == 'life'){
        category = 'Life';
    }
    var frequency = document.getElementById('todo-topline-dropdown-text').textContent;
    console.log(frequency);

    // Перевірка чи всі поля заповнені
    if (!taskTitle) {
        alert('Please fill in the task title.');
        return;
    }

    if (!description) {
        alert('Please fill in the task description.');
        return;
    }

    if (!timeToDo) {
        alert('Please fill in the time to do.');
        return;
    }

	if (!category) {
        alert('Please fill in the category.');
        return;
	}

    // Перевірка правильності формату часу (час повинен бути числом)
    if (!/^\d+$/.test(timeToDo)) {
        alert('Please enter a valid time (numeric value only).');
        return;
    }

    // Перевірка правильності формату категорії
    if (category != 'Work'  && category != 'Life') {
        alert('Please enter a valid category (Work/Life).');
        return;
    }

    // Якщо досягли цього місця, значить дані є правильними і можна продовжити
    var taskData = {
        taskTitle: taskTitle,
        description: description,
        timeToDo: parseInt(timeToDo),  // Перетворити введений час у число
        category: category  // Додайте категорію до об'єкту taskData
    };

    
    
    if(frequency == 'Today'){
        // Отримати раніше збережені завдання
        var savedTasks = JSON.parse(localStorage.getItem('tasksToday')) || [];
        // Додати нове завдання до списку
        savedTasks.unshift(taskData);
         // Зберегти оновлений список завдань
        localStorage.setItem('tasksToday', JSON.stringify(savedTasks));
    }
    else if(frequency == 'This week'){
        // Отримати раніше збережені завдання
        var savedTasks = JSON.parse(localStorage.getItem('tasksWeek')) || [];
        // Додати нове завдання до списку
        savedTasks.unshift(taskData);
        // Зберегти оновлений список завдань
        localStorage.setItem('tasksWeek', JSON.stringify(savedTasks));
    }
    else if(frequency == 'This month'){
        // Отримати раніше збережені завдання
        var savedTasks = JSON.parse(localStorage.getItem('tasksMonth')) || [];
        // Додати нове завдання до списку
        savedTasks.unshift(taskData);
        // Зберегти оновлений список завдань
        localStorage.setItem('tasksMonth', JSON.stringify(savedTasks));
    }
   

    // Вивести повідомлення про успішне збереження
    alert('Task saved successfully!');

    // Оновити виведення завдань на сторінці
    displaySavedTasks();

	// очищаємо інпути
	document.getElementById('taskTitle').value = '';
	document.getElementById('description').value = '';
	document.getElementById('timeToDo').value = '';
	document.getElementById('category').value = '';

	// Закрываем меню после успешного добавления задачи
	taskExit.click();
}



function displaySavedTasks() {
    var frequency = document.getElementById('todo-topline-dropdown-text').textContent;
    var taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Очистити список перед оновленням

    var savedTasks = null;
    // Отримати збережені завдання
    if(frequency == 'Today'){
        savedTasks = JSON.parse(localStorage.getItem('tasksToday')) || [];
    }
    else if(frequency == 'This week'){
       savedTasks = JSON.parse(localStorage.getItem('tasksWeek')) || [];
    }
    else if(frequency == 'This month'){
       savedTasks = JSON.parse(localStorage.getItem('tasksMonth')) || [];
    }
    
    // Пройтися по кожному збереженому завданню та додати його до списку
	if (savedTasks == null || savedTasks.length == 0) {
		var emptyText = document.createElement('div');
		emptyText.className = 'emptyText';
		emptyText.textContent = "No tasks available. Add new tasks to get started!";
		taskList.appendChild(emptyText);
        return;
	}
	
    savedTasks.forEach(function(task, index) {
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

        var categoryDiv = document.createElement('div');  
        categoryDiv.className = 'todo-item-category';
        categoryDiv.textContent = 'Category: ' + task.category;

        var bottomDiv = document.createElement('div');
        bottomDiv.className = 'todo-item-bottom';

        var subtitleDiv = document.createElement('div');
        subtitleDiv.className = 'todo-item-subtitle';
        subtitleDiv.textContent = task.description;

        leftDiv.appendChild(upperDiv);
        upperDiv.appendChild(statusDiv);
        upperDiv.appendChild(titleDiv);
        upperDiv.appendChild(categoryDiv);
        leftDiv.appendChild(bottomDiv);
        bottomDiv.appendChild(subtitleDiv);

        var rightDiv = document.createElement('div');
        rightDiv.className = 'todo-item-right';

        var timerDiv = document.createElement('div');
        timerDiv.className = 'todo-item-timer';
        timerDiv.textContent = task.timeToDo;

        var startTimerBtn = document.createElement('div');
        startTimerBtn.className = 'todo-item-start'
        const img = document.createElement('img')
        img.src = 'assets/play.png'
        startTimerBtn.appendChild(img)


        rightDiv.appendChild(startTimerBtn)
        rightDiv.appendChild(timerDiv);

        listItem.appendChild(leftDiv);
        listItem.appendChild(rightDiv);

        taskList.appendChild(listItem);
		startTimerBtn.addEventListener('click', function () {
			// Очищення попереднього інтервалу (якщо такий існує)
			clearInterval(countdownInterval);
            

			isTaskChosen = !isTaskChosen;
			updateTaskDisplay();
			localStorage.setItem('isTaskChosen', isTaskChosen);
	
			let currentTaskData = {
				taskTitle: task.taskTitle,
				description: task.description,
				timeToDo: task.timeToDo,
				category: task.category 
			};
			localStorage.setItem('currentTaskData', JSON.stringify(currentTaskData));
	
			var currentTaskTitleElement = document.getElementById('currentTaskTitle');
			var currentTaskDescriptionElement = document.getElementById('currentTaskDescription');
			var currentTaskCategoryElement = document.getElementById('currentTaskCategory');
	
			currentTaskTitleElement.textContent = currentTaskData.taskTitle;
			currentTaskDescriptionElement.textContent = currentTaskData.description;
			currentTaskCategoryElement.textContent = currentTaskData.category;
	
			startTimer(currentTaskData.timeToDo*3600);
	
			savedTasks.splice(index, 1);
            if(frequency == 'Today'){
                localStorage.setItem('tasksToday', JSON.stringify(savedTasks));
            }
            else if(frequency == 'This week'){
               localStorage.setItem('tasksWeek', JSON.stringify(savedTasks));
            }
            else if(frequency == 'This month'){
               localStorage.setItem('tasksMonth', JSON.stringify(savedTasks));
            }

            if(task.category = 'Work'){
                var timeForWork = localStorage.getItem('timeForWork');
                timeForWork = Number(timeForWork) + Number(task.timeToDo);
                localStorage.setItem('timeForWork', JSON.stringify(timeForWork))
            } else  if(task.category = 'Life'){
                var timeForLife = localStorage.getItem('timeForLife');
                timeForLife = Number(timeForLife) + Number(task.timeToDo);
                localStorage.setItem('timeForLife', JSON.stringify(timeForLife))
            }
            setTimeForStatistics()
	
			displaySavedTasks();
		});
		
    });
}
