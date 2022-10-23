const date = document.querySelector("#date");

// set year
function setFooterDate() {
  date.innerHTML = new Date().getFullYear();
}

export { setFooterDate };
