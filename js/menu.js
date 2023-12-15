const sidebar = document.querySelector('.sidebar')
const menuBtn = document.querySelector('.menu-icon')
const body = document.querySelector('body')

if (sidebar && menuBtn) {
	menuBtn.addEventListener('click', function () {
		sidebar.classList.toggle('active')
		menuBtn.classList.toggle('active')
		body.classList.toggle('lock')
	})
}