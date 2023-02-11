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

  if (sidebarAccountDown) {
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
  }

  if (sidebarAccountUp) {
    sidebarAccountUp.addEventListener("click", (e) => {
      e.preventDefault();
      sidebarAccountLinks.style.display = "none";
      sidebarAccountUp.style.cssText = "display: none !important";
      sidebarAccountDown.style.cssText = "display: inline !important";
    });
  }
}

function handleCurrentPageLink() {
  // Home
  const navHomeLink = document.querySelector("#nav-home-link");
  const sidebarHomeLink = document.querySelector("#sidebar-home-link");
  // Products
  const navProductsLink = document.querySelector("#nav-products-link");
  const sidebarProductsLink = document.querySelector("#sidebar-products-link");
  // About
  const navAboutLink = document.querySelector("#nav-about-link");
  const sidebarAboutLink = document.querySelector("#sidebar-about-link");
  // Account
  const navAccountLink = document.querySelector("#nav-account-link");
  const sidebarAccountLink = document.querySelector("#sidebar-account-link");

  window.addEventListener("load", (e) => {
    switch (window.location.pathname) {
      case "/": {
        navHomeLink.style.color = "var(--clr-primary-5)";
        sidebarHomeLink.style.color = "var(--clr-primary-5)";
        break;
      }
      case "/products": {
        navProductsLink.style.color = "var(--clr-primary-5)";
        sidebarProductsLink.style.color = "var(--clr-primary-5)";
        break;
      }
      case "/about": {
        navAboutLink.style.color = "var(--clr-primary-5)";
        sidebarAboutLink.style.color = "var(--clr-primary-5)";
        break;
      }
      case "/account": {
        navAccountLink.style.color = "var(--clr-primary-5)";
        sidebarAccountLink.style.color = "var(--clr-primary-5)";
        break;
      }
    }
  });
}

export { handleSidebar, handleSidebarSubMenus, handleCurrentPageLink };
