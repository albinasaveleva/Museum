const mobileMenu = () =>  {
    const burgerMenu = document.querySelector('#burger-menu__button'),
        mobileMenu = document.querySelector('.header__mobile-menu'),
        welcomeContent = document.querySelector('.welcome__content');

    const openMenu = () => {
        mobileMenu.classList.add('mobile-menu_active');
        burgerMenu.style.backgroundImage = "url('../assets/icons/burger-menu_close.svg')";
        if (window.innerWidth >= 1024) {
            welcomeContent.style.display = 'none';
        }
    }
    const closeMenu = () => {
        mobileMenu.classList.remove('mobile-menu_active');
        burgerMenu.style.backgroundImage = '';
        if (window.innerWidth >= 1024) {
            welcomeContent.style.display = '';
        }
    }

    document.addEventListener('click', (e) => {
        let target = e.target;
        if (target.matches('#burger-menu__button')) {
            if (!mobileMenu.classList.contains('mobile-menu_active')) {
                openMenu();
            } else {
                closeMenu();
            }
            
        } else if (target.closest('.nav__item')) {
            if (target.parentElement.parentElement.closest('.header__mobile-menu')) {
                closeMenu();
            }
        }
    })
}
export default mobileMenu;