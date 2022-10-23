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

export { setClickableNewsContainer };
