let slideIndex = 1;
showSlides(slideIndex);

function showSlides(n) {
    let slides = document.querySelectorAll(".banner-slider-item");
    if (n > slides.length) slideIndex = 1; /* if next button over number of slides then reset to the first slide */
    if (n < 1) slideIndex = slides.length; /* if previous button under the first slide then turn to the last slide */
    for (let i = 0; i < slides.length; i++)
    {
        if (i == (slideIndex - 1))
            slides[i].style.display = "block";
        else
            slides[i].style.display = "none";
    }
}

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}