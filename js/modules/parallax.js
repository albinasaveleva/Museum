const parallax = () => {
    const parallaxImage = document.querySelector('.parallax img');

    let moveCount = 50,
        oldScroll = scrollY;

    const moveImage = (count) => {
        moveCount += count;
        parallaxImage.style.objectPosition = `50% ${moveCount}%`;
        return moveCount;
    }

    document.addEventListener('scroll', () => {
        let targetPosition = {
            top: window.pageYOffset + parallaxImage.getBoundingClientRect().top,
            bottom: window.pageYOffset + parallaxImage.getBoundingClientRect().bottom
        },
        windowPosition = {
            top: window.pageYOffset,
            bottom: window.pageYOffset + document.documentElement.clientHeight
        };
        if ((targetPosition.top >= windowPosition.top && 
            targetPosition.bottom <= windowPosition.bottom) ||
            (targetPosition.top < windowPosition.top && 
            targetPosition.bottom > windowPosition.top) ||
            (targetPosition.top > windowPosition.top && 
            targetPosition.bottom > windowPosition.bottom &&
            targetPosition.top < windowPosition.bottom)) {
                if (scrollY > oldScroll) {
                    if (moveCount <= 99.5) {
                        moveImage(.5);
                        oldScroll = scrollY;
                    }
                } else { 
                    if (moveCount >= .5) {
                        moveImage(-.5);
                        oldScroll = scrollY;
                    }
                }
        }
    })
};

export default parallax;