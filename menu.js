document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menu-button');
    const slidingMenu = document.getElementById('sliding-menu');
    const closeButton = document.querySelector('.close');

    menuButton.addEventListener('click', function() {
        slidingMenu.classList.toggle('open');
    });

    closeButton.addEventListener('click', function() {
        slidingMenu.classList.remove('open');
    });
});