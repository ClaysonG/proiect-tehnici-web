import { setCookie, getCookie } from "../cookies.js";

function showCookieDisclaimer() {
  const acceptedCookies = getCookie("cookies-accepted");
  if (acceptedCookies === "") {
    const disclaimer = document.createElement("div");
    disclaimer.id = "cookie-disclaimer";
    disclaimer.innerHTML = "Acest site este un proiect scolar.";
    disclaimer.style.position = "fixed";
    disclaimer.style.bottom = 0;
    disclaimer.style.left = 0;
    disclaimer.style.width = "25vw";
    disclaimer.style.height = "25vw";
    disclaimer.style.fontSize = "2vw";
    disclaimer.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.2)";
    disclaimer.style.padding = "0.5rem 1rem";
    disclaimer.style.margin = "0 auto";
    if (localStorage.getItem("theme")) {
      disclaimer.style.background = "hsl(209, 61%, 16%)";
      disclaimer.style.color = "#fff";
    } else {
      disclaimer.style.background = "#fff";
      disclaimer.style.color = "hsl(209, 61%, 16%)";
    }
    const scaleAnimation = [
      {
        transform: "scale(0)",
        opacity: 0,
        background: localStorage.getItem("theme")
          ? "hsl(209, 61%, 32%)"
          : "hsl(45, 100%, 96%)",
      },
      {
        transform: "scale(1)",
        opacity: 0.75,
        background: localStorage.getItem("theme")
          ? "hsl(209, 61%, 16%)"
          : "#fff",
      },
    ];
    const timing = {
      duration: 5000,
      iterations: 1,
      fill: "forwards",
    };
    disclaimer.style.transformOrigin = "bottom left";
    const largeScreen = window.matchMedia("(min-width: 992px)");
    if (largeScreen.matches) {
      disclaimer.animate(scaleAnimation, timing);
    }
    const cookieText = document.createElement("div");
    cookieText.innerHTML = "Acceptati cookie-uri?";
    cookieText.style.fontSize = "2vw";
    cookieText.style.marginTop = "0.5rem";
    if (localStorage.getItem("theme")) {
      cookieText.style.color = "#fff";
    } else {
      cookieText.style.color = "hsl(209, 61%, 16%)";
    }
    disclaimer.appendChild(cookieText);
    const cookieBtn = document.createElement("button");
    cookieBtn.id = "cookiesAcceptBtn";
    cookieBtn.innerHTML = "Ok";
    cookieBtn.classList.add("button");
    cookieBtn.style.fontSize = "2vw";
    cookieBtn.style.marginTop = "0.5rem";
    disclaimer.appendChild(cookieBtn);
    document.body.appendChild(disclaimer);

    cookieBtn.addEventListener("click", (e) => {
      setCookie("cookies-accepted", true, 7);
      disclaimer.remove();
    });
  }
}

export { showCookieDisclaimer };
