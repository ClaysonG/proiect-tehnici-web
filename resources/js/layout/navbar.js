const navbar = document.querySelector("#nav");

// add alt color class to navbar
function addNavbarAltColor() {
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 80) {
      navbar.classList.add("navbar-alt-color");
    } else {
      navbar.classList.remove("navbar-alt-color");
    }
  });
}

export { addNavbarAltColor };
