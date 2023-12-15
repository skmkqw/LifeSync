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