const themePickers = document.querySelectorAll(".theme-picker");
const sunIcons = document.querySelectorAll(".sun-icon");
const moonIcons = document.querySelectorAll(".moon-icon");

function handleTheme() {
  const currentTheme = localStorage.getItem("theme");
  themePickers.forEach((themePicker, index) => {
    const sunIcon = sunIcons[index];
    const moonIcon = moonIcons[index];
    if (currentTheme) {
      document.body.classList.add(currentTheme);
      document.body.setAttribute("data-bs-theme", "dark");
      themePicker.checked = true;
      if (sunIcon) {
        sunIcon.style.color = "hsl(209, 28%, 39%)";
      }
      if (moonIcon) {
        moonIcon.style.color = "hsl(43, 72%, 37%)";
      }
    } else {
      sunIcon.style.color = "hsl(42, 78%, 60%)";
    }

    if (!themePicker) {
      return;
    }

    themePicker.addEventListener("click", (e) => {
      if (document.body.classList.contains("dark-theme")) {
        document.body.classList.remove("dark-theme");
        document.body.removeAttribute("data-bs-theme");
        localStorage.removeItem("theme");
        sunIcons.forEach((sunIcon) => {
          sunIcon.style.color = "hsl(42, 78%, 60%)";
        });
        moonIcons.forEach((moonIcon) => {
          moonIcon.style.color = "hsl(209, 28%, 39%)";
        });
        themePickers.forEach((themePicker) => {
          themePicker.checked = false;
        });
      } else {
        document.body.classList.add("dark-theme");
        document.body.setAttribute("data-bs-theme", "dark");
        localStorage.setItem("theme", "dark-theme");
        sunIcons.forEach((sunIcon) => {
          sunIcon.style.color = "hsl(209, 28%, 39%)";
        });
        moonIcons.forEach((moonIcon) => {
          moonIcon.style.color = "hsl(43, 72%, 37%)";
        });
        themePickers.forEach((themePicker) => {
          themePicker.checked = true;
        });
      }
    });
  });
}

export { handleTheme };
