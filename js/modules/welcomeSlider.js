const welcomeSlider = () => {
    const slider = document.querySelector('.welcome__slider'),
        slides = slider.querySelector('.slides').children,
        currentCount = slider.querySelector('.current-count'),
        countLength = slider.querySelector('.count-length'),
        pagination = slider.querySelector('.slider-pagination'),
        leftArrow = slider.querySelector('#slider-arrow_left'),
        rightArrow = slider.querySelector('#slider-arrow_right');
    let currentSlide = 0;

    const changeCurrentCount = (index) => {
        (index >= 9) ? currentCount.textContent = slides.length : 
            currentCount.textContent = `0${index + 1}`;
    }
    const changeLengthCount = () => {
        (slides.length >= 9) ? countLength.textContent = slides.length : 
            countLength.textContent = `0${slides.length}`;
    }
    const addPagination = () => {
        let paginationItem = document.createElement('div');
        paginationItem.classList.add('slider-pagination-item');
        pagination.append(paginationItem);
    }
    const addActivePaginationItem = (currentIndex) => {
        [...pagination.children].forEach((item, index) => {
            if (index === currentIndex) {
                item.classList.add('slider-pagination-item_active');
            } else {
                if (item.matches('.slider-pagination-item_active')) {
                    item.classList.remove('slider-pagination-item_active');
                }
            }
        })
    }
    const prev = (index) => {
        slides[index].classList.remove('slide_active');
    }
    const next = (index) => {
        slides[index].classList.add('slide_active');
    }
    const moveSlide = (index, direction) => {
        if (direction === 'toRight') {
            slides[index].classList.add('slide_active_to-right')
        } else if (direction === 'toLeft') {
            slides[index].classList.add('slide_active_to-left')
        } 
    }
    [...slides].forEach((item, index) => {
        addPagination();
        if (index === 0) {
            item.classList.add('slide_active')
        }
    });
    [...pagination.children].forEach((item, index) => {
        item.addEventListener('click', () => {
            prev(currentSlide);
            currentSlide = index;
            next(currentSlide);
            addActivePaginationItem(currentSlide);
            changeCurrentCount(currentSlide);
        })
    })
    changeLengthCount();
    addActivePaginationItem(currentSlide);
    changeCurrentCount(currentSlide);


    leftArrow.addEventListener('click', () => {
        prev(currentSlide);
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        };
        next(currentSlide);
        addActivePaginationItem(currentSlide);
        changeCurrentCount(currentSlide);
    });
    rightArrow.addEventListener('click', () => {
        moveSlide(currentSlide, 'toRight')
        prev(currentSlide);
        currentSlide++;
        if (currentSlide > slides.length - 1) {
            currentSlide = 0;
        };
        next(currentSlide);
        moveSlide(currentSlide, 'toRight');
        addActivePaginationItem(currentSlide);
        changeCurrentCount(currentSlide);
    })

}
export default welcomeSlider;