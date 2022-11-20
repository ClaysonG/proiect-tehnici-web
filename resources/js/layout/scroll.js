// smooth scroll
// select links
const scrollLinks = document.querySelectorAll(".scroll-link");
const backToTopBtn = document.getElementById("backToTopBtn");

function smoothScroll() {
  scrollLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // server
      const id = e.target.getAttribute("href").slice(1).substring(1);
      // local (html)
      // const id = e.target.getAttribute("href").slice(1);
      const element = document.getElementById(id);

      let position = element?.offsetTop - 80;

      window.scrollTo({
        left: 0,
        top: position,
        behavior: "smooth",
      });
    });
  });
}

function showScrollToTopBtn() {
  const sidebar = document.querySelector(".show-sidebar");
  if (
    (document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100) &&
    !sidebar
  ) {
    backToTopBtn.style.opacity = 1;
  } else {
    backToTopBtn.style.opacity = 0;
  }
}

function backToTop() {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
}

function handleScrollToTopBtn() {
  window.onscroll = function () {
    showScrollToTopBtn();
  };

  backToTopBtn.addEventListener("click", function () {
    backToTop();
  });
}

export { smoothScroll, handleScrollToTopBtn };
