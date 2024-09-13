// Product class with an image URL
class Product {
  constructor(id, name, price, imageUrl, text) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.imageUrl = imageUrl; // Image URL property
    this.text = text;
  }

  // Method to display product details in the DOM
  displayProduct() {
    // Get the container where the product will be displayed
    const container = document.getElementById
    ("product-container");

    const box = document.getElementById("total-price");

    // Create a div to hold the product
    const productDiv = document.createElement("div");
    productDiv.className = "productdiv"; // Correct way to set the class name

    // Create an image element
    const productImage = document.createElement("img");
    productImage.className = "image"; // Correct way to set the class name
    productImage.src = this.imageUrl; // Set the image source to the product's image URL
    productImage.alt = this.name; // Set the alt text for the image

    // Create a div for add (+), minus (-) buttons
    const buttonDiv = document.createElement("div");
    buttonDiv.className = "buttondiv"; // Correct way to set the class name
    const addBtn = document.createElement("i");
    addBtn.className = "fas fa-plus-circle"; // Correct way to set the class name
    addBtn.id = "addBtn";
    const span = document.createElement("span");
    span.className = "quantity"; // Correct way to set the class name
    span.textContent = 0;
    const minusBtn = document.createElement("i");
    minusBtn.className = "fas fa-minus-circle"; // Correct way to set the class name
    minusBtn.id = "minusBtn";

    // Add event listeners for buttons
    addBtn.addEventListener("click", () => {
      let quantity = parseInt(span.textContent);
      span.textContent = quantity + 1; // Increment quantity on click
      updateTotalPrice(); // Update the total price when quantity changes
    });

    minusBtn.addEventListener("click", () => {
      let quantity = parseInt(span.textContent);
      if (quantity > 0) {
        span.textContent = quantity - 1; // Decrement quantity on click, but not below 0
        updateTotalPrice(); // Update the total price when quantity changes
      }
    });

    // Create a div for delete and love button
    const deleteLoveDiv = document.createElement("div");
    deleteLoveDiv.className = "deleteLovediv"; // Correct way to set the class name
    const icon = document.createElement("i");
    icon.className = "fas fa-trash-alt"; // Correct way to set the class name
    const heartBtn = document.createElement("i");
    heartBtn.className = "fas fa-heart"; // Correct way to set the class name

    heartBtn.addEventListener("click", () => {
      heartBtn.classList.toggle("loved"); // Toggles the 'liked' class on click
    });

     // Add event listener to trash icon to delete product
     icon.addEventListener("click", () => {
      productDiv.remove(); // Remove the product div from the DOM
    });


    // Create a title for the product
    const productName = document.createElement('h2');
    productName.textContent = this.name;

    // Create a price element
    const productPrice = document.createElement('p');
    productPrice.className = "unitPrice"; // Correct way to set the class name
    productPrice.textContent = `Price: $${this.price}`;

    // Create a product description element
    const productDesc = document.createElement('p');
    productDesc.textContent = this.text;

    // Append the delete and love buttons to the deleteLovediv
    deleteLoveDiv.appendChild(icon);
    deleteLoveDiv.appendChild(heartBtn);

    // Append the add button, minus button, and span to the buttonDiv
    buttonDiv.appendChild(addBtn);
    buttonDiv.appendChild(span);
    buttonDiv.appendChild(minusBtn);
    buttonDiv.appendChild(deleteLoveDiv);

    // Append the image, name, and price to the productDiv
    productDiv.appendChild(productImage);
    productDiv.appendChild(productName);
    productDiv.appendChild(productDesc);
    productDiv.appendChild(productPrice);
    productDiv.appendChild(buttonDiv);

    // Append the productDiv to the container
    container.appendChild(productDiv);

    // Append the totalDiv to the container
    // This should be done once, not with every product
    if (!document.querySelector(".tot")) {
      const totalDiv = document.createElement("div");
      totalDiv.className = "tot"; // Correct way to set the class name
      totalDiv.textContent = "Total Price: ";

      const span1 = document.createElement("span");
      span1.className = "tot"; // Correct way to set the class name
      span1.textContent = "$0"; // Initialize with $0 or actual total

      totalDiv.appendChild(span1);
      box.appendChild(totalDiv);
    }
  }
}

// Function to update the total price
const updateTotalPrice = () => {
  let totalPrice = 0;
  document.querySelectorAll(".productdiv").forEach((productDiv) => {
    const quantityElement = productDiv.querySelector(".quantity");
    const unitPriceElement = productDiv.querySelector(".unitPrice");
    const quantity = parseInt(quantityElement.textContent);
    const unitPrice = parseFloat(unitPriceElement.textContent.replace('Price: $', ''));
    totalPrice += quantity * unitPrice;
  });
  const totalSpan = document.querySelector(".tot span");
  if (totalSpan) {
    totalSpan.textContent = `$${totalPrice.toFixed(2)}`; // Update the total price
  }
};

// Creating new product instances
const bag = new Product(1, "Bag", 300, "bag.png", "This is a bag");
const socks = new Product(2, "Socks", 100, 'socks.png', "These are socks");
const baskets = new Product(3, "Baskets", 500, 'baskets.png', "This is a basket");

// Calling the method to display the product
bag.displayProduct();
socks.displayProduct();
baskets.displayProduct();
