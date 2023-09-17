"use strict";

// Add date through calendar
document.addEventListener("DOMContentLoaded", function () {
  const currentDateElement = document.querySelector(".date-calender span");
  const dueDateInput = document.querySelector(
    '.date-calender input[type="date"]'
  );

  dueDateInput.addEventListener("input", function () {
    const selectedDate = this.value;
    const [year, month, day] = selectedDate.split("-");
    const formattedDate = `${day}/${month}/${year}`;
    currentDateElement.textContent = `${formattedDate}`;
  });
});

// Add and delete item
document.addEventListener("DOMContentLoaded", function () {
  const addItemButton = document.querySelector(".btn-add-item");
  const itemsContainer = document.querySelector(".items-container");

  addItemButton.addEventListener("click", function () {
    const newItem = document.createElement("div");
    newItem.classList.add("container-item");

    newItem.innerHTML = `
      <div class="item-name-description">
        <input type="text" placeholder="Item name">
        <input type="text" placeholder="Item description">
      </div>
      <div class="item-qty">
        <input type="number">
      </div>
      <div class="item-price">
        <span>$</span>
        <input type="number">
      </div>
      <div class="item-action">
        <button type="button" class="btn-delete"><i class="fa-regular fa-trash-can"></i></button>
      </div>
    `;

    itemsContainer.appendChild(newItem);
  });

  document.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("btn-delete")) {
      e.target.closest(".container-item").remove();
    }
  });
});

// Calculations for items
// Update calculations whenever item price changes
const itemPrices = document.querySelectorAll(".item-price input");
const itemQtyInputs = document.querySelectorAll(".item-qty input");
const totalAmountElement = document.querySelector("#total-amount");

itemPrices.forEach((input, index) => {
  input.addEventListener("input", updateCalculations);
});

itemQtyInputs.forEach((input, index) => {
  input.addEventListener("input", updateCalculations);
});

function updateCalculations() {
  const itemPrices = document.querySelectorAll(".item-price input");
  const itemQtyInputs = document.querySelectorAll(".item-qty input");

  let subtotal = 0;

  itemPrices.forEach((input, index) => {
    const qtyInput = itemQtyInputs[index];
    const qty = parseInt(qtyInput.value || 0);
    const price = parseFloat(input.value || 0);

    subtotal += qty * price;
  });

  const discount = 0; // Add discount calculation logic here if needed
  const tax = 0; // Add tax calculation logic here if needed

  const total = subtotal - discount + tax;

  // Update the DOM element
  totalAmountElement.textContent = `$${total.toFixed(2)}`;
}

// Discount and Tax Calculation
// Tax input element
const taxInputElement = document.querySelector(".rate-calc .tax input");
const discountInputElement = document.querySelector(
  ".rate-calc .discount input"
);

// Calculations for items
// Update calculations whenever item price changes
function updateCalculations() {
  const itemPrices = document.querySelectorAll(".item-price input");
  const itemQtyInputs = document.querySelectorAll(".item-qty input");

  let subtotal = 0;

  itemPrices.forEach((input, index) => {
    const qtyInput = itemQtyInputs[index];
    const qty = parseInt(qtyInput.value || 0);
    const price = parseFloat(input.value || 0);

    subtotal += qty * price;
  });

  // Calculate the tax and discount amounts
  const taxRate = parseFloat(taxInputElement.value) || 0;
  const discountRate = parseFloat(discountInputElement.value) || 0;

  const tax = (subtotal * taxRate) / 100;
  const discount = (subtotal * discountRate) / 100;

  // Calculate the new total amount
  const total = subtotal - discount + tax;

  // Update the DOM element
  totalAmountElement.textContent = `$${total.toFixed(2)}`;
  document.querySelector(".subtotal span").textContent = `$${subtotal.toFixed(
    2
  )}`;
  document.querySelector(".discount span").textContent = `(${(
    discountRate * 100
  ).toFixed(0)}%)$${discount.toFixed(2)}`;
  document.querySelector(".tax span").textContent = `(${(taxRate * 100).toFixed(
    0
  )}%)$${tax.toFixed(2)}`;
  document.querySelector("#total-amount").textContent = `$${total.toFixed(2)}`;
}

// Add event listeners to the discount and tax input fields
taxInputElement.addEventListener("input", updateCalculations);
discountInputElement.addEventListener("input", updateCalculations);
