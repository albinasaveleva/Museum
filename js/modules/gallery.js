const gallery = () => {
    const gallery = document.querySelector('#gallery'),
        galleryContent = gallery.querySelector('.gallery__content'),
        galleryContentWrapper = gallery.querySelector('.gallery__wrapper');

    let images = [],
        shuffleImages = [];
    
    const galleryAnimation = () => {
            const images = gallery.querySelectorAll('.gallery__image-wrapper');
            [...images].forEach(item => {
                item.style.opacity = 1;
                item.style.transform = 'none'; 
            })

            document.addEventListener('scroll', () => {
                let windowPosition = {
                    top: window.pageYOffset,
                    bottom: window.pageYOffset + document.documentElement.clientHeight
                };
                [...images].forEach(item => {
                    let itemPosition = {
                        top: window.pageYOffset + item.getBoundingClientRect().top,
                        bottom: window.pageYOffset + item.getBoundingClientRect().bottom
                    };
                    if ((itemPosition.top >= windowPosition.top && 
                        itemPosition.bottom <= windowPosition.bottom) ||
                        (itemPosition.top < windowPosition.top && 
                        itemPosition.bottom > windowPosition.top) ||
                        (itemPosition.top > windowPosition.top && 
                        itemPosition.bottom > windowPosition.bottom &&
                        itemPosition.top < windowPosition.bottom)) {
                            item.style.opacity = 1;
                            item.style.transform = 'none'; 
                        } else {
                            item.style.opacity = 0;
                            item.style.transform = 'translateY(30px) scale(.8)'; 
                        }
                })
            })
        }
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
            let div = document.createElement('div');
            div.classList.add('gallery__image-wrapper');
            div.classList.add(`gallery__image-wrapper_${item.position}`);

            div.innerHTML = `
                <img class="gallery__image" src="gallery/images/${item.link}" alt="${item.link}">
                <div class="gallery__image-description">
                    <span class="gallery__image-description-item">${item.description ? item.description.name : ''}</span>
                    <span class="gallery__image-description-item">${item.description ? item.description.author : ''}</span>
                </div>
            `;
            fragment.append(div);
            if (item.description) {
                item.description;
            }
        })
        galleryContent.append(fragment);
        setTimeout(galleryAnimation, 50)
    };
    const addHoverDescription = () => {
        gallery.querySelectorAll('.gallery__image-wrapper').forEach(item => {
            item.addEventListener('mouseover', (e) => {
                item.lastElementChild.style.display = 'flex';
            })
            item.addEventListener('mouseout', (e) => {
                item.lastElementChild.style.display = 'none';
            })
        })
    }
    const getImages = (url) => {
        fetch(url)
            .then(response => response.json())
            .then(result => images.push(...result))
            .then(() => {
                addImages();
            })
            .then(() => {
                addHoverDescription();
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

    if (window.innerWidth >= 768) {
        
    }

};
export default gallery;