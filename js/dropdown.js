const dropdown = document.querySelector('.todo-topline-dropdown');
const dropdownHead = dropdown.querySelector('.todo-topline-dropdown-head');
const dropdownText = dropdown.querySelector('.todo-topline-dropdown-text');
const dropdownArrow = dropdown.querySelector('.todo-topline-dropdown-arrow');
const dropdownContent = dropdown.querySelector('.todo-topline-dropdown-content');
const dropdownItems = dropdown.querySelectorAll('.todo-topline-dropdown-item');

dropdownHead.addEventListener('click', () => {
  dropdownContent.classList.toggle('active');
  dropdownArrow.classList.toggle('active');
});

dropdownItems.forEach(item => {
  item.addEventListener('click', () => {
    dropdownText.textContent = item.textContent;
    dropdownContent.classList.remove('active');
    dropdownArrow.classList.remove('active');
  });
});

// Close dropdown when clicking outside
document.addEventListener('click', (event) => {
  if (!dropdown.contains(event.target)) {
    dropdownContent.classList.remove('active');
    dropdownArrow.classList.remove('active');
  }
});
