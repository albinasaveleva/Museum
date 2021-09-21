const gallery = () => {
    const gallery = document.querySelector('.gallery'),
        galleryContent = gallery.querySelector('.gallery__content');

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

};
export default gallery;