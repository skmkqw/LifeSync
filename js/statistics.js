function setTimeForStatistics() {
    var timeForWork = localStorage.getItem('timeForWork');
    if(timeForWork == null){
        timeForWork = 0;
        localStorage.setItem('timeForWork', JSON.stringify(timeForWork))
    }
    // Вибираємо елемент за його id
    var timeForWorkDisplay = document.getElementById('timeForWorkDisplay');
    // Змінюємо вміст елемента на значення timeForLife
    timeForWorkDisplay.textContent = timeForWork + ' h';

    var timeForLife = localStorage.getItem('timeForLife');
    if(timeForLife == null){
        timeForLife = 0;
        localStorage.setItem('timeForLife', JSON.stringify(timeForLife))
    }
    // Вибираємо елемент за його id
    var timeForLifeDisplay = document.getElementById('timeForLifeDisplay');
    // Змінюємо вміст елемента на значення timeForLife
    timeForLifeDisplay.textContent = timeForLife + ' h';
};

