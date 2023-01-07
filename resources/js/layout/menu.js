const sidebar = document.querySelector("#sidebar");
const sidebarSubLinks = document.querySelectorAll(".sidebar-sub-links");
const sidebarHomeLinks = document.querySelector("#sidebar-home-links");
const sidebarProductsLinks = document.querySelector("#sidebar-products-links");
const sidebarAccountLinks = document.querySelector("#sidebar-account-links");
const sidebarHomeListItem = document.querySelector("#sidebar-home-list-item");
const sidebarHomeUp = document.querySelector("#sidebar-home-up");
const sidebarHomeDown = document.querySelector("#sidebar-home-down");
const sidebarProductsListItem = document.querySelector(
  "#sidebar-products-list-item"
);
const sidebarProductsUp = document.querySelector("#sidebar-products-up");
const sidebarProductsDown = document.querySelector("#sidebar-products-down");
const sidebarAboutListItem = document.querySelector("#sidebar-about-list-item");
const sidebarAccountListItem = document.querySelector(
  "#sidebar-account-list-item"
);
const sidebarAccountUp = document.querySelector("#sidebar-account-up");
const sidebarAccountDown = document.querySelector("#sidebar-account-down");

function handleSidebar() {
  window.addEventListener("resize", (e) => {
    const mediumScreen = window.matchMedia("(min-width: 768px)");
    const sidebarOpen = sidebar.classList.contains("show-sidebar");
    if (mediumScreen.matches && sidebarOpen) {
      sidebar.classList.remove("show-sidebar");
      sidebarSubLinks.forEach((subLink) => {
        subLink.style.display = "none";
        // Reset arrow buttons
        sidebarHomeUp.style.cssText = "display: none !important";
        sidebarHomeDown.style.cssText = "display: inline !important";
        sidebarProductsUp.style.cssText = "display: none !important";
        sidebarProductsDown.style.cssText = "display: inline !important";
        sidebarAccountUp.style.cssText = "display: none !important";
        sidebarAccountDown.style.cssText = "display: inline !important";
      });
    }
  });
}

function handleSidebarSubMenus() {
  sidebarHomeDown.addEventListener("click", (e) => {
    e.preventDefault();
    sidebarHomeLinks.style.display = "block";
    sidebarHomeUp.style.cssText = "display: inline !important";
    sidebarHomeDown.style.cssText = "display: none !important";
    // if (sidebarProductsLinks.style.display === "block") {
    //   sidebarProductsLinks.style.display = "none";
    //   sidebarProductsUp.style.cssText = "display: none !important";
    //   sidebarProductsDown.style.cssText = "display: inline !important";
    // }
    // if (sidebarAccountLinks.style.display === "block") {
    //   sidebarAccountLinks.style.display = "none";
    //   sidebarAccountUp.style.cssText = "display: none !important";
    //   sidebarAccountDown.style.cssText = "display: inline !important";
    // }
  });

  sidebarHomeUp.addEventListener("click", (e) => {
    e.preventDefault();
    sidebarHomeLinks.style.display = "none";
    sidebarHomeUp.style.cssText = "display: none !important";
    sidebarHomeDown.style.cssText = "display: inline !important";
  });

  sidebarProductsDown.addEventListener("click", (e) => {
    e.preventDefault();
    sidebarProductsLinks.style.display = "block";
    sidebarProductsUp.style.cssText = "display: inline !important";
    sidebarProductsDown.style.cssText = "display: none !important";
    // if (sidebarHomeLinks.style.display === "block") {
    //   sidebarHomeLinks.style.display = "none";
    //   sidebarHomeUp.style.cssText = "display: none !important";
    //   sidebarHomeDown.style.cssText = "display: inline !important";
    // }
    // if (sidebarAccountLinks.style.display === "block") {
    //   sidebarAccountLinks.style.display = "none";
    //   sidebarAccountUp.style.cssText = "display: none !important";
    //   sidebarAccountDown.style.cssText = "display: inline !important";
    // }
  });

  sidebarProductsUp.addEventListener("click", (e) => {
    e.preventDefault();
    sidebarProductsLinks.style.display = "none";
    sidebarProductsUp.style.cssText = "display: none !important";
    sidebarProductsDown.style.cssText = "display: inline !important";
  });

  sidebarAccountDown.addEventListener("click", (e) => {
    e.preventDefault();
    sidebarAccountLinks.style.display = "block";
    sidebarAccountUp.style.cssText = "display: inline !important";
    sidebarAccountDown.style.cssText = "display: none !important";
    // if (sidebarHomeLinks.style.display === "block") {
    //   sidebarHomeLinks.style.display = "none";
    //   sidebarHomeUp.style.cssText = "display: none !important";
    //   sidebarHomeDown.style.cssText = "display: inline !important";
    // }
    // if (sidebarProductsLinks.style.display === "block") {
    //   sidebarProductsLinks.style.display = "none";
    //   sidebarProductsUp.style.cssText = "display: none !important";
    //   sidebarProductsDown.style.cssText = "display: inline !important";
    // }
  });

  sidebarAccountUp.addEventListener("click", (e) => {
    e.preventDefault();
    sidebarAccountLinks.style.display = "none";
    sidebarAccountUp.style.cssText = "display: none !important";
    sidebarAccountDown.style.cssText = "display: inline !important";
  });
}

export { handleSidebar, handleSidebarSubMenus };
