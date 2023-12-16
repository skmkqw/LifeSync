const tabTitles = document.querySelectorAll('.tabs-title')
const tabs = document.querySelectorAll('.tab')

tabTitles.forEach(item => item.addEventListener('click', event => {

	// Получаем атрибут заголовка на который мы кликнули конкретно!
	const tabsTitleTarget = item.getAttribute('data-tab');

	// Удаляем от всех заголовков класс active-tab
	tabTitles.forEach(element => element.classList.remove('active'));

	// Добавляем всем tab__content класс hidden-tab-content, который скрывает содержимое!
	tabs.forEach(element => element.classList.add('hidden'));

	// Добавляем класс active-tab, заголовку который нажали в данный момент!
	item.classList.add('active');

	body.classList.remove('lock')
	sidebar.classList.remove('active')
	menuBtn.classList.remove('active')

	// Удаляем класс hidden-tab-content, чтобы показывалось его содержимое!
	document.getElementById(tabsTitleTarget).classList.remove('hidden');

}));

// Мы указываем, какая конктретно вкладка должна быть активна при загрузке страницы со старта,
// если нужно, чтобы все вкладки ыли скрыты изначально, то удалите код ниже!
document.querySelector('[data-tab="todo"]').classList.add('active');
document.querySelector('#todo').classList.remove('hidden');