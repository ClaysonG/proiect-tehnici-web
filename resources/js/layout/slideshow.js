let slideIndex = 1;

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName("product-card");
  const dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

function handleSlideshow() {
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");
  const dots = document.querySelectorAll(".dot");

  prev.addEventListener("click", function () {
    plusSlides(-1);
  });
  next.addEventListener("click", function () {
    plusSlides(1);
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", function () {
      currentSlide(index + 1);
    });
  });
}

function displaySlideshow() {
  // display slideshow only on medium or bigger screen (admin only)
  const admin = window.localStorage.getItem("admin");
  const mediumScreen = window.matchMedia("(min-width: 676px)");

  if (mediumScreen.matches && admin) {
    showSlides(slideIndex);
  }
}

export { handleSlideshow, displaySlideshow };
