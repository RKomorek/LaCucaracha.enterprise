document.addEventListener("DOMContentLoaded", () => {
  const banners = document.querySelectorAll(".carousel-item");
  const nextButton = document.querySelector(".carousel-control.right");
  const prevButton = document.querySelector(".carousel-control.left");
  let currentIndex = 0;
  const totalItems = banners.length;
  let carouselInterval;

  banners.forEach((banner) => {
    banner.addEventListener("click", () => {
      window.open("cardapio.html", "_blank");
    });
  });

  const showNextItem = () => {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
  };

  const showPrevItem = () => {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
  };

  const updateCarousel = () => {
    document.querySelector(".carousel-inner").style.transform = `translateX(-${currentIndex * 100}%)`;
  };


  const nextItem = () => {
    clearInterval(carouselInterval);
    showNextItem();
    carouselInterval = setInterval(showNextItem, 3000);
  };

  const prevItem = () => {
    clearInterval(carouselInterval);
    showPrevItem();
    carouselInterval = setInterval(showNextItem, 3000);
  };

  nextButton.addEventListener("click", (event) => {
    event.stopPropagation();
    nextItem();
  });

  prevButton.addEventListener("click", (event) => {
    event.stopPropagation();
    prevItem();
  });

  updateCarousel();
  carouselInterval = setInterval(showNextItem, 3000);
});

document.addEventListener("DOMContentLoaded", () => {
  const quantityContainers = document.querySelectorAll(".quantity-container");
  const orderModal = document.getElementById("orderModal");
  const orderSummary = document.getElementById("orderSummary");
  const orderTotal = document.getElementById("orderTotal");
  const closeModal = document.querySelector(".close");
  const confirmOrderButton = document.getElementById("confirmOrder");
  let cart = {};

  quantityContainers.forEach((container) => {
    const decrementButton = container.querySelector(".decrement");
    const incrementButton = container.querySelector(".increment");
    const quantityDisplay = container.querySelector(".quantity");
    const orderButton = container.nextElementSibling.querySelector("button");
    const productName = container.parentElement.querySelector("h2").textContent.trim();
    cart[productName] = 0;

    decrementButton.addEventListener("click", () => {
      let currentQuantity = parseInt(quantityDisplay.textContent);
      if (currentQuantity > 0) {
        quantityDisplay.textContent = currentQuantity - 1;
        cart[productName] -= 1;
      }
    });

    incrementButton.addEventListener("click", () => {
      let currentQuantity = parseInt(quantityDisplay.textContent);
      quantityDisplay.textContent = currentQuantity + 1;
      cart[productName] += 1;
    });

    orderButton.addEventListener("click", () => {
      displayOrderModal();
    });
  });

  const displayOrderModal = () => {
    const itemsInCart = Object.entries(cart).filter(([name, quantity]) => quantity > 0);
    if (itemsInCart.length > 0) {
      let orderDetails = "";
      let orderValue = 0;
      const itemPrice = 25;

      itemsInCart.forEach(([name, quantity]) => {
        orderDetails += `${name}: ${quantity} unidade(s) - R$ ${itemPrice * quantity}`;
        orderValue += itemPrice * quantity;
      });

      let shippingCost = orderValue > 80 ? 0 : 15;
      let totalValue = orderValue + shippingCost;

      orderSummary.textContent = `Resumo do Pedido:\n${orderDetails}`;
      orderTotal.textContent = `Valor do Pedido: R$ ${orderValue}. Frete: R$ ${shippingCost}. Total: R$ ${totalValue}.`;
      orderModal.style.display = "block";
    } else {
      alert("Por favor, selecione uma quantidade maior que zero.");
    }
  };

  closeModal.addEventListener("click", () => {
    orderModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target == orderModal) {
      orderModal.style.display = "none";
    }
  });

  confirmOrderButton.addEventListener("click", () => {
    const orderDetails = orderSummary.textContent.replace("Resumo do Pedido:\n", "").trim();
    const orderTotalValue = orderTotal.textContent.split("Total: R$ ")[1].trim();
    const deliveryEstimate = 30;

    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
    localStorage.setItem("orderTotal", orderTotalValue);
    localStorage.setItem("deliveryEstimate", deliveryEstimate);

    window.open("obrigado.html", "_blank")
  });
});
