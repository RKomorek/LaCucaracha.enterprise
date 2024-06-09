document.addEventListener("DOMContentLoaded", () => {
  // Funções para o Carousel
  const banners = document.querySelectorAll(".carousel-item");
  const nextButton = document.querySelector(".carousel-control.right");
  const prevButton = document.querySelector(".carousel-control.left");
  let currentIndex = 0;
  const totalItems = banners.length;
  let carouselInterval;

  // Abre o cardápio em uma nova aba ao clicar em um banner
  banners.forEach((banner) => {
    banner.addEventListener("click", () => {
      window.open("cardapio.html", "_blank");
    });
  });

  // Funções para navegação no carousel
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

  // Adiciona eventos aos botões de navegação do carousel
  nextButton.addEventListener("click", (event) => {
    event.stopPropagation();
    nextItem();
  });

  prevButton.addEventListener("click", (event) => {
    event.stopPropagation();
    prevItem();
  });

  // Inicia o carousel
  updateCarousel();
  carouselInterval = setInterval(showNextItem, 3000);
});

// Gerenciamento de Carrinho e Modal de Pedido
document.addEventListener("DOMContentLoaded", () => {
  const quantityContainers = document.querySelectorAll(".quantity-container");
  const orderModal = document.getElementById("orderModal");
  const orderSummary = document.getElementById("orderSummary");
  const orderTotal = document.getElementById("orderTotal");
  const closeModal = document.querySelector(".close");
  const confirmOrderButton = document.getElementById("confirmOrder");
  let cart = {};

  // Inicializa o carrinho e adiciona event listeners aos botões de quantidade e pedido
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

  // Exibe o modal de resumo do pedido
  const displayOrderModal = () => {
    const itemsInCart = Object.entries(cart).filter(([name, quantity]) => quantity > 0);
    if (itemsInCart.length > 0) {
      let orderDetails = "<div>Resumo do Pedido:</div><br>";
      let orderValue = 0;
      const itemPrice = 25;

      itemsInCart.forEach(([name, quantity]) => {
        const itemTotal = itemPrice * quantity;
        orderDetails += `
          <div>
            <span>${name}</span><span style="float: right;">R$ ${itemTotal.toFixed(2)}</span><br>
            <span>${quantity} Unidade(s)</span>
          </div><br>`;
        orderValue += itemTotal;
      });

      let shippingCost = orderValue > 80 ? 0 : 15;
      let totalValue = orderValue + shippingCost;

      // Atualiza o conteúdo do modal usando innerHTML para formatação
      orderSummary.innerHTML = orderDetails;
      orderTotal.innerHTML = `
        <div>Valor do Pedido: R$ ${orderValue.toFixed(2)}</div>
        <div>Frete: R$ ${shippingCost.toFixed(2)}</div>
        <div>Total: R$ ${totalValue.toFixed(2)}</div>`;
      orderModal.style.display = "block";
    } else {
      alert("Por favor, selecione uma quantidade maior que zero.");
    }
  };

  // Fecha o modal quando o botão de fechar é clicado
  closeModal.addEventListener("click", () => {
    orderModal.style.display = "none";
  });

  // Fecha o modal quando o usuário clica fora do conteúdo do modal
  window.addEventListener("click", (event) => {
    if (event.target == orderModal) {
      orderModal.style.display = "none";
    }
  });

 // Função para confirmar o pedido e redirecionar para a página de agradecimento
confirmOrderButton.addEventListener("click", () => {
  const orderSummary = document.getElementById("orderSummary").innerHTML;
  const orderTotalText = document.getElementById("orderTotal").textContent;
  const deliveryEstimate = 30; // Exemplo de tempo estimado para entrega

  // Salva o conteúdo em formato estruturado no localStorage
  localStorage.setItem("orderSummary", orderSummary);
  localStorage.setItem("orderTotalText", orderTotalText);
  localStorage.setItem("deliveryEstimate", deliveryEstimate);

    window.open("obrigado.html", "_blank");
  });
});
