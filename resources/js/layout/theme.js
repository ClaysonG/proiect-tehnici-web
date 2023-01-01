const themePicker = document.querySelector("#theme-picker");
const sunIcon = document.querySelector(".sun-icon");
const moonIcon = document.querySelector(".moon-icon");

function handleTheme() {
  const currentTheme = localStorage.getItem("theme");
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
      sunIcon.style.color = "hsl(42, 78%, 60%)";
      moonIcon.style.color = "hsl(209, 28%, 39%)";
    } else {
      document.body.classList.add("dark-theme");
      document.body.setAttribute("data-bs-theme", "dark");
      localStorage.setItem("theme", "dark-theme");
      sunIcon.style.color = "hsl(209, 28%, 39%)";
      moonIcon.style.color = "hsl(43, 72%, 37%)";
    }
  });
}

export { handleTheme };
