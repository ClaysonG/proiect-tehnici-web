import { setCookie, getCookie } from "../cookies.js";

function showCookieDisclaimer() {
  const acceptedCookies = getCookie("cookies-accepted");
  if (acceptedCookies === "") {
    const disclaimer = document.createElement("div");
    disclaimer.id = "cookie-disclaimer";
    disclaimer.innerHTML = "Acest site este un proiect scolar.";
    disclaimer.style.position = "fixed";
    disclaimer.style.bottom = "1rem";
    disclaimer.style.left = "50%";
    disclaimer.style.width = "50vw";
    disclaimer.style.height = "10vw";
    disclaimer.style.transform = "translate(-50%, 150%)";
    disclaimer.style.borderRadius = "0.5rem";
    disclaimer.style.fontSize = "1.5vw";
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
    const translateAnimation = [
      {
        opacity: 0,
        background: localStorage.getItem("theme")
          ? "hsl(209, 61%, 32%)"
          : "hsl(45, 100%, 96%)",
      },
      {
        transform: "translate(-50%, 0)",
        opacity: 1,
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
    const largeScreen = window.matchMedia("(min-width: 992px)");
    if (largeScreen.matches) {
      disclaimer.style.height = "7.5vw";
      disclaimer.animate(translateAnimation, timing);
    } else {
      disclaimer.style.width = "75vw";
      disclaimer.style.transform = "translate(-50%, 0)";
    }
    const cookieText = document.createElement("div");
    cookieText.innerHTML = "Acceptati cookie-uri?";
    cookieText.style.fontSize = "1.5vw";
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
    cookieBtn.style.fontSize = "1.5vw";
    cookieBtn.style.position = "absolute";
    cookieBtn.style.right = "1rem";
    cookieBtn.style.bottom = "calc(5vw / 2)";
    cookieBtn.style.padding = "0.25rem 1rem";
    disclaimer.appendChild(cookieBtn);
    document.body.appendChild(disclaimer);

    cookieBtn.addEventListener("click", (e) => {
      setCookie("cookies-accepted", true, 7);
      disclaimer.remove();
    });
  }
}

export { showCookieDisclaimer };
