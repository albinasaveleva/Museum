const parallaxImage = document.querySelector('.parallax img');
const parallax = () => {
    let oldScroll = scrollY;
    let moveCount = 0;

    document.addEventListener('scroll', () => {
        let targetPosition = {
            top: window.pageYOffset + parallaxImage.getBoundingClientRect().top,
            bottom: window.pageYOffset + parallaxImage.getBoundingClientRect().bottom
        },
        windowPosition = {
            top: window.pageYOffset,
            bottom: window.pageYOffset + document.documentElement.clientHeight
        };
        const moveImage = () => {
            parallaxImage.style.objectPosition = `50% ${50 + moveCount}%`;
        };
        if ((targetPosition.top >= windowPosition.top && 
            targetPosition.bottom <= windowPosition.bottom) ||
            (targetPosition.top < windowPosition.top && 
            targetPosition.bottom > windowPosition.top) ||
            (targetPosition.top > windowPosition.top && 
            targetPosition.bottom > windowPosition.bottom &&
            targetPosition.top < windowPosition.bottom)) {
                if (scrollY > oldScroll) {
                    if (moveCount >= -49.5) {
                        moveCount -= .5;
                        moveImage();
                        oldScroll = scrollY;
                    }
                } else { 
                    if (moveCount <= 49.5) {
                        moveCount += .5;
                        moveImage();
                        oldScroll = scrollY;
                    }
                }
        }
    })
};

export default parallax;