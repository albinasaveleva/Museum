const explore = () => {
    const explore = document.querySelector('#explore'),
        sliderRange = explore.querySelector('.slider-range'),
        sliderImage = explore.querySelector('.slider-image_after'),
        sliderPseudoRange = explore.querySelector('.pseudo-range');
    const moveImage = () => {
        sliderImage.style.width = `${sliderRange.value}%`;
        sliderPseudoRange.style.left = `${sliderRange.value}%`
    }
    moveImage();
    sliderRange.addEventListener('change', moveImage);
    sliderRange.addEventListener('mousemove', moveImage);
    sliderRange.addEventListener('touchmove', moveImage);
};
export default explore;