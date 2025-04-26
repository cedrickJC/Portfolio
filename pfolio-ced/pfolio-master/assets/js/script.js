'use strict';

/*  add event listener on multiple elements */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}

/*  PRELOADER */

const preloader = document.querySelector("[data-preloader]");

window.addEventListener("DOMContentLoaded", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});

/** NAVBAR
 * navbar toggle for mobile 
 * */

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");
const navbarLinks = document.querySelectorAll(".navbar-link");

const toggleNavbar = function () {
    navbar.classList.toggle("active");
    navToggleBtn.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
};

// Add event listener to toggle buttons
navTogglers.forEach(toggler => {
    toggler.addEventListener("click", toggleNavbar);
});

// Add smooth scroll and close navbar on link click
navbarLinks.forEach(link => {
    link.addEventListener("click", function () {
        toggleNavbar(); // Close the navbar
        const targetId = this.getAttribute("href"); // Get the target section
        const targetSection = document.querySelector(targetId); // Select the target section
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the section
        }
    });
});

/** HEADER
 * header active when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});

/** ABOUT SKILLS
 */

document.addEventListener("DOMContentLoaded", () => {
  const progressItems = document.querySelectorAll(".progress-item");

  progressItems.forEach(item => {
      const percentage = parseInt(item.getAttribute("data-percentage"));
      const progressCircle = item.querySelector(".progress-circle");
      const percentageText = item.querySelector(".progress-percentage");
      
      let currentPercentage = 0;
      const incrementSpeed = 20; // Adjust this value to control speed

      const interval = setInterval(() => {
          if (currentPercentage < percentage) {
              currentPercentage++;
              percentageText.textContent = `${currentPercentage}%`;
              progressCircle.style.background = `conic-gradient(#678e1d ${currentPercentage * 3.6}deg, #333 ${currentPercentage * 3.6}deg)`;
          } else {
              clearInterval(interval);
          }
      }, incrementSpeed);
  });
});



/** SLIDER
 */

const sliders = document.querySelectorAll("[data-slider]");

const initSlider = function (currentSlider) {

  const sliderContainer = currentSlider.querySelector("[data-slider-container]");
  const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
  const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

  let totalSliderVisibleItems = Number(getComputedStyle(currentSlider).getPropertyValue("--slider-items"));
  let totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

  let currentSlidePos = 0;

  const moveSliderItem = function () {
    sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
  }

  /**
   * NEXT SLIDE
   */
  const slideNext = function () {
    const slideEnd = currentSlidePos >= totalSlidableItems;

    if (slideEnd) {
      currentSlidePos = 0;
    } else {
      currentSlidePos++;
    }

    moveSliderItem();
  }

  sliderNextBtn.addEventListener("click", slideNext);

  /**
   * PREVIOUS SLIDE
   */
  const slidePrev = function () {
    if (currentSlidePos <= 0) {
      currentSlidePos = totalSlidableItems;
    } else {
      currentSlidePos--;
    }

    moveSliderItem();
  }

  sliderPrevBtn.addEventListener("click", slidePrev);

  const dontHaveExtraItem = totalSlidableItems <= 0;
  if (dontHaveExtraItem) {
    sliderNextBtn.style.display = 'none';
    sliderPrevBtn.style.display = 'none';
  }

  /**
   * slide with [shift + mouse wheel]
   */

  currentSlider.addEventListener("wheel", function (event) {
    if (event.shiftKey && event.deltaY > 0) slideNext();
    if (event.shiftKey && event.deltaY < 0) slidePrev();
  });

  /**
   * RESPONSIVE
   */

  window.addEventListener("resize", function () {
    totalSliderVisibleItems = Number(getComputedStyle(currentSlider).getPropertyValue("--slider-items"));
    totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

    moveSliderItem();
  });

}

for (let i = 0, len = sliders.length; i < len; i++) { initSlider(sliders[i]); }