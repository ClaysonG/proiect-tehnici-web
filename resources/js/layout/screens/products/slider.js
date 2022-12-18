const mileageSlider = document.querySelector("#mileage-choice");
const mileageValue = document.querySelector("#selected-mileage-value");

function addMileageSliderListener() {
  if (mileageSlider) {
    mileageSlider.oninput = function () {
      const selectedMileage = mileageSlider.value.replace(
        /(\d)(?=(\d\d\d)+(?!\d))/g,
        "$1."
      );
      mileageValue.innerHTML = "(" + selectedMileage + " KM)";
    };
  }
}

export { addMileageSliderListener };
