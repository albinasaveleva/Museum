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
        document.addEventListener('mousemove', (e) => {
            let coursorX = e.pageX,
                coursorY = e.pageY,
                galleryContentPosition = {
                    top: window.pageYOffset + galleryContentWrapper.getBoundingClientRect().top,
                    bottom: window.pageYOffset + galleryContentWrapper.getBoundingClientRect().bottom,
                    left: window.pageXOffset + galleryContentWrapper.getBoundingClientRect().left,
                    right: window.pageXOffset + galleryContentWrapper.getBoundingClientRect().right
                };
            let moveCount = 50,
                oldScroll = scrollY,
                galleryContentWrapperHeight = window.getComputedStyle(galleryContent.parentNode).height.slice(0, -2),
                galleryContentHeight = window.getComputedStyle(galleryContent).height.slice(0, -2),
                maxMoveCount = galleryContentHeight - galleryContentWrapperHeight;   

            const moveContent = (count) => {
                
            }
            if ((coursorX > galleryContentPosition.left && 
                coursorX < galleryContentPosition.right) && (
                coursorY > galleryContentPosition.top &&
                coursorY < galleryContentPosition.bottom)
                ) {
                    document.body.style.overflowY = 'hidden';
                    galleryContentWrapper.style.overflowY = 'scroll';

                } else {
                    document.body.style.overflowY = '';
                    galleryContentWrapper.style.overflowY = '';
                }
        })
    }
    // gallerySlider();
};
export default gallery;