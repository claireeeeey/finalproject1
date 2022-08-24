const navToggle = document.querySelector('.nav_toggle');

//add a click listener to the navigation bar to open the menu
navToggle.addEventListener('click', () => {
  document.body.classList.toggle('nav-open');
});
