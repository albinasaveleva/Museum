const visiting = () => {
    const visitingSection = document.querySelector('#visiting'),
        visitingContent = visitingSection.querySelector('.content');

    let tours = [];
    const addTours = () => {
        let fragment = new DocumentFragment();
        tours.forEach(item => {
            let block = document.createElement('a');
            block.classList.add('card');
            block.href = `tours/pages/${item.link}`;
            block.target = '_blank';

            block.innerHTML = `
                <div class="inner">
                    <img src="tours/images/${item.image}" alt="${item.title}" class="image">
                    <div class="description">
                        <h3 class="title">${item.title}</h3>
                        <div class="delimiter delimiter_small"></div>
                        <span class="subtitle">360° Virtual Tour</span>
                        <span class="subtitle_small">Google Street Panorama View</span>
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
export default visiting;