const gallery = () => {
    const gallery = document.querySelector('.gallery'),
        galleryContent = gallery.querySelector('.gallery__content'),
        galleryContentWrapper = gallery.querySelector('.gallery__content-wrapper');

    let images = [],
        shuffleImages = [];

    const shuffle = () => {
        shuffleImages = [...images];
        let m = shuffleImages.length;
        while (m) {
            const i = Math.floor(Math.random() * m--);
            [shuffleImages[m], shuffleImages[i]] = [shuffleImages[i], shuffleImages[m]];
        }
        return shuffleImages;
        };
    const addImages = () => {
        shuffle();
        let fragment = new DocumentFragment();
        shuffleImages.forEach(item => {
            let img = document.createElement('img');
            img.src = `gallery/images/${item}`;
            img.alt = item;
            fragment.append(img);
        })
        galleryContent.append(fragment);
    };
    const getImages = (url) => {
        fetch(url)
            .then(response => response.json())
            .then(result => images.push(...result))
            .then(() => {
                addImages();
            })
    };
    getImages('../gallery/gallery.json');
    const gallerySlider = () => {
        let moveCount = 0;

        document.addEventListener('mousemove', (e) => {
            let coursorPosition = {
                x: e.pageX,
                y: e.pageY
                },
                galleryContentPosition = {
                    top: window.pageYOffset + galleryContentWrapper.getBoundingClientRect().top,
                    bottom: window.pageYOffset + galleryContentWrapper.getBoundingClientRect().bottom,
                    left: window.pageXOffset + galleryContentWrapper.getBoundingClientRect().left,
                    right: window.pageXOffset + galleryContentWrapper.getBoundingClientRect().right
                };
            let maxMoveCount = window.getComputedStyle(galleryContent).height.slice(0, -2) - 
                window.getComputedStyle(galleryContent.parentNode).height.slice(0, -2);   
            const moveCounter = (value) => {
                return moveCount += value;
            }
            const moveContent = () => {
                if ( e.clientY < window.innerHeight / 2) {
                    moveCounter(10);
                    if (moveCount > 0) {
                        moveCount = 0;
                    }
                    galleryContent.style.transition = `transform 2s linear`;
                    galleryContent.style.transform = `translateY(${moveCount}px)`;
                } else if (e.clientY > window.innerHeight / 2) {
                    moveCounter(-10);
                    if (Math.abs(moveCount) > maxMoveCount) {
                        moveCount = -maxMoveCount;
                    }
                    galleryContent.style.transition = `transform 2s linear`;
                    galleryContent.style.transform = `translateY(${moveCount}px)`;
                }
            }
            if ((coursorPosition.x > galleryContentPosition.left && 
                coursorPosition.x < galleryContentPosition.right) && (
                coursorPosition.y > galleryContentPosition.top &&
                coursorPosition.y < galleryContentPosition.bottom)
                ) {
                    moveContent();
                } 
        })
    }
    gallerySlider();
};
export default gallery;