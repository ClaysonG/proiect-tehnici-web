const filterBtn = document.querySelector("#search-btn");
const resetFiltersBtn = document.querySelector("#reset-btn");
const sortAscBtn = document.querySelector("#asc-btn");
const sortDescBtn = document.querySelector("#desc-btn");
const calcAvgPriceBtn = document.querySelector("#calc-btn");

function filterProducts() {
  if (!filterBtn) {
    return;
  }
  filterBtn.addEventListener("click", (e) => {
    const noResults = document.querySelector(".no-results");
    noResults.style.display = "none";
    // Validate data
    const makeSelect = document.querySelector("#make-choice");
    const makeChoice =
      makeSelect.options[makeSelect.selectedIndex].value.toLowerCase();
    const modelSelect = document.querySelector("#model-choice");
    const modelChoice =
      modelSelect.options[modelSelect.selectedIndex].value.toLowerCase();
    const priceMultiSelect = document.querySelector("#price-choice");
    const priceChoice = [];
    for (let option of priceMultiSelect.options) {
      if (option.selected) {
        priceChoice.push(option.value);
      }
    }
    const mileageRange = document.querySelector("#mileage-choice");
    const mileageMin = mileageRange.min;
    const mileageChoice = mileageRange.value;
    const fuelTypeList = document.querySelector("#fuel-type-choice");
    const fuelTypeChoice = fuelTypeList.value.toLowerCase();
    const bodyTypeRadios = document.querySelectorAll(".body-type-radio");
    let bodyTypeChoice;
    for (let radio of bodyTypeRadios) {
      if (radio.checked) {
        bodyTypeChoice = radio.value.toLowerCase();
        break;
      }
    }
    const nameText = document.querySelector("#name-choice");
    nameText.style.borderColor = "hsl(210deg, 31%, 80%)";
    const nameChoice = nameText.value.toLowerCase();
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    if (numbers.some((number) => nameChoice.includes(number))) {
      nameText.style.borderColor = "#bb2525";
      alert("Numele nu poate contine cifre");
      return;
    }
    const descArea = document.querySelector("#description-choice");
    descArea.style.borderColor = "hsl(210deg, 31%, 80%)";
    const descChoice = descArea.value.toLowerCase();
    if (descChoice) {
      const words = descChoice.split(" ");
      let error = false;
      for (let word of words) {
        if (word[0] !== "+" && word[0] !== "-") {
          error = true;
          break;
        }
      }
      if (error) {
        descArea.style.borderColor = "#bb2525";
        alert("Formatul descrierii este invalid");
        return;
      }
    }
    const secondHandCheck = document.querySelector("#second-hand-choice");
    const secondHandChoice = secondHandCheck.checked;
    const products = document.querySelectorAll(".product-card");
    let removedItems = 0;
    products.forEach((product) => {
      let makeCondition = true;
      let modelCondition = true;
      let fuelTypeCondition = true;
      let nameCondition = true;
      let mileageCondition = true;
      let bodyTypeCondition = true;
      let priceCondition = true;
      let descriptionCondition = true;
      let secondHandCondition = true;
      product.style.display = "none";
      const productMake = product.dataset.productMake.toLowerCase();
      const productModel = product.dataset.productModel.toLowerCase();
      const productFuelType = product.dataset.productFuelType.toLowerCase();
      const productName = product.dataset.productName.toLowerCase();
      const productMileage = product.dataset.productMileage;
      const productBodyType = product.dataset.productBodyType.toLowerCase();
      const productPrice = product.dataset.productPrice;
      const productDescription =
        product.dataset.productDescription.toLowerCase();
      const isProductSecondHand = product.dataset.productSecondHand;
      if (makeChoice !== "any" && makeChoice !== productMake) {
        makeCondition = false;
      }
      if (modelChoice !== "any" && modelChoice !== productModel) {
        modelCondition = false;
      }
      if (fuelTypeChoice && fuelTypeChoice !== productFuelType) {
        fuelTypeCondition = false;
      }
      if (nameChoice && !productName.includes(nameChoice)) {
        nameCondition = false;
      }
      if (
        Number(productMileage) < Number(mileageMin) ||
        Number(productMileage) > Number(mileageChoice)
      ) {
        mileageCondition = false;
      }
      if (bodyTypeChoice !== "any" && bodyTypeChoice !== productBodyType) {
        bodyTypeCondition = false;
      }
      if (priceChoice.length > 0) {
        let isInAnyRange = false;
        for (let priceRange of priceChoice) {
          const values = priceRange.split("-");
          const minPrice = Number(values[0]);
          const maxPrice = Number(values[1]);
          if (
            Number(productPrice) >= minPrice &&
            Number(productPrice) <= maxPrice
          ) {
            isInAnyRange = true;
            break;
          }
        }
        if (!isInAnyRange) {
          priceCondition = false;
        }
      }
      if (descChoice) {
        const choiceWords = descChoice.split(" ");
        for (let word of choiceWords) {
          let include = true;
          if (word[0] === "-") {
            include = false;
          }
          word = word.slice(1);
          if (
            (productDescription.includes(word) && !include) ||
            (!productDescription.includes(word) && include)
          ) {
            descriptionCondition = false;
            break;
          }
        }
      }
      // secondHandChoice === true --> new car
      if (secondHandChoice && isProductSecondHand === "true") {
        secondHandCondition = false;
      }
      if (
        makeCondition &&
        modelCondition &&
        fuelTypeCondition &&
        nameCondition &&
        mileageCondition &&
        bodyTypeCondition &&
        priceCondition &&
        descriptionCondition &&
        secondHandCondition
      ) {
        product.style.display = "block";
      } else {
        removedItems++;
      }
    });
    if (removedItems === products.length) {
      noResults.style.display = "block";
    }
  });
}

