const scroll = () => {
    document.querySelectorAll('.nav__item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            item.firstElementChild.hasAttribute('href') &&
                document.querySelector(item.firstElementChild.getAttribute('href')).scrollIntoView({block: "start", behavior: "smooth"});
        })  
    })
};
export default scroll;