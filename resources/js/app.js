const navbar = document.querySelector("#nav");
const navBtn = document.querySelector("#nav-btn");
const closeBtn = document.querySelector("#close-btn");
const sidebar = document.querySelector("#sidebar");
const date = document.querySelector("#date");
const sidebarAboutLink = document.querySelector("#sidebar-about-link");
const sidebarSearchLink = document.querySelector("#sidebar-search-link");
const sidebarProductsLink = document.querySelector("#sidebar-products-link");
const sidebarNewsLink = document.querySelector("#sidebar-news-link");
// add fixed class to navbar
window.addEventListener("scroll", function () {
  if (window.pageYOffset > 80) {
    navbar.classList.add("navbar-fixed");
  } else {
    navbar.classList.remove("navbar-fixed");
  }
});
// show sidebar
navBtn.addEventListener("click", function () {
  sidebar.classList.add("show-sidebar");
});
// close sidebar
closeBtn.addEventListener("click", function () {
  sidebar.classList.remove("show-sidebar");
});
sidebarAboutLink.addEventListener("click", function () {
  sidebar.classList.remove("show-sidebar");
});
sidebarSearchLink.addEventListener("click", function () {
  sidebar.classList.remove("show-sidebar");
});
sidebarProductsLink.addEventListener("click", function () {
  sidebar.classList.remove("show-sidebar");
});
sidebarNewsLink.addEventListener("click", function () {
  sidebar.classList.remove("show-sidebar");
});
// set year
date.innerHTML = new Date().getFullYear();

// smooth scroll
// select links
const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const id = e.target.getAttribute("href").slice(1);
    const element = document.getElementById(id);

    let position = element.offsetTop - 80;

    window.scrollTo({
      left: 0,
      top: position,
      behavior: "smooth",
    });
  });
});
