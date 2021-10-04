const visiting = () => {
    const visitingSection = document.querySelector('#visiting'),
        visitingContent = visitingSection.querySelector('.visiting__content');

    let tours = [];
    const addTours = () => {
        let fragment = new DocumentFragment();
        tours.forEach(item => {
            let block = document.createElement('a');
            block.classList.add('visiting__card');
            block.href = `assets/tours/pages/${item.link}`;
            block.target = '_blank';

            block.innerHTML = `
                <div class="visiting__card-inner">
                    <img src="assets/image/tours/${item.image}" alt="${item.title}" class="visiting__card-image">
                    <div class="visiting__card-description">
                        <h3 class="visiting__card-title">${item.title}</h3>
                        <div class="visiting__card-delimiter delimiter_small"></div>
                        <span class="visiting__card-subtitle">360° Virtual Tour</span>
                        <span class="visiting__card-subtitle_small">Google Street Panorama View</span>
                    </div>
                </div>
            `;
            fragment.append(block);
        })
        visitingContent.append(fragment)

    }
    const getTours = (url) => {
        fetch(url)
        .then(response => response.json())
        .then(result => {
            tours.push(...result)
        })
        .then( () => {
            addTours();
        })
    };
    getTours('js/json/tours.json');
};
export default visiting;