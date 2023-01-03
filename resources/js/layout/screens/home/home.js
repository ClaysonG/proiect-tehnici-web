import { getCookie } from "../../../cookies.js";

const showcaseImgContainers = document.querySelectorAll(".news-img-container");
const articleImgContainers = document.querySelectorAll(
  ".article-img-container"
);

// expand details on img click
function setClickableNewsContainer() {
  showcaseImgContainers.forEach((container) => {
    container.addEventListener("click", (e) => {
      const details = container.nextElementSibling;
      const summary = details.children[0].id;
      document.getElementById(summary).click();
    });
  });

  articleImgContainers.forEach((container) => {
    container.addEventListener("click", (e) => {
      const details = container.nextElementSibling;
      const summary = details.children[0].id;
      document.getElementById(summary).click();
    });
  });
}

function displayLastSeenProduct() {
  // display only on home page
  const searchContainer = document.querySelector(".search");
  if (searchContainer) {
    const lastProductCookie = getCookie("last-seen-product");
    if (lastProductCookie !== "") {
      const result = document.createElement("div");
      result.style.position = "fixed";
      if (localStorage.getItem("theme")) {
        result.style.background = "hsl(209, 61%, 16%)";
        result.style.color = "#fff";
      } else {
        result.style.background = "#fff";
        result.style.color = "hsl(209, 61%, 16%)";
      }
      result.style.bottom = 0;
      result.style.width = "100%";
      result.style.textAlign = "center";
      result.style.fontSize = "1.5rem";
      result.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
      result.style.transition = "all 0.3s linear";
      const translateUpAnimation = [
        { transform: "translateY(10rem)" },
        { transform: "translateY(0)" },
      ];
      const translateDownAnimation = [
        { transform: "translateY(0)" },
        { transform: "translateY(10rem)" },
      ];
      const timing = {
        duration: 300,
        iterations: 1,
      };
      result.animate(translateUpAnimation, timing);
      const productLink = document.createElement("a");
      productLink.href = `/product/${lastProductCookie}`;
      if (localStorage.getItem("theme")) {
        productLink.classList.add("dynamic-link");
      } else {
        productLink.classList.add("dynamic-link");
      }
      productLink.innerHTML = "Ultimul produs accesat";
      result.appendChild(productLink);
      document.body.appendChild(result);
      const backToTopBtn = document.querySelector("#backToTopBtn");
      backToTopBtn.style.bottom = "3rem";
      setTimeout(() => {
        result.animate(translateDownAnimation, timing);
        backToTopBtn.style.bottom = "1rem";
      }, 8000);
      setTimeout(() => {
        result.remove();
      }, 8300);
    }
  }
}

export { setClickableNewsContainer, displayLastSeenProduct };
