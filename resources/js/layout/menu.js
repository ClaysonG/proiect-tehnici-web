const sidebar = document.querySelector("#sidebar");

function handleSidebar() {
  window.addEventListener("resize", (e) => {
    const mediumScreen = window.matchMedia("(min-width: 768px)");
    const sidebarOpen = sidebar.classList.contains("show-sidebar");
    if (mediumScreen.matches && sidebarOpen) {
      sidebar.classList.remove("show-sidebar");
    }
  });
}

export { handleSidebar };
