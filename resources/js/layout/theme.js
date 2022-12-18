const themePicker = document.querySelector("#theme-picker");

function handleTheme() {
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme) {
    document.body.classList.add(currentTheme);
  }

  if (!themePicker) {
    return;
  }

  themePicker.addEventListener("click", (e) => {
    if (document.body.classList.contains("dark-theme")) {
      document.body.classList.remove("dark-theme");
      localStorage.removeItem("theme");
    } else {
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark-theme");
    }
  });
}

export { handleTheme };
