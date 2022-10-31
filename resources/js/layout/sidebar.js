const navBtn = document.querySelector("#nav-btn");
const closeBtn = document.querySelector("#close-btn");
const sidebar = document.querySelector("#sidebar");
const backToTopBtn = document.querySelector("#backToTopBtn");

// show sidebar
function showSideBar() {
  navBtn.addEventListener("click", function () {
    sidebar.classList.add("show-sidebar");
    backToTopBtn.classList.add("hide-element");
  });
}

// close sidebar
function closeSideBar() {
  closeBtn.addEventListener("click", function () {
    sidebar.classList.remove("show-sidebar");
    backToTopBtn.classList.remove("hide-element");
  });
  const sidebarHomeSubLinks = document.querySelectorAll(
    "#sidebar-home-sub-link"
  );
  sidebarHomeSubLinks.forEach((link) => {
    link.addEventListener("click", function () {
      sidebar.classList.remove("show-sidebar");
      backToTopBtn.classList.remove("hide-element");
    });
  });
}

export { showSideBar, closeSideBar };
