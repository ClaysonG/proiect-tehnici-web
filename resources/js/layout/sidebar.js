const navBtn = document.querySelector("#nav-btn");
const closeBtn = document.querySelector("#close-btn");
const sidebar = document.querySelector("#sidebar");
const backToTopBtn = document.querySelector("#backToTopBtn");

// show sidebar
function showSideBar() {
  navBtn.addEventListener("click", function () {
    sidebar.classList.add("show-sidebar");
    backToTopBtn.classList.add("hide-element");
    // navBtn.classList.add("remove-element");
    // closeBtn.classList.add("show-element");
    // sidebar.classList.remove("close-sidebar");
  });
}

// close sidebar
function closeSideBar() {
  closeBtn.addEventListener("click", function () {
    sidebar.classList.remove("show-sidebar");
    backToTopBtn.classList.remove("hide-element");
    // navBtn.classList.remove("remove-element");
    // closeBtn.classList.remove("show-element");
    // sidebar.classList.add("close-sidebar");
  });
  const sidebarHomeSubLinks = document.querySelectorAll(
    ".sidebar-home-sub-link"
  );
  sidebarHomeSubLinks.forEach((link) => {
    link.addEventListener("click", function () {
      sidebar.classList.remove("show-sidebar");
      backToTopBtn.classList.remove("hide-element");
      // navBtn.classList.remove("remove-element");
      // closeBtn.classList.remove("show-element");
      // sidebar.classList.add("close-sidebar");
    });
  });
}

export { showSideBar, closeSideBar };
