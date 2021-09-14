const visitingToursCards = () => {
    const visitingSection = document.querySelector('.visiting'),
        visitingContent = visitingSection.querySelector('.visiting__content');

    let tours = [];
    const addTours = () => {
        let fragment = new DocumentFragment();
        tours.forEach(item => {
            let block = document.createElement('a');
            block.classList.add('tour');
            block.href = `tours/${item.link}`;
            block.target = '_blank';

            block.innerHTML = `
                <div class="tour-inner">
                    <img src="tours/${item.image}" alt="${item.title}" class="tour-image">
                    <div class="tour-description">
                        <h3 class="tour-title">${item.title}</h3>
                        <div class="tour-title-delimiter"></div>
                        <span class="tour-subtitle">360° Virtual Tour</span>
                        <span class="tour-subtitle_small">Google Street Panorama View</span>
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
    getTours('../tours/tours.json');
};
export default visitingToursCards;