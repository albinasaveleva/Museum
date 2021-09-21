const exploreSlider = () => {
    const slider = document.querySelector('.explore__slider'),
        sliderRange = slider.querySelector('.slider-range'),
        sliderImage = slider.querySelector('.slider-image_after');
    const moveImage = () => {
        sliderImage.style.width = `${sliderRange.value}%`;
    }
    moveImage();
    sliderRange.addEventListener('change', moveImage);
    sliderRange.addEventListener('mousemove', moveImage);
};
export default exploreSlider;