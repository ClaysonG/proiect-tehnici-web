import { setCookie, getCookie } from "../../../cookies.js";

const descAcc = document.querySelector("#descriptionAccordion");

function handleProductDescriptionAccordion() {
  if (descAcc) {
    const product = document.querySelector(".product-page");
    const productId = product.dataset.productId;
    const collapseDesc = document.querySelector("#collapseDescription");
    // const accCookie = getCookie(`product-${productId}-acc-open`);
    const accCookie = window.localStorage.getItem(
      `product-${productId}-acc-open`
    );
    if (accCookie === "true") {
      collapseDesc.classList.add("show");
      const descAccBtn = document.querySelector("#descAccBtn");
      descAccBtn.setAttribute("aria-expanded", "true");
      descAccBtn.classList.remove("collapsed");
    }

    descAcc.addEventListener("click", (e) => {
      const desc = document.querySelector("#collapseDescription");
      // run after bootstrap function
      setTimeout(() => {
        // setCookie(
        //   `product-${productId}-acc-open`,
        //   desc.classList.contains("show"),
        //   1
        // );
        window.localStorage.setItem(
          `product-${productId}-acc-open`,
          desc.classList.contains("show")
        );
      }, 500);
    });
  }
}

export { handleProductDescriptionAccordion };
