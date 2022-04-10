// Inputs
const billInput = document.getElementById("bill");
const tipButtons = document.querySelectorAll(".button-tip");
const customTip = document.getElementById("custom-tip");
const personInput = document.getElementById("person-count");

// Outputs
const tipPerPerson = document.getElementById("tip-per-person");
const totalPerPerson = document.getElementById("total-per-person");
const resetButton = document.querySelector(".button-reset");

const formatAmount = (num) => `$${num.toFixed(2)}`;

function updateOutput() {
  setResetButtonStatus();

  let bill = parseFloat(billInput.value) || 0;
  let numPeople = parseInt(personInput.value) || 0;
  let tipPercent;

  if (customTip.value) {
    tipPercent = customTip.value * 0.01;
  } else {
    // set to 0 if no button is selected
    tipPercent =
      document.querySelector(".button-active")?.dataset.tipPercent * 0.01 || 0;
  }

  if (bill <= 0 || numPeople <= 0 || tipPercent < 0) {
    return resetOutput();
  }

  let totalAmount = formatAmount((bill + bill * tipPercent) / numPeople);
  let tipAmount = formatAmount((bill * tipPercent) / numPeople);
  totalPerPerson.textContent = totalAmount;
  tipPerPerson.textContent = tipAmount;
}

function handleTipButtonClick(e) {
  tipButtons.forEach((button) => button.classList.remove("button-active"));
  e.target.classList.add("button-active");
  customTip.value = "";

  updateOutput();
}

tipButtons.forEach((button) =>
  button.addEventListener("click", handleTipButtonClick)
);

function handleCustomTipChange(e) {
  tipButtons.forEach((button) => button.classList.remove("button-active"));
  updateOutput();
}

customTip.addEventListener("input", handleCustomTipChange);

function handlePersonChange() {
  const numPeople = parseInt(personInput.value);
  const errorMsg = document.getElementById("person-error");

  if (numPeople === 0) {
    errorMsg.classList.remove("hidden");
    personInput.classList.add("error");
    resetOutput();
    return;
  }

  errorMsg.classList.add("hidden");
  personInput.classList.remove("error");
  updateOutput();
}

billInput.addEventListener("input", updateOutput);
personInput.addEventListener("input", handlePersonChange);

function setResetButtonStatus() {
  if (
    billInput.value ||
    document.querySelector(".button-active") ||
    customTip.value ||
    personInput.value
  ) {
    return (resetButton.disabled = false);
  }

  resetButton.disabled = true;
}

function resetOutput() {
  tipPerPerson.textContent = formatAmount(0);
  totalPerPerson.textContent = formatAmount(0);
}

function handleReset() {
  tipButtons.forEach((button) => button.classList.remove("button-active"));

  billInput.value = "";
  customTip.value = "";
  personInput.value = "";

  setResetButtonStatus();
  resetOutput();
}

resetButton.addEventListener("click", handleReset);
