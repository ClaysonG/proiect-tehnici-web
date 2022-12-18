import { addNavbarAltColor } from "./layout/navbar.js";
import { showSideBar, closeSideBar } from "./layout/sidebar.js";
import { smoothScroll, handleScrollToTopBtn } from "./layout/scroll.js";
import { addDetailsAnimation } from "./layout/details.js";
import { setFooterDate } from "./layout/date.js";
import { setClickableNewsContainer } from "./layout/screens/home/home.js";
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
handleScrollToTopBtn();

// Details
addDetailsAnimation();

// Date
setFooterDate();

// Screens

// Home
setClickableNewsContainer();

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
