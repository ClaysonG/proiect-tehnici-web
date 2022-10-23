import { addNavbarAltColor } from "./layout/navbar.js";
import { showSideBar, closeSideBar } from "./layout/sidebar.js";
import { smoothScroll, handleScrollToTopBtn } from "./layout/scroll.js";
import { addDetailsAnimation } from "./layout/details.js";
import { setFooterDate } from "./layout/date.js";
import { setClickableNewsContainer } from "./layout/screens/home.js";

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
