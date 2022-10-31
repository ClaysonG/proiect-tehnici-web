const productsAdminCenter = document.querySelector(".products-admin-center");

const mediumScreen = window.matchMedia("(min-width: 676px)");
const bigScreen = window.matchMedia("(min-width: 1400px)");

function handleTopMakesAdmin() {
  const topMakesAdminCenter = document.querySelector(".top-makes-admin-center");

  if (topMakesAdminCenter) {
    const elementsToDelete =
      mediumScreen.matches && !bigScreen.matches
        ? 5
        : bigScreen.matches
        ? 2
        : 0;
    const table = topMakesAdminCenter.children[0];
    const tableChildren = table.children;
    for (let i = 0; i < tableChildren.length; i++) {
      const child = tableChildren[i];
      switch (child.nodeName) {
        case "THEAD": {
          const tableHeaders = child.children[0].children;
          for (
            let j = tableHeaders.length - 1;
            j >= tableHeaders.length - elementsToDelete;
            j--
          ) {
            tableHeaders[j].style.display = "none";
          }
          break;
        }
        case "TBODY": {
          const tableRowElements = child.children[0].children;
          for (
            let j = tableRowElements.length - 1;
            j >= tableRowElements.length - elementsToDelete;
            j--
          ) {
            tableRowElements[j].style.display = "none";
          }
          break;
        }
        case "TFOOT": {
          const tableFooterElement = child.children[0].children[0];
          tableFooterElement.colSpan =
            tableFooterElement.colSpan - elementsToDelete;
          break;
        }
      }
    }
  }
}

// function handleProductsAdmin() {
//   if (productsAdminCenter) {
//     const products = document.querySelectorAll(".product-card");
//     products.forEach((card, index) => {
//       if (index !== 0) {
//         card.style.display = "none";
//       }
//     });
//   }
// }

function toggleAdminMode() {
  const admin = window.localStorage.getItem("admin");
  const mainTag = document.querySelector("main");
  const productsCenter = document.querySelector(".products-center");
  const topMakesCenter = document.querySelector(".top-makes-center");

  if (!productsCenter || !topMakesCenter) {
    return;
  }

  if (admin) {
    window.localStorage.removeItem("admin");
    mainTag.classList.remove("admin-layout");
    productsCenter.classList.remove("products-admin-center");
    topMakesCenter.classList.remove("top-makes-admin-center");
    document.styleSheets[0].insertRule(
      ".admin { display: none }",
      document.styleSheets[0].cssRules.length
    );
  } else {
    window.localStorage.setItem("admin", true);
    mainTag.classList.add("admin-layout");
    productsCenter.classList.add("products-admin-center");
    topMakesCenter.classList.add("top-makes-admin-center");
    handleTopMakesAdmin();
    document.styleSheets[0].insertRule(
      ".admin { display: block }",
      document.styleSheets[0].cssRules.length
    );
  }
  // window.location.reload();
}

export { toggleAdminMode };
