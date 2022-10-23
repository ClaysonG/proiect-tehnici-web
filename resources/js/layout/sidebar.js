const navBtn = document.querySelector("#nav-btn");
const closeBtn = document.querySelector("#close-btn");
const sidebar = document.querySelector("#sidebar");

// show sidebar
function showSideBar() {
  navBtn.addEventListener("click", function () {
    sidebar.classList.add("show-sidebar");
  });
}

// close sidebar
function closeSideBar() {
  closeBtn.addEventListener("click", function () {
    sidebar.classList.remove("show-sidebar");
  });
  const sidebarHomeSubLinks = document.querySelectorAll(
    "#sidebar-home-sub-link"
  );
  sidebarHomeSubLinks.forEach((link) => {
    link.addEventListener("click", function () {
      sidebar.classList.remove("show-sidebar");
    });
  });
}

export { showSideBar, closeSideBar };