function resetFilters() {
  if (!resetFiltersBtn) {
    return;
  }
  resetFiltersBtn.addEventListener("click", (e) => {
    const makeSelect = document.querySelector("#make-choice");
    makeSelect.selectedIndex = 0;
    const modelSelect = document.querySelector("#model-choice");
    modelSelect.selectedIndex = 0;
    const priceMultiSelect = document.querySelector("#price-choice");
    for (let option of priceMultiSelect.options) {
      if (option.selected) {
        option.selected = false;
      }
    }
    const mileageRange = document.querySelector("#mileage-choice");
    mileageRange.value = mileageRange.max / 2;
    const mileageValue = document.querySelector("#selected-mileage-value");
    const selectedMileage = mileageRange.value.replace(
      /(\d)(?=(\d\d\d)+(?!\d))/g,
      "$1."
    );
    mileageValue.innerHTML = "(" + selectedMileage + " KM)";
    const fuelTypeList = document.querySelector("#fuel-type-choice");
    fuelTypeList.value = null;
    const bodyTypeRadios = document.querySelectorAll(".body-type-radio");
    for (let radio of bodyTypeRadios) {
      if (radio.checked) {
        radio.checked = false;
        break;
      }
    }
    const firstRadio = document.querySelector("#body-type-0");
    firstRadio.checked = true;
    const nameText = document.querySelector("#name-choice");
    nameText.value = null;
    const descArea = document.querySelector("#description-choice");
    descArea.value = null;
    const secondHandCheck = document.querySelector("#second-hand-choice");
    secondHandCheck.checked = false;
  });
}

function sortAscending() {
  if (!sortAscBtn) {
    return;
  }
  sortAscBtn.addEventListener("click", (e) => {
    const products = document.querySelectorAll(".product-card");
    const productArray = Array.from(products);
    productArray.sort((a, b) => {
      const priceA = parseFloat(a.dataset.productPrice);
      const priceB = parseFloat(b.dataset.productPrice);
      const mileageA = parseFloat(a.dataset.productMileage);
      const mileageB = parseFloat(b.dataset.productMileage);

      if (priceA > priceB) {
        return 1;
      }

      if (priceA < priceB) {
        return -1;
      }

      if (mileageA > mileageB) {
        return 1;
      }

      if (mileageA < mileageB) {
        return -1;
      }

      return 0;
    });
    for (let product of productArray) {
      product.parentNode.appendChild(product);
    }
  });
}

function sortDescending() {
  if (!sortDescBtn) {
    return;
  }
  sortDescBtn.addEventListener("click", (e) => {
    const products = document.querySelectorAll(".product-card");
    const productArray = Array.from(products);
    productArray.sort((a, b) => {
      const priceA = parseFloat(a.dataset.productPrice);
      const priceB = parseFloat(b.dataset.productPrice);
      const mileageA = parseFloat(a.dataset.productMileage);
      const mileageB = parseFloat(b.dataset.productMileage);

      if (priceA > priceB) {
        return -1;
      }

      if (priceA < priceB) {
        return 1;
      }

      if (mileageA > mileageB) {
        return -1;
      }

      if (mileageA < mileageB) {
        return 1;
      }

      return 0;
    });
    for (let product of productArray) {
      product.parentNode.appendChild(product);
    }
  });
}

function calculateAveragePrice() {
  if (!calcAvgPriceBtn) {
    return;
  }
  calcAvgPriceBtn.addEventListener("click", (e) => {
    const products = document.querySelectorAll(".product-card");
    let sum = 0;
    let displayedProducts = 0;
    for (let product of products) {
      if (product.style.display !== "none") {
        sum += parseFloat(product.dataset.productPrice);
        displayedProducts++;
      }
    }
    const averagePrice = Math.floor(sum / displayedProducts) + "";
    const result = document.createElement("div");
    result.style.position = "fixed";
    result.style.background = "#fff";
    result.style.color = "hsl(209, 61%, 16%)";
    result.style.bottom = 0;
    result.style.width = "100%";
    result.style.textAlign = "center";
    result.style.fontSize = "1.5rem";
    result.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
    result.style.transition = "all 0.3s linear";
    result.innerHTML = `Pret Mediu: ${averagePrice.replace(
      /(\d)(?=(\d\d\d)+(?!\d))/g,
      "$1."
    )} €`;
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
    document.body.appendChild(result);
    const backToTopBtn = document.querySelector("#backToTopBtn");
    backToTopBtn.style.bottom = "3rem";
    setTimeout(() => {
      result.animate(translateDownAnimation, timing);
      backToTopBtn.style.bottom = "1rem";
    }, 2000);
    setTimeout(() => {
      result.remove();
    }, 2300);
  });
}

export {
  filterProducts,
  resetFilters,
  sortAscending,
  sortDescending,
  calculateAveragePrice,
};
