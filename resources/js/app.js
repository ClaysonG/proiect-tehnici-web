import { addNavbarAltColor } from "./layout/navbar.js";
import { showSideBar, closeSideBar } from "./layout/sidebar.js";
import { smoothScroll, handleScroll } from "./layout/scroll.js";
import { addDetailsAnimation } from "./layout/details.js";
import { setFooterDate } from "./layout/date.js";
import {
  setClickableNewsContainer,
  displayLastSeenProduct,
} from "./layout/screens/home/home.js";
import { toggleAdminMode } from "./layout/screens/home/admin.js";
import { handleSlideshow, displaySlideshow } from "./layout/slideshow.js";
import { addMileageSliderListener } from "./layout/screens/products/slider.js";
import {
  filterProducts,
  resetFilters,
  sortAscending,
  sortDescending,
  calculateAveragePrice,
} from "./layout/screens/products/filter.js";
import { handleTheme } from "./layout/theme.js";
import { handleSidebar, handleSidebarSubMenus } from "./layout/menu.js";
import { handleProductDescriptionAccordion } from "./layout/screens/product/accordion.js";
import { showCookieDisclaimer } from "./layout/disclaimer.js";
import { deleteCookie, deleteAllCookies } from "./cookies.js";

// ==================
// Frontend
// ==================

// Navbar
addNavbarAltColor();

// Sidebar
showSideBar();
closeSideBar();

// Scroll
smoothScroll();
handleScroll();

// Details
addDetailsAnimation();

// Date
setFooterDate();

// Screens

// Home
setClickableNewsContainer();
displayLastSeenProduct();

// Home Admin
toggleAdminMode();
// Slideshow
handleSlideshow();
displaySlideshow();

// Products
addMileageSliderListener();
filterProducts();
resetFilters();
sortAscending();
sortDescending();
calculateAveragePrice();

// Theme
handleTheme();

// Menu
handleSidebar();
handleSidebarSubMenus();

// Product
handleProductDescriptionAccordion();

// Disclaimer
// deleteCookie("cookies-accepted");
// deleteAllCookies();
showCookieDisclaimer();
